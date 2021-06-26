from django.utils.translation import gettext_lazy as _
# from django.core.exceptions import ValidationError

# from django.shortcuts import render, get_object_or_404
from django.contrib.auth import get_user_model
from django.db.models import When, Case, Count, Avg

from rest_framework import viewsets  # , permissions

from rest_framework import status
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.mixins import UpdateModelMixin
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


from django_filters.rest_framework import DjangoFilterBackend

from ideas.models import Idea, UserIdeaRelation

from api.serializers.ideas.idea_ser import IdeaSerializer
from api.serializers.user_idea_rel.user_idea_relation_ser import UserIdeaRelSerializer

# from .filters import IdeaFilter
from timestamp.broadcast_utils.idea_utils import get_json_tags, checkTagStringLength
# from .pagination import CustomPaginationIdeas
from .permissions import IsAuthorOrIsStaffOrReadOnly

User = get_user_model()


# TODO: make separ view list idea?
# to prevent headers author-n check?
# premission_class = ['AllowAny']; now simpleAPI vs getAPI


class IdeaRelations(UpdateModelMixin, viewsets.GenericViewSet):
    queryset = UserIdeaRelation.objects.all()
    serializer_class = UserIdeaRelSerializer
    lookup_field = 'idea'
    permission_classes = (IsAuthenticated,)
    pagination_class=None

    def get_object(self):
        print("data from vue.js is", self.request.data)
        # print("user is", self.request.user)
        # print("idea", self.kwargs.get('idea'))
        obj, _ = UserIdeaRelation.objects.get_or_create(idea_id=self.kwargs['idea'], user=self.request.user)
        print("object created or updated", obj)
        return obj


class IdeaViewSet(viewsets.ModelViewSet):
    serializer_class = IdeaSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    # filter by categ_id,author_id
    filter_fields = ['categ', 'author', 'status']  # ['categ__name']
    # search_fields = ['author__profile_display_name']
    search_fields = ['title', 'lead_text', 'main_text']
    # ordering_fields = ['created_at'] see model -created_at
    # pagination_class = CustomPaginationIdeas
    permission_classes = (IsAuthorOrIsStaffOrReadOnly,)
    lookup_field = 'slug'
    parser_classes = (FormParser, MultiPartParser)

    def get_queryset(self):
        # let op: why 2 times qs?
        queryset = Idea.objects.annotate(
            an_likes=Count(Case(When(useridearelation__like=True, then=1))),
            avg_rate=Avg('useridearelation__rating'),
            )
        # sqlite dictinct(raise NotSupportedError('DISTINCT ON fields is not supported by this database backend'))
        return queryset

    def update(self, request, *args, **kwargs):
        """let op: don't save twice to avoid err msg: file not img||corrupt"""

        idea = self.get_object()
        setattr(request.data, '_mutable', True)
        tags = request.data.get('tags')
        if tags is not None:
            # print("server got the following tags", tags)
            if checkTagStringLength(tags):
                return Response({"detail": "tag string is too long; shouls be max 50 chars"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                request.data['tags'] = get_json_tags(tags)
                setattr(request.data, '_mutable', False)

        serializer = self.get_serializer(idea, data=request.data)
        if serializer.is_valid():
            pass
        else:
            return Response(serializer.errors, status=400)
        serializer.is_valid(raise_exception=True)
        # print("yes,ser-er valid")
        self.perform_update(serializer)
        return Response(serializer.data)
        # from taggit error{"tags": ["Invalid json list. A tag list submitted in string form must be valid json."]}

    def create(self, request, *args, **kwargs):
        """ create object but before adding auth user to request.data and clean tags input before adding them to data"""
        # print("check where i am.................")
        setattr(request.data, '_mutable', True)
        tags = request.data.get('tags')
        if tags is not None:
            if checkTagStringLength(tags):
                return Response({"detail": "tag string is too long; shouls be max 50 chars"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                request.data['tags'] = get_json_tags(tags)
        setattr(request.data, '_mutable', False)
        return super().create(request, *args, **kwargs)
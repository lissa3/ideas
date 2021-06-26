from rest_framework import serializers as ser
from profiles.models import Profile
from timestamp.broadcast_utils.validators import validate_size

class ProfileSerializer(ser.ModelSerializer):
    # TODO: do I need it?    
    # user=serializers.StringRelatedField(read_only=True)
    # user = ser.PrimaryKeyRelatedField(queryset=User.objects.all())
    # unid = ser.CharField(read_only=True)
    # user_id = ser.CharField(read_only=True)
    website = ser.URLField(required=False)    
    image = ser.ImageField(validators=[validate_size], required=False, allow_null=True)
    # let op: without allow_null = can't remove file from form and send to backend
    # to learn: image = serializers.ImageField(max_length=None, use_url=True)

    class Meta:
        model = Profile
        fields = ('user_id', 'unid', 'website', 'image')
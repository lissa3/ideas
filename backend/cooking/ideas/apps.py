from django.apps import AppConfig


class IdeasConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'ideas'
    def ready(self):
        # print("greet form app.py")
        from ideas import signals

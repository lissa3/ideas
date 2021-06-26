from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import ugettext_lazy as _

class CustomUserManager(BaseUserManager):
    """ create user with  unique email as identifier"""
    def create_user(self,username,email,password=None,**kwargs):                
        if not username:
            raise ValueError(_('Username is required'))
        if not email:
            raise ValueError(_('The email is required'))
        email = self.normalize_email(email)
        user = self.model(username=username,email=email,**kwargs)
        # otherwise no superuser  
        user.is_active = True         
        user.set_password(password)        
        user.save(using=self._db) 
        return user

    def create_superuser(self, username,email, password=None, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        return self.create_user(username,email, password, **extra_fields)
      
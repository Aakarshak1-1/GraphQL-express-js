from django.db import models
from mongoengine import Document, StringField, EmailField

# Create your models here.
class User(Document):
    name = StringField(required =True, max_length=100)
    email = EmailField(required =True)

    def __str__(self):
        return super().__str__()
    

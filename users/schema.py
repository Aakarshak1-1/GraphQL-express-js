import graphene
from graphene_django.types import DjangoObjectType
from .models import User

class UserType(graphene.ObjectType):
    id = graphene.String()
    name = graphene.String()
    email = graphene.String()

class Query(graphene.ObjectType):
    users = graphene.List(UserType)
    user = graphene.Field(UserType, id=graphene.String())

    def resolve_users(self, info):
        return list(User.objects.all())  # Convert QuerySet to list

    def resolve_user(self, info, id):
        return User.objects.get(id=id)

class CreateUser(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        email = graphene.String(required=True)

    user = graphene.Field(UserType)

    def mutate(self, info, name, email):
        user = User(name=name, email=email)
        user.save()
        return CreateUser(user=user)

class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
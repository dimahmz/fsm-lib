from rest_framework.serializers import ModelSerializer
from .models import Book
from .models import Student
from django.contrib.auth.models import User

class BookSerializer(ModelSerializer):
    class  Meta :
        model = Book
        fields = '__all__'
class StudentSerializer(ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'        
        
class UserSerializer(ModelSerializer):
    class Meta:
        model = User  
        fields = '__all__'      
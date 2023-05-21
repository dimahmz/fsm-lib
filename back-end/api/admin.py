from django.contrib import admin
from . models import Book 
from . models import Student
from . models import BorrowingRecord
admin.site.register(Book)
admin.site.register(Student)
admin.site.register(BorrowingRecord)



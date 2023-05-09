from django.db import models

class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    date_added = models.DateField()
    status = models.CharField(max_length=20)
    book_type = models.CharField(max_length=20)
    copies_available = models.IntegerField()
    publisher = models.CharField(max_length=255)
    book_type = models.CharField(max_length=255)
    isbn_issn = models.CharField(max_length=255)
    format = models.CharField(max_length=255)
    language = models.CharField(max_length=255)
    copies = models.IntegerField()
    def __str__(self):
        return self.title

class Student(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField()
    status = models.CharField(max_length=20)
    def __str__(self):
        return f'{self.first_name} {self.last_name}'    

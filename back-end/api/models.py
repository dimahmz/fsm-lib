from django.db import models
from datetime import date
from django.utils import timezone


class Student(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    branch = models.CharField(max_length=60)
    email = models.EmailField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


def get_current_time():
    return timezone.now().time()


class Book(models.Model):
    isbn_issn = models.CharField(max_length=255)
    title = models.CharField(max_length=150)
    author_name = models.CharField(max_length=200)
    cover_image = models.URLField(blank=True, null=True)
    book_type = models.CharField(max_length=200)
    publisher = models.CharField(max_length=255)
    copies = models.IntegerField(default=1)
    format = models.CharField(max_length=255)
    language = models.CharField(max_length=255)
    book_add_time = models.TimeField(default=get_current_time)
    book_add_date = models.DateField(default=date.today)
    book_add_datetime = models.DateTimeField(default=timezone.now)

    class Meta:
        unique_together = ("title", "author_name")


class BorrowingRecord(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    date_borrowed = models.DateField(default=date.today)
    date_due = models.DateField()
    return_date = models.DateField(null=True)

    def __str__(self):
        return f"{self.student} borrowed {self.book}"

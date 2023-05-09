from django import views
from librarymanagement.models import Book, Student 
from django.shortcuts import redirect, render
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, get_object_or_404
from django.views import View
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from .models import Book
def overview(request):
    user_name = request.user.first_name
    borrowed_books = Book.objects.filter(status='borrowed').count()
    overdue_books = Book.objects.filter(status='overdue').count()
    active_students = Student.objects.filter(status='active').count()
    inactive_students = Student.objects.filter(status='inactive').count()
    latest_books = Book.objects.order_by('-date_added')[:5]
    context = {
        'user_name': user_name,
        'borrowed_books': borrowed_books,
        'overdue_books': overdue_books,
        'active_students': active_students,
        'inactive_students': inactive_students,
        'latest_books': latest_books,
    }
    return render(request, 'overview.html',context)

def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
                login(request, user)
                return redirect('overview')  
    return render(request, 'login.html')    

def books_view(request):
    books = Book.objects.all()
    context = {'books': books}
    return render(request, 'books.html', context)
def book_detail_view(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    context = {'book': book}
    return render(request, 'book_detail.html', context)

    
    


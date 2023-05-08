from django.urls import path
from . import views  

urlpatterns = [
    path('overview/', views.overview, name='overview'),
    path('login_view/', views.login_view, name='login_view'),
    path('books/', views.books_view, name='books'),
    path('books/<int:book_id>/', views.book_detail_view, name='book_detail'),
]
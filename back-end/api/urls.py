from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('login/', views.login_view, name="login"),
    path('overview/', views.overview_view, name="overview"),
    path('books/', views.books_view, name="books"),
    path('books/<int:id>/', views.book_detail_view, name='book-detail'),
    path('add_book/', views.add_book_view, name='add_book'),
    path('delete_book/<int:id>/', views.delete_book_view, name='delete_book'),
    path('borrow_book/', views.borrow_book_view, name='borrow_book'),
    path('logout/', views.logout_view, name='logout'),
    path('students/', views.students_view, name='students'),
    path('students/<int:id>/', views.student_detail_view, name='student_detail'),
    path('add_student/', views.add_student_view, name='add_student'),
    path('delete_student/<int:id>/',
         views.delete_student_view, name='delete_student'),
    path('books/<int:id>/edit/', views.edit_book_view, name='edit-book'),
    path('students/<int:id>/edit/', views.edit_student_view, name='edit-student'),
    path('return_book/', views.return_book_view, name='return-book'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)

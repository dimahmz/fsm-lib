from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from django.db.models import Count, Q
from .models import Book, BorrowingRecord, Student
from datetime import date
from datetime import datetime
from django.utils import timezone
from rest_framework.pagination import PageNumberPagination
from . serializers import BookSerializer
from . serializers import StudentSerializer
from datetime import timedelta
from django.utils import timezone
from django.core.exceptions import ObjectDoesNotExist
from .serializers import UserSerializer
from django.views.decorators.csrf import csrf_exempt


@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'success': 'true'})
    else:
        return Response({'succes': 'false', 'error': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def overview_view(request):
    # first_name = request.user.first_name
    first_name = "Ahmed"
    borrowed_books = BorrowingRecord.objects.filter(
        return_date__isnull=True).count()
    overdue_books = BorrowingRecord.objects.filter(
        return_date__isnull=True, date_due__lt=date.today()).count()
    active_students = Student.objects.filter(
        borrowingrecord__return_date__isnull=True).distinct().count()
    inactive_students = Student.objects.exclude(
        borrowingrecord__return_date__isnull=True).distinct().count()
    latest_books = list(Book.objects.order_by('-book_add_datetime')
                        [:5].values('id', 'book_add_date', 'title', 'book_type', 'copies'))
    data = {
        'success': True,
        'first_name': first_name,
        'borrowed_books': borrowed_books,
        'overdue_books': overdue_books,
        'active_students': active_students,
        'inactive_students': inactive_students,
        'latest_books': latest_books,
    }

    return Response(data)


@api_view(['GET'])
def books_view(request):
    book_type = request.query_params.get('book_type')
    title = request.query_params.get('title')
    queryset = Book.objects.all()
    if book_type:
        queryset = queryset.filter(book_type=book_type)
    if title:
        queryset = queryset.filter(title__icontains=title)

    paginator = PageNumberPagination()
    paginator.page_size = 5
    paginated_queryset = paginator.paginate_queryset(queryset, request)

    data = []
    for book in paginated_queryset:
        data.append({
            'id': book.id,
            'title': book.title,
            'book_type': book.book_type,
            'author_name': book.author_name,
            'publisher': book.publisher,
            'isbn_issn': book.isbn_issn,
            'copies': book.copies,
        })
    serializer = BookSerializer(paginated_queryset, many=True)
    data = serializer.data
    return paginator.get_paginated_response(data)


@api_view(['GET'])
# @authentication_classes([TokenAuthentication])
# @permission_classes([IsAuthenticated])
def book_detail_view(request, id):
    try:
        book = Book.objects.get(id=id)
        serializer = BookSerializer(book)
        return Response({'success': True, 'Book': serializer.data})
    except Book.DoesNotExist:
        return Response({'error': 'Book not found'}, status=404)


@api_view(['POST'])
# @authentication_classes([TokenAuthentication])
# @permission_classes([IsAuthenticated])
def add_book_view(request):
    data = request.data
    serializer = BookSerializer(data=data, many=True)
    if serializer.is_valid():
        serializer.save()
        return Response({'success': True, 'book': serializer.data})
    else:
        return Response({'success': False, 'message': serializer.errors})


@api_view(['DELETE'])
def delete_book_view(request, id):
    try:
        book = Book.objects.get(id=id)
        book.delete()
        return Response({'success': True, 'message': 'Book deleted successfully'})
    except Book.DoesNotExist:
        return Response({'success': False, 'message': 'Book not found'}, status=404)


@api_view(['POST'])
def borrow_book_view(request):
    student_id = request.data.get('student_id')
    book_id = request.data.get('book_id')
    try:
        student = Student.objects.get(id=student_id)
        book = Book.objects.get(id=book_id)
        if BorrowingRecord.objects.filter(student=student, book=book, return_date__isnull=True).exists():
            return Response({'success': False, 'message': 'Student has already borrowed a copy of this book'}, status=400)
        if book.copies > 0:
            book.copies -= 1
            book.save()
            date_borrowed = timezone.now().date()
            date_due = date_borrowed + timedelta(days=15)
            borrowing_record = BorrowingRecord.objects.create(
                student=student,
                book=book,
                date_borrowed=date_borrowed,
                date_due=date_due
            )
            return Response({'success': True, 'message': 'Book borrowed successfully'})
        else:
            return Response({'success': False, 'message': 'No copies of this book are available'}, status=400)
    except Student.DoesNotExist:
        return Response({'success': False, 'message': 'Student not found'}, status=404)
    except Book.DoesNotExist:
        return Response({'success': False, 'message': 'Book not found'}, status=404)


@api_view(['POST'])
def logout_view(request):
    try:
        request.user.auth_token.delete()
        return Response({'success': True,  'message': 'Logged out successfully'})
    except (AttributeError, ObjectDoesNotExist):
        return Response({'success': False, 'message': 'Error logging out'}, status=400)


@api_view(['GET'])
# @authentication_classes([TokenAuthentication])
# @permission_classes([IsAuthenticated])
def students_view(request):
    first_name = request.query_params.get('first_name')
    last_name = request.query_params.get('last_name')
    branch = request.query_params.get('branch')
    student_id = request.query_params.get('id')
    queryset = Student.objects.all()
    if first_name:
        queryset = queryset.filter(first_name__icontains=first_name)
    if last_name:
        queryset = queryset.filter(last_name__icontains=last_name)
    if branch:
        queryset = queryset.filter(branch=branch)
    if student_id:
        queryset = queryset.filter(id=student_id)
    paginator = PageNumberPagination()
    paginator.page_size = 5
    paginated_queryset = paginator.paginate_queryset(queryset, request)
    data = []
    for student in paginated_queryset:
        data.append({
            'id': student.id,
            'first_name': student.first_name,
            'last_name': student.last_name,
            'email': student.email,
            'branch': student.branch,
        })

    serializer = StudentSerializer(paginated_queryset, many=True)
    data = serializer.data
    return paginator.get_paginated_response(data)


@api_view(['GET'])
# @authentication_classes([TokenAuthentication])
# @permission_classes([IsAuthenticated])
def student_detail_view(request, id):
    try:
        student = Student.objects.get(id=id)
        serializer = StudentSerializer(student)
        return Response({'success': True, 'student': serializer.data})
    except Student.DoesNotExist:
        return Response({'success': False, 'error': 'Student not found'}, status=404)


@api_view(['POST'])
def add_student_view(request):
    data = request.data
    serializer = StudentSerializer(data=data, many=True)
    if serializer.is_valid():
        serializer.save()
        response_data = {
            'success': True,
            'message': 'The student was added successfully.',
            'student': serializer.data
        }
        return Response(response_data, status=status.HTTP_201_CREATED)
    else:
        return Response({'success': False, 'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


# @csrf_exempt
@api_view(['DELETE'])
def delete_student_view(request, id):
    try:
        student = Student.objects.get(id=id)
        student.delete()
        return Response({'success': True, 'message': 'Student deleted successfully'})
    except Student.DoesNotExist:
        return Response({'success': False, 'error': 'Student not found'}, status=404)


@api_view(['PUT'])
def edit_book_view(request, id):
    try:
        book = Book.objects.get(id=id)
        serializer = BookSerializer(book, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'success': True, 'book': serializer.data})
        else:
            return Response(serializer.errors)
    except Book.DoesNotExist:
        return Response({'error': 'Book not found'}, status=404)


@api_view(['PUT'])
# @authentication_classes([TokenAuthentication])
# @permission_classes([IsAuthenticated])
def edit_student_view(request, id):
    try:
        student = Student.objects.get(id=id)
        serializer = StudentSerializer(
            student, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'success': True, 'student': serializer.data})
        else:
            return Response({'success': False, 'error': serializer.errors})
    except Student.DoesNotExist:
        return Response({'success': False, 'error': 'Student not found'}, status=404)


@api_view(['POST'])
def return_book_view(request):
    student_id = request.data.get('student_id')
    book_id = request.data.get('book_id')
    try:
        student = Student.objects.get(id=student_id)
        book = Book.objects.get(id=book_id)
        borrowing_record = BorrowingRecord.objects.filter(
            student=student, book=book, return_date__isnull=True).first()
        if borrowing_record:
            borrowing_record.return_date = timezone.now().date()
            borrowing_record.save()
            book.copies += 1
            book.save()
            return Response({'sucess': True, 'message': 'Book returned successfully'})
        else:
            return Response({'success': False, 'message': 'No borrowing record found for this student and book'}, status=status.HTTP_400_BAD_REQUEST)
    except Student.DoesNotExist:
        return Response({'success': False, 'message': 'Student not found'}, status=status.HTTP_404_NOT_FOUND)
    except Book.DoesNotExist:
        return Response({'success': False, 'message': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)

# Generated by Django 4.1.7 on 2023-05-15 23:52

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_book_book_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='book_add_time',
            field=models.TimeField(default=api.models.get_current_time),
        ),
    ]

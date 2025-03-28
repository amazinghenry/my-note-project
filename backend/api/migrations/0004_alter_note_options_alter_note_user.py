# Generated by Django 4.2.1 on 2025-03-27 09:08

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0003_alter_note_user'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='note',
            options={'ordering': ['-created_at']},
        ),
        migrations.AlterField(
            model_name='note',
            name='user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='notes', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]

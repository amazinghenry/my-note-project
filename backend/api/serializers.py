from rest_framework import serializers
from .models import Note

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'title', 'content', 'image', 'created_at']  # Exclude `user`
        read_only_fields = ['id', 'created_at']
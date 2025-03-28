from django.contrib import admin
from .models import Note

class NoteAdmin(admin.ModelAdmin):
    list_display = ['title', 'user', 'created_at']
    readonly_fields = ['image_preview']

    def image_preview(self, obj):
        if obj.image:
            return f'<img src="{obj.image.url}" width="100"/>'
        return "(No image)"
    image_preview.allow_tags = True
    image_preview.short_description = 'Image Preview'

admin.site.register(Note, NoteAdmin)
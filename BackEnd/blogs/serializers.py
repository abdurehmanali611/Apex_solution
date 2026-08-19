from rest_framework import serializers
from config.fields import LenientURLField
from .models import Blog


class BlogSerializer(serializers.ModelSerializer):
    image = LenientURLField(max_length=2048)
    link = LenientURLField(max_length=2048)

    class Meta:
        model = Blog
        fields = "__all__"

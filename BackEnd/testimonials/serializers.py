from rest_framework import serializers
from config.fields import LenientURLField
from .models import Testimonial


class TestimonialSerializer(serializers.ModelSerializer):
    image = LenientURLField(max_length=2048)

    class Meta:
        model = Testimonial
        fields = "__all__"

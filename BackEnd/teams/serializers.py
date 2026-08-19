from rest_framework import serializers
from config.fields import LenientURLField
from .models import Team


class TeamSerializer(serializers.ModelSerializer):
    image = LenientURLField(max_length=2048)
    facebook = LenientURLField(max_length=2048, required=False, allow_blank=True)
    instagram = LenientURLField(max_length=2048, required=False, allow_blank=True)
    linkedin = LenientURLField(max_length=2048, required=False, allow_blank=True)
    telegram = LenientURLField(max_length=2048, required=False, allow_blank=True)

    class Meta:
        model = Team
        fields = "__all__"

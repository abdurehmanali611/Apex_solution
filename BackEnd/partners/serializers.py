from rest_framework import serializers
from config.fields import LenientURLField
from .models import Partner


class PartnerSerializer(serializers.ModelSerializer):
    image = LenientURLField(max_length=2048)

    class Meta:
        model = Partner
        fields = "__all__"

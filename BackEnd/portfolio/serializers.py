from rest_framework import serializers
from config.fields import LenientURLField
from .models import Portfolio


class PortfolioSerializer(serializers.ModelSerializer):
    image = LenientURLField(max_length=2048, required=False, allow_blank=True, allow_null=True)
    link = LenientURLField(max_length=2048, required=False, allow_blank=True, allow_null=True)

    class Meta:
        model = Portfolio
        fields = "__all__"

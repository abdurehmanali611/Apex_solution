from django.db import models

class Team(models.Model):
    image = models.URLField(max_length=2048)
    name = models.CharField(max_length=255)
    position = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    description = models.TextField()
    facebook = models.URLField(max_length=2048, blank=True)
    instagram = models.URLField(max_length=2048, blank=True)
    linkedin = models.URLField(max_length=2048, blank=True)
    telegram = models.URLField(max_length=2048, blank=True)

    def __str__(self):
        return self.name

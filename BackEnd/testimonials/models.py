from django.db import models

class Testimonial(models.Model):
    name = models.CharField(max_length=255)
    profession = models.CharField(max_length=255)
    image = models.URLField(max_length=2048)
    content = models.TextField()
    rating = models.PositiveSmallIntegerField()

    def __str__(self):
        return self.name

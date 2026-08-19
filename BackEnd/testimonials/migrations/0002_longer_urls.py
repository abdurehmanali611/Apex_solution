from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("testimonials", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="testimonial",
            name="image",
            field=models.URLField(max_length=2048),
        ),
    ]

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("blogs", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="blog",
            name="image",
            field=models.URLField(max_length=2048),
        ),
        migrations.AlterField(
            model_name="blog",
            name="link",
            field=models.URLField(max_length=2048),
        ),
    ]

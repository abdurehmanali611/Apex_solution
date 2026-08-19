from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("portfolio", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="portfolio",
            name="image",
            field=models.URLField(blank=True, max_length=2048, null=True),
        ),
        migrations.AlterField(
            model_name="portfolio",
            name="link",
            field=models.URLField(blank=True, max_length=2048, null=True),
        ),
    ]

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("partners", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="partner",
            name="image",
            field=models.URLField(max_length=2048),
        ),
    ]

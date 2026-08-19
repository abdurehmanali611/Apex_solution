from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("teams", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="team",
            name="image",
            field=models.URLField(max_length=2048),
        ),
        migrations.AlterField(
            model_name="team",
            name="facebook",
            field=models.URLField(blank=True, max_length=2048),
        ),
        migrations.AlterField(
            model_name="team",
            name="instagram",
            field=models.URLField(blank=True, max_length=2048),
        ),
        migrations.AlterField(
            model_name="team",
            name="linkedin",
            field=models.URLField(blank=True, max_length=2048),
        ),
        migrations.AlterField(
            model_name="team",
            name="telegram",
            field=models.URLField(blank=True, max_length=2048),
        ),
    ]

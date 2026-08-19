from rest_framework import serializers


class LenientURLField(serializers.URLField):
    """Accepts blank values and URLs missing an http(s) scheme."""

    def to_internal_value(self, data):
        if data is None:
            if self.allow_null:
                return None
            self.fail("null")

        if not isinstance(data, str):
            data = str(data)

        data = data.strip()
        if data == "":
            if self.allow_blank:
                return None if self.allow_null else ""
            self.fail("blank")

        lowered = data.lower()
        if not lowered.startswith(("http://", "https://", "ftp://", "ftps://")):
            data = f"https://{data}"

        return super().to_internal_value(data)

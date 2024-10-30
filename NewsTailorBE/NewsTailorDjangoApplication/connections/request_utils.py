English_language_prefix = "en"


def translate_user_preferred_language(request_language: str) -> str:
    if request_language == "English":
        return English_language_prefix
    return English_language_prefix

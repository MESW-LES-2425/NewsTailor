English_language_prefix = "en"
German_language_prefix = "de"


def translate_user_preferred_language(request_language: str) -> str:
    if request_language == "German":
        return German_language_prefix
    return English_language_prefix

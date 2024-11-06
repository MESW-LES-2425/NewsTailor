from django.http import JsonResponse
from django.views.decorators.http import require_GET
from news_api import obtain_news_from_news_api, obtain_news_from_guardian_api


@require_GET
def fetch_news(request):
    data = request.GET
    category = data.get("category")
    language = data.get("language")
    source = data.get("source")

    if not all([category, language, source]):
        return JsonResponse({"error": "Missing Category, Language, or Source in the request."}, status=400)

    if source == "news_api":
        return obtain_news_from_news_api(category, language)
    elif source == "guardian":
        return obtain_news_from_guardian_api(category)
    else:
        return JsonResponse({"error": "Invalid source specified."}, status=400)

from flask import Flask, request, jsonify
from news_api import obtain_news_from_news_api, obtain_news_from_guardian_api

app = Flask(__name__)


@app.route("/news", methods=["GET"])
def fetch_news():
    """Main getter request for the news api. Using the category, language and source parameters we are able to obtain
    tailored news. The next steps are to connect this with a living object."""
    data = request.get_json()
    if not all(key in data for key in ("category", "language", "source")):
        return (
            jsonify({"error": "Missing Category, Language, or Source in the request."}),
            400,
        )

    if data["source"] == "news_api":
        return obtain_news_from_news_api(data["category"], data["language"])
    elif data["source"] == "guardian":
        return obtain_news_from_guardian_api(data["category"])


if __name__ == "__main__":
    app.run(debug=True)

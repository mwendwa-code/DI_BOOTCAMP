import json
import urllib.parse
import urllib.request


def translate_word(word, src="fr", dest="en"):
    params = {
        "client": "gtx",
        "sl": src,
        "tl": dest,
        "dt": "t",
        "q": word,
    }

    url = (
        "https://translate.googleapis.com/translate_a/single?"
        + urllib.parse.urlencode(params)
    )

    with urllib.request.urlopen(url, timeout=10) as response:
        data = json.loads(response.read().decode("utf-8"))

    return "".join(part[0] for part in data[0] if part[0])


french_words = ["Bonjour", "Au revoir", "Bienvenue", "A bientôt"]

translated_words = {
    word: translate_word(word)
    for word in french_words
}

print(translated_words)
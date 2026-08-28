import json
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import urlopen


API_KEY = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My"
GIPHY_SEARCH_URL = "https://api.giphy.com/v1/gifs/search"


def fetch_giphy_search(query="hilarious", rating="g", limit=10):
	"""Fetch up to ten search results whose original height is above 100."""
	parameters = urlencode({
		"q": query,
		"rating": rating,
		"api_key": API_KEY,
		"limit": limit,
	})
	url = f"{GIPHY_SEARCH_URL}?{parameters}"

	try:
		with urlopen(url, timeout=15) as response:
			if response.status != 200:
				return {}
			result = json.load(response)
	except (HTTPError, URLError, TimeoutError):
		return {}

	result["data"] = [
		gif for gif in result.get("data", [])
		if int(gif.get("images", {}).get("original", {}).get("height", 0)) > 100
	]
	return result


def main():
	result = fetch_giphy_search()
	print(f"GIFs taller than 100 pixels: {len(result.get('data', []))}")
	for gif in result.get("data", []):
		print(gif.get("url", ""))


if __name__ == "__main__":
	main()

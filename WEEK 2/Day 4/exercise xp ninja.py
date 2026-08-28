import json
import random
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import urlopen


API_KEY = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My"
SEARCH_URL = "https://api.giphy.com/v1/gifs/search"
TRENDING_URL = "https://api.giphy.com/v1/gifs/trending"


def fetch_giphy(url, **parameters):
	parameters["api_key"] = API_KEY
	request_url = f"{url}?{urlencode(parameters)}"
	try:
		with urlopen(request_url, timeout=15) as response:
			if response.status == 200:
				return json.load(response)
	except (HTTPError, URLError, TimeoutError):
		pass
	return {}


def search_or_trending(term):
	"""Return search results, or trending results when no term is found."""
	clean_term = term.strip()
	if clean_term:
		result = fetch_giphy(SEARCH_URL, q=clean_term, rating="g")
		if result.get("data"):
			return result, False

	return fetch_giphy(TRENDING_URL, rating="g"), True


def giphy_main():
	term = input("Enter a GIF search term: ")
	result, used_trending = search_or_trending(term)
	if used_trending:
		print("I couldn't find that term, so here are today's trending GIFs:")

	for gif in result.get("data", []):
		print(gif.get("url", ""))


ABILITIES = (
	"strength",
	"dexterity",
	"constitution",
	"intelligence",
	"wisdom",
	"charisma",
)


class Character:
	def __init__(self, name, age):
		self.name = name
		self.age = age
		self.attributes = {ability: self.roll_attribute() for ability in ABILITIES}

	@staticmethod
	def roll_attribute():
		dice = [random.randint(1, 6) for _ in range(4)]
		return sum(sorted(dice)[1:])

	def to_dict(self):
		return {
			"name": self.name,
			"age": self.age,
			"attributes": self.attributes,
		}


class Game:
	def __init__(self, output_directory="."):
		self.output_directory = output_directory
		self.characters = []

	def create_characters(self, player_count):
		for player_number in range(1, player_count + 1):
			name = input(f"Player {player_number} character name: ").strip()
			while True:
				try:
					age = int(input(f"Player {player_number} character age: "))
				except ValueError:
					print("Please enter a valid age.")
					continue
				if age > 0:
					break
				print("Age must be positive.")
			self.characters.append(Character(name, age))

	def save_characters(self):
		json_path = f"{self.output_directory}/characters.json"
		txt_path = f"{self.output_directory}/characters.txt"
		with open(json_path, "w", encoding="utf-8") as json_file:
			json.dump([character.to_dict() for character in self.characters], json_file, indent=4)
		with open(txt_path, "w", encoding="utf-8") as text_file:
			for character in self.characters:
				text_file.write(f"{character.name}, age {character.age}\n")
				for ability, score in character.attributes.items():
					text_file.write(f"  {ability.title()}: {score}\n")
				text_file.write("\n")


def main():
	print("Dungeons & Dragons character generator")
	while True:
		try:
			player_count = int(input("How many players are playing? "))
			if player_count > 0:
				break
		except ValueError:
			pass
		print("Please enter a positive whole number.")

	game = Game()
	game.create_characters(player_count)
	game.save_characters()
	print("Characters saved to characters.txt and characters.json.")


if __name__ == "__main__":
	main()

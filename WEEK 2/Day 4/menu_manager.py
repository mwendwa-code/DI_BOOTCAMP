import json
import re
from pathlib import Path


MENU_FILE = Path(__file__).with_name("restaurant_menu.json")
CONNECTION_WORDS = {"and", "as", "at", "by", "for", "in", "of", "on", "or", "the", "to"}


class MenuManager:
    def __init__(self, menu_file=MENU_FILE):
        self._menu_file = Path(menu_file)
        with open(self._menu_file, "r", encoding="utf-8") as file:
            data = json.load(file)
            self.menu = data.get("items", [])
            self.valentine_items = data.get("valentine_items", [])

    def add_item(self, name, price):
        self.menu.append({"name": name, "price": price})

    def remove_item(self, name):
        for index, item in enumerate(self.menu):
            if item["name"].casefold() == name.casefold():
                del self.menu[index]
                return True
        return False

    def save_to_file(self):
        with open(self._menu_file, "w", encoding="utf-8") as file:
            json.dump({"items": self.menu, "valentine_items": self.valentine_items}, file, indent=4)

    @staticmethod
    def is_valid_valentine_name(name):
        """Validate the capitalization, letters, and minimum number of e characters."""
        words = name.split()
        if not words or sum(character.lower() == "e" for character in name) < 2:
            return False
        if any(character.isdigit() for character in name):
            return False

        for index, word in enumerate(words):
            parts = word.split("-")
            for part_index, part in enumerate(parts):
                if not re.fullmatch(r"[A-Za-z]+", part):
                    return False
                expected_lowercase = part.lower() in CONNECTION_WORDS and index != 0
                hyphen_continuation = part_index > 0
                if (expected_lowercase or hyphen_continuation) and part != part.lower():
                    return False
                if not expected_lowercase and not hyphen_continuation and part != part.capitalize():
                    return False

        return words[0].startswith("V")

    def add_valentine_item(self, name, price):
        if not self.is_valid_valentine_name(name) or not re.fullmatch(r"\d{2},14", price):
            return False
        self.valentine_items.append({"name": name, "price": price})
        return True

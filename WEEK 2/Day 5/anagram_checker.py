from pathlib import Path


class AnagramChecker:
    def __init__(self, word_list_path="sowpods.txt"):
        self.word_list_path = Path(word_list_path)
        if not self.word_list_path.is_absolute():
            self.word_list_path = Path(__file__).parent / self.word_list_path
        try:
            with self.word_list_path.open("r", encoding="utf-8") as word_file:
                self.word_list = {
                    line.strip().casefold()
                    for line in word_file
                    if line.strip()
                }
        except FileNotFoundError as error:
            raise FileNotFoundError(
                f"Word list not found: {self.word_list_path}. "
                "Place sowpods.txt in the same folder as this program."
            ) from error

    def is_valid_word(self, word):
        return word.strip().casefold() in self.word_list

    @staticmethod
    def is_anagram(word1, word2):
        return sorted(word1.casefold()) == sorted(word2.casefold())

    def get_anagrams(self, word):
        normalized_word = word.strip().casefold()
        return sorted(
            candidate
            for candidate in self.word_list
            if candidate != normalized_word
            and self.is_anagram(normalized_word, candidate)
        )

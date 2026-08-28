import re
import string
from collections import Counter

class Text:
	def __init__(self, text):
		self.text = text

	@classmethod
	def from_file(cls, file_path):
		with open(file_path, "r", encoding="utf-8") as text_file:
			return cls(text_file.read())

	def word_frequency(self, word):
		frequency = sum(
			text_word.casefold() == word.casefold()
			for text_word in self.text.split()
		)
		return frequency if frequency else None

	def most_common_word(self):
		words = [word.casefold() for word in self.text.split()]
		if not words:
			return None
		return Counter(words).most_common(1)[0][0]

	def unique_words(self):
		return list(dict.fromkeys(word.casefold() for word in self.text.split()))


class TextModification(Text):
	STOP_WORDS = {
		"a", "an", "and", "are", "as", "at", "be", "by", "for", "from",
		"has", "he", "in", "is", "it", "its", "of", "on", "or", "that",
		"the", "this", "to", "was", "were", "will", "with",
	}

	def remove_punctuation(self):
		self.text = self.text.translate(str.maketrans("", "", string.punctuation))
		return self.text

	def remove_stop_words(self):
		self.text = " ".join(
			word for word in self.text.split()
			if word.casefold() not in self.STOP_WORDS
		)
		return self.text

	def remove_special_characters(self):
		self.text = re.sub(r"[^A-Za-z0-9\s]", "", self.text)
		return self.text


if __name__ == "__main__":
	text = Text("A good day. A good life.")
	print("Frequency of 'good':", text.word_frequency("good"))
	print("Most common word:", text.most_common_word())
	print("Unique words:", text.unique_words())

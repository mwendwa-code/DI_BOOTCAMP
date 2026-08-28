import json
import random
import zipfile
from pathlib import Path


WORDS_DIRECTORY = Path(__file__).parent
DEFAULT_WORDS_FILE = WORDS_DIRECTORY / "words.txt"
DEFAULT_WORDS_ARCHIVE = WORDS_DIRECTORY / "words.zip"
OUTPUT_JSON_FILE = Path(__file__).with_name("modified_employee.json")


def get_words_from_file(file_path):
	"""Read a whitespace-separated word list from a text file or ZIP archive."""
	file_path = Path(file_path)
	if file_path.suffix.lower() == ".zip":
		with zipfile.ZipFile(file_path) as archive:
			text_files = [name for name in archive.namelist() if not name.endswith("/")]
			if not text_files:
				return []
			return archive.read(text_files[0]).decode("utf-8").split()

	with open(file_path, "r", encoding="utf-8") as words_file:
		return words_file.read().split()


def get_random_sentence(length, file_path=DEFAULT_WORDS_FILE):
	"""Return a lowercase sentence containing the requested number of words."""
	if not isinstance(length, int) or not 2 <= length <= 20:
		raise ValueError("Sentence length must be an integer between 2 and 20.")
	if file_path == DEFAULT_WORDS_FILE and not DEFAULT_WORDS_FILE.exists():
		file_path = DEFAULT_WORDS_ARCHIVE
	words = get_words_from_file(file_path)
	if not words:
		raise ValueError("The word list is empty.")

	selected_words = [random.choice(words) for _ in range(length)]
	return " ".join(selected_words).lower()


def sentence_generator_main():
	print("This program generates a random sentence from a word list.")
	try:
		sentence_length = int(input("How many words should the sentence contain (2-20)? "))
	except ValueError:
		print("Error: please enter an integer.")
		return

	if not 2 <= sentence_length <= 20:
		print("Error: the length must be between 2 and 20.")
		return

	try:
		sentence = get_random_sentence(sentence_length)
	except (FileNotFoundError, zipfile.BadZipFile, UnicodeDecodeError, ValueError) as error:
		print(f"Error: could not read the word list ({error}).")
		return

	print(sentence)


def save_employee_json(output_file=OUTPUT_JSON_FILE):
	"""Read employee data, print the salary, add a birth date, and save it."""
	sample_json = """{
		"company": {
			"employee": {
				"name": "emma",
				"payable": {
					"salary": 7000,
					"bonus": 800
				}
			}
		}
	}"""

	data = json.loads(sample_json)
	salary = data["company"]["employee"]["payable"]["salary"]
	print(f"Salary: {salary}")

	data["company"]["employee"]["birth_date"] = "1990-01-01"
	with open(output_file, "w", encoding="utf-8") as json_file:
		json.dump(data, json_file, indent=4)

	return data


if __name__ == "__main__":
	sentence_generator_main()
	save_employee_json()

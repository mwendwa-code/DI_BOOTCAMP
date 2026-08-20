# EXERCISE 1: What's your name?


def get_full_name(first_name, last_name, middle_name=None):
	full_name = first_name.capitalize()
	if middle_name:
		full_name += " " + middle_name.capitalize()
	full_name += " " + last_name.capitalize()
	return full_name


print(get_full_name(first_name="john", middle_name="hooker", last_name="lee"))
print(get_full_name(first_name="bruce", last_name="lee"))


# EXERCISE 2: English to Morse

MORSE_CODE = {
	"A": ".-", "B": "-...", "C": "-.-.", "D": "-..", "E": ".",
	"F": "..-.", "G": "--.", "H": "....", "I": "..", "J": ".---",
	"K": "-.-", "L": ".-..", "M": "--", "N": "-.", "O": "---",
	"P": ".--.", "Q": "--.-", "R": ".-.", "S": "...", "T": "-",
	"U": "..-", "V": "...-", "W": ".--", "X": "-..-", "Y": "-.--",
	"Z": "--..", "0": "-----", "1": ".----", "2": "..---", "3": "...--",
	"4": "....-", "5": ".....", "6": "-....", "7": "--...", "8": "---..",
	"9": "----.",
}
REVERSE_MORSE_CODE = {}
for character, code in MORSE_CODE.items():
	REVERSE_MORSE_CODE[code] = character


def text_to_morse(text):
	words = text.upper().split()
	morse_words = []

	for word in words:
		morse_letters = []
		for character in word:
			morse_letters.append(MORSE_CODE[character])
		morse_words.append(" ".join(morse_letters))

	return " / ".join(morse_words)


def morse_to_text(morse):
	words = morse.split("/")
	decoded_words = []

	for word in words:
		decoded_letters = []
		codes = word.split()
		for code in codes:
			decoded_letters.append(REVERSE_MORSE_CODE[code])
		decoded_words.append("".join(decoded_letters))

	return " ".join(decoded_words)


message = "Hello World"
encoded_message = text_to_morse(message)
print("English:", message)
print("Morse:", encoded_message)
print("Decoded:", morse_to_text(encoded_message))


# EXERCISE 3: Box of stars


def box_printer(*strings):
	width = max(len(string) for string in strings)
	border = "*" * (width + 4)
	print(border)
	for string in strings:
		print(f"* {string.ljust(width)} *")
	print(border)


box_printer("Hello", "World", "in", "reallylongword", "a", "frame")


# EXERCISE 4: Insertion sort
print("This code sorts a list of numbers in ascending order in place.")
print("It inserts each value into its correct position among the values before it.")


def insertion_sort(alist):
	for index in range(1, len(alist)):
		current_value = alist[index]
		position = index

		while position > 0 and alist[position - 1] > current_value:
			alist[position] = alist[position - 1]
			position -= 1

		alist[position] = current_value


alist = [54, 26, 93, 17, 77, 31, 44, 55, 20]
insertion_sort(alist)
print("Sorted list:", alist)

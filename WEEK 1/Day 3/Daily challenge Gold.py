def caesar_cipher(text, shift):
	result = ""

	for character in text:
		if character.isalpha() and character.isascii():
			alphabet_start = ord("A") if character.isupper() else ord("a")
			shifted_character = chr(
				(ord(character) - alphabet_start + shift) % 26 + alphabet_start
			)
			result += shifted_character
		else:
			result += character

	return result


print("Caesar Cipher")
while True:
	operation = input("Do you want to encrypt or decrypt? ").strip().lower()
	if operation in {"encrypt", "decrypt"}:
		break
	print("Please enter 'encrypt' or 'decrypt'.")

message = input("Enter your message: ")
shift = int(input("Enter the shift amount: "))

if operation == "decrypt":
	shift = -shift

result = caesar_cipher(message, shift)
print(f"Result: {result}")

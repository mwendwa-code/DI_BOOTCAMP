import random


while True:
	user_string = input("Enter a string exactly 10 characters long: ")

	if len(user_string) < 10:
		print("String not long enough.")
	elif len(user_string) > 10:
		print("String too long.")
	else:
		break

print("Perfect string")
print(f"First character: {user_string[0]}")
print(f"Last character: {user_string[-1]}")

progressive_string = ""
for character in user_string:
	progressive_string += character
	print(progressive_string)

characters = list(user_string)
random.shuffle(characters)
print("Jumbled string:", "".join(characters))

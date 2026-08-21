#Exercise 1



#Exercise 2


#Exercise 3
# Guess: True
print(3 <= 3 < 9)

# Guess: True
print(3 == 3 == 3)

# Guess: False
print(bool(0))

# Guess: False
print(bool(5 == "5"))

# Guess: True
print(bool(4 == 4) == bool("4" == "4"))

# Guess: False
print(bool(bool(None)))

x = (1 == True)
y = (1 == False)
a = True + 4
b = False + 10

print("x is", x)
print("y is", y)
print("a:", a)
print("b:", b)

# Exercise 4
my_text = """Lorem ipsum dolor sit amet, consectetur adipiscing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco
laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit
esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident,
sunt in culpa qui officia deserunt mollit anim id est laborum."""
print(len(my_text))

# Exercise 5
longest_sentence = ""

while True:
	sentence = input("Enter your longest sentence without the letter A (include A to stop): ")

	if "a" in sentence.casefold():
		print(f"Challenge over! Your longest sentence had {len(longest_sentence)} characters.")
		break

	if len(sentence) > len(longest_sentence):
		longest_sentence = sentence
		print("Congratulations! You set a new longest sentence!")


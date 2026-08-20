import random


# EXERCISE 1: What are you learning?


def display_message():
	print("I am learning about functions in Python.")


display_message()


# EXERCISE 2: Favorite book


def favorite_book(title):
	print(f"One of my favorite books is {title}.")


favorite_book("Alice in Wonderland")


# EXERCISE 3: Geography


def describe_city(city, country="Unknown"):
	print(f"{city} is in {country}.")


describe_city("Reykjavik", "Iceland")
describe_city("Paris")


# EXERCISE 4: Random


def compare_number(user_number):
	random_number = random.randint(1, 100)
	if user_number == random_number:
		print("Success!")
	else:
		print(f"Fail! Your number: {user_number}, Random number: {random_number}")


compare_number(50)

# EXERCISE 5: Personalized shirts


def make_shirt(size="large", text="I love Python"):
	print(f"The size of the shirt is {size} and the text is {text}.")


make_shirt()
make_shirt(size="medium")
make_shirt("small", "Custom message")
make_shirt(size="small", text="Hello!")


# EXERCISE 6: Magicians

magician_names = ["Harry Houdini", "David Blaine", "Criss Angel"]


def show_magicians(names):
	for name in names:
		print(name)


def make_great(names):
	for index in range(len(names)):
		names[index] = f"{names[index]} the Great"


make_great(magician_names)
show_magicians(magician_names)


# EXERCISE 7: Temperature advice


def get_random_temp():
	return random.randint(-10, 40)


def get_random_float_temp():
	return round(random.uniform(-10, 40), 1)


def get_season(month):
	if month in (12, 1, 2):
		return "winter"
	if month in (3, 4, 5):
		return "spring"
	if month in (6, 7, 8):
		return "summer"
	return "autumn"


def get_seasonal_temp(month):
	temperature_ranges = {
		"winter": (-10, 15),
		"spring": (8, 25),
		"summer": (18, 40),
		"autumn": (5, 25),
	}
	season = get_season(month)
	low, high = temperature_ranges[season]
	return random.randint(low, high)


def main():
	temperature = get_random_temp()
	print(f"The temperature right now is {temperature} degrees Celsius.")

	if temperature < 0:
		print("Brrr, that's freezing! Wear some extra layers today.")
	elif temperature < 16:
		print("Quite chilly! Don't forget your coat.")
	elif temperature < 24:
		print("Nice weather.")
	elif temperature <= 32:
		print("A bit warm, stay hydrated.")
	else:
		print("It's really hot! Stay cool.")


main()

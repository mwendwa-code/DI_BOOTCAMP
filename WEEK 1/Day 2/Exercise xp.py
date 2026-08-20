print("=" * 50)
print("EXERCISE 1: Sets")
print("=" * 50)

my_fav_numbers = {3, 7, 21}
my_fav_numbers.add(42)
my_fav_numbers.add(99)
my_fav_numbers.remove(99)

friend_fav_numbers = {5, 7, 18}
our_fav_numbers = my_fav_numbers.union(friend_fav_numbers)

print("My favorite numbers:", my_fav_numbers)
print("My friend's favorite numbers:", friend_fav_numbers)
print("Our favorite numbers:", our_fav_numbers)


print("\n" + "=" * 50)
print("EXERCISE 2: Tuple")
print("=" * 50)

numbers_tuple = (1, 2, 3, 4)
print("Original tuple:", numbers_tuple)
print("Tuples are immutable, so they cannot be changed after creation.")
try:
	numbers_tuple += (5,)
	print("New tuple created by concatenation:", numbers_tuple)
except TypeError as error:
	print(f"The tuple could not be changed: {error}")


print("\n" + "=" * 50)
print("EXERCISE 3: List manipulation")
print("=" * 50)

basket = ["Banana", "Apples", "Oranges", "Blueberries"]
basket.remove("Banana")
basket.remove("Blueberries")
basket.append("Kiwi")
basket.insert(0, "Apples")
print("Apples appear", basket.count("Apples"), "times.")
basket.clear()
print("Final basket:", basket)


print("\n" + "=" * 50)
print("EXERCISE 4: Floats")
print("=" * 50)

mixed_numbers = [number / 2 for number in range(3, 11)]
print("Generated sequence:", mixed_numbers)
print("A float has a decimal part; an integer is a whole number.")


print("\n" + "=" * 50)
print("EXERCISE 5: For loops")
print("=" * 50)

print("Numbers from 1 to 20:")
for number in range(1, 21):
	print(number, end=" ")
print()

print("Numbers whose zero-based index is even:")
for index, number in enumerate(range(1, 21)):
	if index % 2 == 0:
		print(number, end=" ")
print()


print("\n" + "=" * 50)
print("EXERCISE 6: While loop")
print("=" * 50)

while True:
	name = input("Enter your name (at least 3 letters): ").strip()
	if name.isalpha() and len(name) >= 3:
		print("Thank you")
		break
	print("Invalid name. Please try again.")


print("\n" + "=" * 50)
print("EXERCISE 7: Favorite fruits")
print("=" * 50)

favorite_fruits = input("Enter your favorite fruits, separated by spaces: ").lower().split()
chosen_fruit = input("Enter the name of a fruit: ").strip().lower()
if chosen_fruit in favorite_fruits:
	print("You chose one of your favorite fruits! Enjoy!")
else:
	print("You chose a new fruit. I hope you enjoy it!")


print("\n" + "=" * 50)
print("EXERCISE 8: Pizza toppings")
print("=" * 50)

toppings = []
while True:
	topping = input("Enter a pizza topping, or type 'quit': ").strip()
	if topping.lower() == "quit":
		break
	if topping:
		toppings.append(topping)
		print(f"Adding {topping} to your pizza.")

pizza_cost = 10 + len(toppings) * 2.50
print("Toppings:", ", ".join(toppings) if toppings else "none")
print(f"Total cost: ${pizza_cost:.2f}")


print("\n" + "=" * 50)
print("EXERCISE 9: Cinemax tickets")
print("=" * 50)

family_size = int(input("How many people are buying tickets? "))
total_ticket_cost = 0
for person_number in range(1, family_size + 1):
	age = int(input(f"Enter the age of person {person_number}: "))
	if age < 3:
		ticket_cost = 0
	elif age <= 12:
		ticket_cost = 10
	else:
		ticket_cost = 15
	total_ticket_cost += ticket_cost
print(f"Total ticket cost: ${total_ticket_cost}")


print("\nBonus: restricted movie for ages 16 to 21")
teenager_count = int(input("How many people are in the group? "))
attendees = []
for person_number in range(1, teenager_count + 1):
	age = int(input(f"Enter the age of group member {person_number}: "))
	if 16 <= age <= 21:
		attendees.append(age)
print("Allowed attendees:", attendees)

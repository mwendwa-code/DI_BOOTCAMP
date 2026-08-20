print("=" * 50)
print("EXERCISE 1-3: Birthday lookup")
print("=" * 50)

birthdays = {
	"Alice": "1990/04/12",
	"Brian": "1988/09/25",
	"Chloe": "1995/01/30",
	"David": "1992/07/18",
	"Emma": "1985/11/06",
}

print("Welcome to the birthday dictionary!")
print("You can look up the birthdays of the people in the list!")
print("People in the dictionary:")
for person in birthdays:
	print(f"- {person}")

new_person = input("\nWould you like to add a birthday? Enter yes or no: ").strip().lower()
if new_person == "yes":
	name_to_add = input("Enter the person's name: ").strip()
	birthday_to_add = input("Enter their birthday (YYYY/MM/DD): ").strip()
	birthdays[name_to_add] = birthday_to_add
	print(f"{name_to_add}'s birthday was added.")

person_name = input("Enter a person's name to look up: ").strip()
if person_name in birthdays:
	print(f"{person_name}'s birthday is {birthdays[person_name]}.")
else:
	print(f"Sorry, we don't have the birthday information for {person_name}.")


print("\n" + "=" * 50)
print("EXERCISE 4: Fruit shop")
print("=" * 50)

fruit_prices = {
	"banana": 4,
	"apple": 2,
	"orange": 1.5,
	"pear": 3,
}

for fruit, price in fruit_prices.items():
	print(f"The price of {fruit} is ${price}.")

items = {
	"banana": {"price": 4, "stock": 10},
	"apple": {"price": 2, "stock": 5},
	"orange": {"price": 1.5, "stock": 24},
	"pear": {"price": 3, "stock": 1},
}

total_inventory_value = 0
for fruit, details in items.items():
	fruit_value = details["price"] * details["stock"]
	total_inventory_value += fruit_value
	print(f"{fruit}: ${details['price']} x {details['stock']} = ${fruit_value:.2f}")

print(f"Total value of all fruit in stock: ${total_inventory_value:.2f}")

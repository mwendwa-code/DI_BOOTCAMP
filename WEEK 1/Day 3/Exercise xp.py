
print("=" * 50)
print("EXERCISE 1: Converting lists into a dictionary")
print("=" * 50)

keys = ["Ten", "Twenty", "Thirty"]
values = [10, 20, 30]
number_dictionary = dict(zip(keys, values))
print(number_dictionary)


print("\n" + "=" * 50)
print("EXERCISE 2: Cinemax ticket prices")
print("=" * 50)

family = {"rick": 43, "beth": 13, "morty": 5, "summer": 8}


def ticket_price(age):
	if age < 3:
		return 0
	if age <= 12:
		return 10
	return 15


total_cost = 0
for member, age in family.items():
	price = ticket_price(age)
	total_cost += price
	print(f"{member.title()} ({age} years old): ${price}")
print(f"Total cost: ${total_cost}")


def calculate_custom_family_cost():
	custom_family = {}
	print("\nBonus: enter family members, or submit a blank name to finish.")
	while True:
		name = input("Name: ").strip()
		if not name:
			break
		age = int(input(f"Age for {name}: "))
		custom_family[name] = age

	custom_total = 0
	for member, age in custom_family.items():
		price = ticket_price(age)
		custom_total += price
		print(f"{member.title()} ({age} years old): ${price}")
	print(f"Custom family total: ${custom_total}")


if input("\nRun the bonus input version? Enter yes or no: ").strip().lower() == "yes":
	calculate_custom_family_cost()


print("\n" + "=" * 50)
print("EXERCISE 3: Zara")
print("=" * 50)

brand = {
	"name": "Zara",
	"creation_date": 1975,
	"creator_name": "Amancio Ortega Gaona",
	"type_of_clothes": ["men", "women", "children", "home"],
	"international_competitors": ["Gap", "H&M", "Benetton"],
	"number_stores": 7000,
	"major_color": {
		"France": ["blue"],
		"Spain": ["red"],
		"US": ["pink", "green"],
	},
}

brand["number_stores"] = 2
print(f"Zara's clients can shop for {', '.join(brand['type_of_clothes'])} clothing.")
brand["country_creation"] = "Spain"
if "international_competitors" in brand:
	brand["international_competitors"].append("Desigual")
brand.pop("creation_date")
print(f"Last international competitor: {brand['international_competitors'][-1]}")
print(f"Major colors in the US: {', '.join(brand['major_color']['US'])}")
print(f"Number of keys: {len(brand)}")
print(f"All keys: {list(brand.keys())}")

more_on_zara = {"creation_date": 1975, "number_stores": 2}
brand.update(more_on_zara)
print(f"Merged Zara dictionary: {brand}")


print("\n" + "=" * 50)
print("EXERCISE 4: Disney characters")
print("=" * 50)

users = ["Mickey", "Minnie", "Donald", "Ariel", "Pluto"]
characters_to_indices = {character: index for index, character in enumerate(users)}
indices_to_characters = {index: character for index, character in enumerate(users)}
sorted_characters_to_indices = {
	character: index for index, character in enumerate(sorted(users))
}

print("Characters to indices:", characters_to_indices)
print("Indices to characters:", indices_to_characters)
print("Sorted characters to indices:", sorted_characters_to_indices)

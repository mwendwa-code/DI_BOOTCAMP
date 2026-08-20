print("CHALLENGE 1: Letter index dictionary")
word = input("Enter a word: ")

letter_indices = {}
for index, letter in enumerate(word):
	if letter in letter_indices:
		letter_indices[letter].append(index)
	else:
		letter_indices[letter] = [index]

print(letter_indices)


print("\nCHALLENGE 2: Affordable items")


def clean_price(price):
	return int(price.replace("$", "").replace(",", ""))


def affordable_items(items_purchase, wallet):
	money_left = clean_price(wallet)
	basket = []

	for item, price_text in items_purchase.items():
		price = clean_price(price_text)
		if price <= money_left:
			basket.append(item)
			money_left -= price

	return sorted(basket) if basket else "Nothing"


items_purchase = {
	"Water": "$1",
	"Bread": "$3",
	"TV": "$1,000",
	"Fertilizer": "$20",
}
wallet = "$300"
print("Affordable items:", affordable_items(items_purchase, wallet))

items_purchase = {
	"Apple": "$4",
	"Honey": "$3",
	"Fan": "$14",
	"Bananas": "$4",
	"Pan": "$100",
	"Spoon": "$2",
}
wallet = "$100"
print("Affordable items:", affordable_items(items_purchase, wallet))

items_purchase = {
	"Phone": "$999",
	"Speakers": "$300",
	"Laptop": "$5,000",
	"PC": "$1200",
}
wallet = "$1"
print("Affordable items:", affordable_items(items_purchase, wallet))

import random

list_of_numbers = [random.randint(0, 10000) for _ in range(20000)]
target_number = 3728

seen_numbers = set()
seen_pairs = set()

for number in list_of_numbers:
    complement = target_number - number

    if complement in seen_numbers:
        pair = tuple(sorted((number, complement)))
        if pair not in seen_pairs:
            seen_pairs.add(pair)
            print(f"{number} and {complement} sums to the target_number {target_number}")

    seen_numbers.add(number)

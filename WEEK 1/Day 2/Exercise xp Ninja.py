import math
import random
from collections import Counter


print("=" * 50)
print("EXERCISE 1: Formula calculator")
print("=" * 50)

C = 50
H = 30
d_values = [float(value.strip()) for value in input("Enter comma-separated values for D: ").split(",")]
results = [round(math.sqrt((2 * C * d) / H)) for d in d_values]
print("Results:", ",".join(str(result) for result in results))


print("\n" + "=" * 50)
print("EXERCISE 2: List of integers")
print("=" * 50)

numbers = [3, 47, 99, -80, 22, 97, 54, -23, 5, 7]
print("1. List:", numbers)
print("2a. Descending:", sorted(numbers, reverse=True))
print("2b. Sum:", sum(numbers))
print("3. First and last:", [numbers[0], numbers[-1]])
print("4. Greater than 50:", [number for number in numbers if number > 50])
print("5. Smaller than 10:", [number for number in numbers if number < 10])
print("6. Squared:", " ".join(str(number ** 2) for number in numbers))

unique_numbers = list(dict.fromkeys(numbers))
print("7. Without duplicates:", unique_numbers, f"(Count: {len(unique_numbers)})")
print("8. Average:", sum(numbers) / len(numbers))
print("9. Largest:", max(numbers))
print("10. Smallest:", min(numbers))

manual_sum = 0
manual_largest = numbers[0]
manual_smallest = numbers[0]
for number in numbers:
	manual_sum += number
	if number > manual_largest:
		manual_largest = number
	if number < manual_smallest:
		manual_smallest = number
print("11. Manual sum:", manual_sum)
print("    Manual average:", manual_sum / len(numbers))
print("    Manual largest:", manual_largest)
print("    Manual smallest:", manual_smallest)

user_numbers = []
for index in range(10):
	while True:
		user_number = int(input(f"12. Enter number {index + 1} (-100 to 100): "))
		if -100 <= user_number <= 100:
			user_numbers.append(user_number)
			break
		print("Please enter a number between -100 and 100.")
print("Your numbers:", user_numbers)

random_numbers = [random.randint(-100, 100) for _ in range(10)]
print("13. Random numbers:", random_numbers)

random_count = random.randint(50, 100)
random_length_numbers = [random.randint(-100, 100) for _ in range(random_count)]
print(f"14. Generated {random_count} random numbers.")
print("    First 10:", random_length_numbers[:10])
print("15. Yes, the code works with any count because it uses len() and loops.")


print("\n" + "=" * 50)
print("EXERCISE 3: Paragraph analysis")
print("=" * 50)

paragraph = """Learning Python is a practical way to understand programming. Small programs help us practice variables, loops, and data structures. With regular practice, complex ideas become easier to solve."""
paragraph_words = paragraph.split()
clean_words = [word.lower().strip(".,?!") for word in paragraph_words]
sentence_count = paragraph.count(".") + paragraph.count("?") + paragraph.count("!")
unique_word_count = len(set(clean_words))
print("Characters:", len(paragraph))
print("Sentences:", sentence_count)
print("Words:", len(paragraph_words))
print("Unique words:", unique_word_count)
print("Non-whitespace characters:", len("".join(paragraph.split())))
print("Average words per sentence:", len(paragraph_words) / sentence_count)
print("Non-unique words:", len(paragraph_words) - unique_word_count)


print("\n" + "=" * 50)
print("EXERCISE 4: Frequency of the words")
print("=" * 50)

text = input("Enter text to analyze: ")
word_frequencies = Counter(text.split())
for word in sorted(word_frequencies, key=str.lower):
	print(f"{word}:{word_frequencies[word]}")

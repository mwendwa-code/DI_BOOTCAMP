#  EXERCISE 1 
# Concatenate two lists without using the + sign
list1 = [1, 2, 3]
list2 = [4, 5, 6]
list1.extend(list2)
print("Exercise 1 - Concatenated lists:")
print(list1)


#  EXERCISE 2 
# Range of numbers: multiples of 5 and 7 from 1500 to 2500
print("\nExercise 2 - Multiples of 5 and 7 (1500-2500):")
for number in range(1500, 2501):
	if number % 5 == 0 or number % 7 == 0:
		print(number)

#  EXERCISE 3 
# Check the index
print("\nExercise 3 - Check the index:")
names = ['Samus', 'Cortana', 'V', 'Link', 'Mario', 'Cortana', 'Samus']
user_name = input('Enter your name: ')

if user_name in names:
	print(f"The index of '{user_name}' is: {names.index(user_name)}")
else:
	print(f"'{user_name}' is not in the list.")

# EXERCISE 4 
# Greatest Number
print("\nExercise 4 - Greatest Number:")
first_number = int(input('Input the 1st number: '))
second_number = int(input('Input the 2nd number: '))
third_number = int(input('Input the 3rd number: '))

greatest_number = max(first_number, second_number, third_number)
print('The greatest number is:', greatest_number)


#  EXERCISE 5 
# The Alphabet
print("\nExercise 5 - The Alphabet:")
alphabet = 'abcdefghijklmnopqrstuvwxyz'
vowels = 'aeiou'

for letter in alphabet:
	if letter in vowels:
		print(f'{letter} is a vowel')
	else:
		print(f'{letter} is a consonant')

# EXERCISE 6 
# Words and letters
print("\nExercise 6 - Words and letters:")
words = []

for number in range(7):
	word = input(f'Enter word {number + 1}: ')
	words.append(word)

letter = input('Enter a character: ')

for word in words:
	if letter in word:
		print(f'The first appearance of {letter} in {word} is at index {word.index(letter)}.')
	else:
		print(f'The letter {letter} does not appear in {word}.')

#  EXERCISE 7 
# Min, Max, Sum
print("\nExercise 7 - Min, Max, Sum:")
numbers = list(range(1, 1_000_001))
minimum_number = min(numbers)
maximum_number = max(numbers)
total = sum(numbers)
print(f'Minimum: {minimum_number}')
print(f'Maximum: {maximum_number}')
print(f'Sum: {total}')

#  EXERCISE 8 
# List and Tuple
print("\nExercise 8 - List and Tuple:")
input_str = input('Enter comma-separated numbers: ')
number_list = input_str.split(',')
number_tuple = tuple(number_list)
print(number_list)
print(number_tuple)

#  EXERCISE 9
# Random number guessing game
import random

print("\nExercise 9 - Random Number Guessing Game:")
games_won = 0
games_lost = 0
play_again = True

while play_again:
	random_number = random.randint(1, 9)
	user_guess = int(input('Guess a number between 1 and 9: '))
	
	if user_guess == random_number:
		print('🎉 Winner!')
		games_won += 1
	else:
		print(f'Better luck next time. The number was {random_number}.')
		games_lost += 1
	
	response = input('Do you want to play again? (yes/no): ').lower()
	play_again = response in ['yes', 'y']

print(f'\n--- Game Statistics ---')
print(f'Games won: {games_won}')
print(f'Games lost: {games_lost}')
print(f'Total games: {games_won + games_lost}')


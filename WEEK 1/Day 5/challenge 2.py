# Exercise 1 - Pattern drawing

# Pattern 1
for i in range(3):
    print(' ' * (2 - i) + '*' * (2 * i + 1))

print()

# Pattern 2
for i in range(1, 6):
    print(' ' * (5 - i) + '*' * i)

print()

# Pattern 3
for i in range(1, 6):
    print('*' * i)

for i in range(4, 0, -1):
    print(' ' * (5 - i) + '*' * i)

print()

# Exercise 2 - Analysing the code

# my_list stores the numbers to be sorted
my_list = [2, 24, 12, 354, 233]

# Loop through the list except the last element
for i in range(len(my_list) - 1):
    minimum = i  # Assume the current index is the smallest one

    # Compare with all elements after i
    for j in range(i + 1, len(my_list)):
        if my_list[j] < my_list[minimum]:  # If a smaller number is found
            minimum = j  # Update the index of the smallest number
            if minimum != i:  # Only swap if the smallest value is not already in position i
                my_list[i], my_list[minimum] = my_list[minimum], my_list[i]

# Print the final sorted list
print(my_list)

# ----------------------------------------------------------
# Explanation of what the program is doing:
# This code is trying to sort the list in ascending order using a
# selection sort style. It keeps finding the smallest number in the
# remaining unsorted part and moves it to the front.
#
# Initial list: [2, 24, 12, 354, 233]
# Final output: [2, 12, 24, 233, 354]
# ----------------------------------------------------------

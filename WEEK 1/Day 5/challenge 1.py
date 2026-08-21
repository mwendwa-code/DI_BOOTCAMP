# Exercise 1

def insert_at_index(lst, item, index):
    lst.insert(index, item)
    return lst


# Exercise 2

def count_spaces(text):
    return text.count(' ')


# Exercise 3

def count_upper_lower(text):
    upper = 0
    lower = 0
    for char in text:
        if char.isupper():
            upper += 1
        elif char.islower():
            lower += 1
    return upper, lower


# Exercise 4

def my_sum(numbers):
    total = 0
    for num in numbers:
        total += num
    return total


# Exercise 5

def find_max(numbers):
    maximum = numbers[0]
    for num in numbers[1:]:
        if num > maximum:
            maximum = num
    return maximum


# Exercise 6

def factorial(n):
    if n < 0:
        raise ValueError("Factorial is not defined for negative numbers")
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result


# Exercise 7

def list_count(lst, target):
    count = 0
    for item in lst:
        if item == target:
            count += 1
    return count


# Exercise 8

def norm(numbers):
    total = 0
    for num in numbers:
        total += num ** 2
    return total ** 0.5


# Exercise 9

def is_mono(numbers):
    if len(numbers) < 2:
        return True
    ascending = True
    descending = True

    for i in range(1, len(numbers)):
        if numbers[i] < numbers[i - 1]:
            ascending = False
        if numbers[i] > numbers[i - 1]:
            descending = False

    return ascending or descending


# Exercise 10

def longest_word(words):
    if not words:
        return None
    longest = words[0]
    for word in words[1:]:
        if len(word) > len(longest):
            longest = word
    return longest


# Exercise 11

def separate_ints_and_strings(values):
    integers = []
    strings = []
    for value in values:
        if isinstance(value, int) and not isinstance(value, bool):
            integers.append(value)
        elif isinstance(value, str):
            strings.append(value)
    return integers, strings


# Exercise 12

def is_palindrome(text):
    cleaned = ''.join(ch.lower() for ch in text if ch.isalnum())
    return cleaned == cleaned[::-1]


# Exercise 13

def sum_over_k(sentence, k):
    words = sentence.split()
    count = 0
    for word in words:
        if len(word) > k:
            count += 1
    return count


# Exercise 14

def dict_avg(my_dict):
    if not my_dict:
        return 0
    total = 0
    for value in my_dict.values():
        total += value
    return total / len(my_dict)


# Exercise 15

def common_div(a, b):
    result = []
    for num in range(2, min(a, b) + 1):
        if a % num == 0 and b % num == 0:
            result.append(num)
    return result


# Exercise 16

def is_prime(n):
    if n < 2:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False
    for i in range(3, int(n ** 0.5) + 1, 2):
        if n % i == 0:
            return False
    return True


# Exercise 17

def weird_print(values):
    result = []
    for index, value in enumerate(values):
        if index % 2 == 0 and value % 2 == 0:
            result.append(value)
    return result


# Exercise 18

def type_count(**kwargs):
    counts = {}
    for value in kwargs.values():
        key = type(value).__name__
        counts[key] = counts.get(key, 0) + 1
    return counts


# Exercise 19

def my_split(text, sep=None):
    if sep is None:
        return text.split()
    if sep == '':
        raise ValueError("empty separator")
    return text.split(sep)


# Exercise 20

def password_format(text):
    return '*' * len(text)



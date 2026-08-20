# ===== EXERCISE 1 =====
# Print the following output using one line of code
print("Hello world\nHello world\nHello world\nHello world")

# ===== EXERCISE 2 =====
# Some Math: Calculate (99^3)*8
result = (99**3) * 8
print(f"(99^3)*8 = {result}")

# ===== EXERCISE 3 =====
# What is the output? Predict then run
print("\n--- Exercise 3: Predictions ---")
print(f"15 < 8: {15 < 8}")  # False
print(f"5 < 3: {5 < 3}")  # False
print(f"3 == 3: {3 == 3}")  # True
print(f"3 == '3': {3 == '3'}")  # False
print(f"'3' > 3: {'3' > 3 if isinstance('3', type(3)) else 'TypeError'}")  # TypeError
print(f"'Hello' == 'hello': {'Hello' == 'hello'}")  # False

# ===== EXERCISE 4 =====
# Your computer brand
computer_brand = "Dell"  # Change this to your computer brand
print(f"\nI have a {computer_brand} computer.")

# ===== EXERCISE 5 =====
# Your information
name = "Student"  # Change to your name
age = 20  # Change to your age
shoe_size = 10  # Change to your shoe size
info = f"My name is {name}, I am {age} years old, and my shoe size is {shoe_size}."
print(info)

# ===== EXERCISE 6 =====
# A & B
a = 10
b = 5
if a > b:
    print("Hello World")

# ===== EXERCISE 7 =====
# Odd or Even
number = int(input("\nEnter a number to check if it's odd or even: "))
if number % 2 == 0:
    print(f"{number} is even")
else:
    print(f"{number} is odd")

# ===== EXERCISE 8 =====
# What's your name?
user_name = input("What is your name? ")
my_name = "Student"  # Change to your name
if user_name.lower() == my_name.lower():
    print(f"Wow, we have the same name! What are the odds?!")
else:
    print(f"Nice to meet you, {user_name}! I'm {my_name}, but you can call me your coding buddy.")

# ===== EXERCISE 9 =====
# Tall enough to ride a roller coaster
height = int(input("What is your height in centimeters? "))
if height > 145:
    print("You are tall enough to ride the roller coaster! Enjoy the ride!")
else:
    print("Sorry, you need to grow some more to ride this roller coaster. Keep growing!")
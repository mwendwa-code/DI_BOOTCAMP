#1: geometry


from math import pi
import random


class Circle:
	def __init__(self, radius=1.0):
		self.radius = radius

	def perimeter(self):
		return 2 * pi * self.radius

	def area(self):
		return pi * self.radius ** 2

	def definition(self):
		print("A circle is a plane figure whose points are all the same distance from its center.")


circle = Circle(5)
print(f"Circle perimeter: {circle.perimeter():.2f}")
print(f"Circle area: {circle.area():.2f}")
circle.definition()


class MyList:
	def __init__(self, letters):
		self.letters = letters

	def reversed_list(self):
		return self.letters[::-1]

	def sorted_list(self):
		return sorted(self.letters)

	def random_numbers(self):
		return [random.randint(1, 100) for _ in self.letters]



import random


# Exercise 1: OOP quiz answers
#
# A class is a blueprint that defines the data and behavior of objects.
# An instance is one object created from a class.
# Encapsulation keeps an object's data and the methods that operate on it together.
# Abstraction exposes the important interface while hiding implementation details.
# Inheritance allows a class to reuse or extend another class's attributes and methods.
# Multiple inheritance means a class inherits from more than one parent class.
# Polymorphism allows the same method or interface to behave differently for different objects.
# MRO is the order Python follows when looking for a method in a class hierarchy.


class Card:
	SUITS = ("Hearts", "Diamonds", "Clubs", "Spades")
	VALUES = ("A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K")

	def __init__(self, suit, value):
		if suit not in self.SUITS:
			raise ValueError(f"Invalid suit: {suit}")
		if value not in self.VALUES:
			raise ValueError(f"Invalid value: {value}")
		self.suit = suit
		self.value = value

	def __str__(self):
		return f"{self.value} of {self.suit}"


class Deck:
	def __init__(self):
		self.cards = []
		self._build_deck()

	def _build_deck(self):
		self.cards = [
			Card(suit, value)
			for suit in Card.SUITS
			for value in Card.VALUES
		]

	def shuffle(self):
		if len(self.cards) != 52:
			self._build_deck()
		random.shuffle(self.cards)

	def deal(self):
		if not self.cards:
			return None
		return self.cards.pop()


if __name__ == "__main__":
	deck = Deck()
	deck.shuffle()
	dealt_card = deck.deal()
	print(f"Dealt card: {dealt_card}")
	print(f"Cards remaining: {len(deck.cards)}")

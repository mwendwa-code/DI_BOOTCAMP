class Farm:
	def __init__(self, farm_name):
		self.name = farm_name
		self.animals = {}

	def add_animal(self, animal_type=None, count=1, **kwargs):
		if animal_type is not None:
			self.animals[animal_type] = self.animals.get(animal_type, 0) + count

		for animal, quantity in kwargs.items():
			self.animals[animal] = self.animals.get(animal, 0) + quantity

	def get_info(self):
		animal_lines = [
			f"{animal:<8}: {count}"
			for animal, count in self.animals.items()
		]
		return f"{self.name}'s farm\n\n" + "\n".join(
			f"{line}" for line in animal_lines
		) + "\n\n    E-I-E-I-0!"

	def get_animal_types(self):
		return sorted(self.animals)

	def get_short_info(self):
		animal_names = []
		for animal in self.get_animal_types():
			suffix = "s" if self.animals[animal] > 1 else ""
			animal_names.append(f"{animal}{suffix}")

		if len(animal_names) == 1:
			animals_text = animal_names[0]
		elif len(animal_names) == 2:
			animals_text = " and ".join(animal_names)
		else:
			animals_text = ", ".join(animal_names[:-1]) + " and " + animal_names[-1]

		return f"{self.name}'s farm has {animals_text}."



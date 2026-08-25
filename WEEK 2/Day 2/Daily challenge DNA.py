import random


class Gene:
	def __init__(self, value=None):
		if value is None:
			value = random.randint(0, 1)
		if value not in (0, 1):
			raise ValueError("A gene must be 0 or 1")
		self.value = value

	def mutate(self):
		self.value = 1 - self.value

	def __str__(self):
		return str(self.value)


class Chromosome:
	SIZE = 10

	def __init__(self, genes=None):
		self.genes = genes if genes is not None else [Gene() for _ in range(self.SIZE)]
		if len(self.genes) != self.SIZE or not all(isinstance(gene, Gene) for gene in self.genes):
			raise ValueError("A chromosome must contain 10 Gene objects")

	def mutate(self):
		number_to_mutate = random.randint(0, self.SIZE)
		for gene in random.sample(self.genes, number_to_mutate):
			gene.mutate()

	def is_all_ones(self):
		return all(gene.value == 1 for gene in self.genes)

	def __str__(self):
		return "".join(str(gene) for gene in self.genes)


class DNA:
	SIZE = 10

	def __init__(self, chromosomes=None):
		self.chromosomes = (
			chromosomes
			if chromosomes is not None
			else [Chromosome() for _ in range(self.SIZE)]
		)
		if len(self.chromosomes) != self.SIZE or not all(
			isinstance(chromosome, Chromosome) for chromosome in self.chromosomes
		):
			raise ValueError("DNA must contain 10 Chromosome objects")

	def mutate(self):
		number_to_mutate = random.randint(0, self.SIZE)
		for chromosome in random.sample(self.chromosomes, number_to_mutate):
			chromosome.mutate()

	def is_all_ones(self):
		return all(chromosome.is_all_ones() for chromosome in self.chromosomes)

	def __str__(self):
		return "\n".join(str(chromosome) for chromosome in self.chromosomes)


class Organism:
	def __init__(self, dna, environment):
		if not isinstance(dna, DNA):
			raise TypeError("dna must be a DNA object")
		if not 0 <= environment <= 1:
			raise ValueError("environment must be between 0 and 1")
		self.dna = dna
		self.environment = environment

	def mutate(self):
		if random.random() < self.environment:
			self.dna.mutate()


def evolve(organisms, max_generations=100_000):
	"""Mutate organisms until one reaches an all-ones DNA sequence."""
	for generation in range(max_generations + 1):
		winner = next((organism for organism in organisms if organism.dna.is_all_ones()), None)
		if winner is not None:
			return generation, winner
		for organism in organisms:
			organism.mutate()
	raise RuntimeError("No organism reached an all-ones DNA sequence within the limit")


if __name__ == "__main__":
	random.seed()
	organisms = [Organism(DNA(), environment=0.5) for _ in range(10)]
	generations, winner = evolve(organisms)
	print(f"An organism reached an all-ones DNA sequence after {generations} generations.")
	print("Research conclusion: mutation and selection eventually produced the target DNA.")

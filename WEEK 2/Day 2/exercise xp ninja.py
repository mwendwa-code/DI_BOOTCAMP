class GameOfLife:
	"""Conway's Game of Life on a fixed or expandable rectangular grid."""

	MAX_SIZE = 10_000

	def __init__(self, initial_state, expandable=False):
		if not initial_state or not all(initial_state):
			raise ValueError("initial_state must be a non-empty rectangular grid")

		width = len(initial_state[0])
		if width == 0 or any(len(row) != width for row in initial_state):
			raise ValueError("initial_state must be a non-empty rectangular grid")
		if len(initial_state) > self.MAX_SIZE or width > self.MAX_SIZE:
			raise ValueError("grid is too large")

		self.grid = [[bool(cell) for cell in row] for row in initial_state]
		self.expandable = expandable
		self.generation = 0

	@property
	def height(self):
		return len(self.grid)

	@property
	def width(self):
		return len(self.grid[0])

	def _add_border_if_needed(self):
		if not self.expandable:
			return
		if self.height >= self.MAX_SIZE or self.width >= self.MAX_SIZE:
			return

		edge_is_alive = (
			any(self.grid[0])
			or any(self.grid[-1])
			or any(row[0] or row[-1] for row in self.grid)
        )   
		if edge_is_alive:
			empty_row = [False] * (self.width + 2)
			self.grid = (
				[empty_row[:]]
				+ [[False] + row + [False] for row in self.grid]
				+ [empty_row[:]]
			)

	def _live_neighbours(self, row, column):
		count = 0
		for row_offset in (-1, 0, 1):
			for column_offset in (-1, 0, 1):
				if row_offset == 0 and column_offset == 0:
					continue
				neighbour_row = row + row_offset
				neighbour_column = column + column_offset
				if (
					0 <= neighbour_row < self.height
					and 0 <= neighbour_column < self.width
					and self.grid[neighbour_row][neighbour_column]
				):
					count += 1
		return count

	def next_generation(self):
		self._add_border_if_needed()
		next_grid = []
		for row in range(self.height):
			next_row = []
			for column in range(self.width):
				neighbours = self._live_neighbours(row, column)
				alive = self.grid[row][column]
				next_row.append(neighbours in (2, 3) if alive else neighbours == 3)
			next_grid.append(next_row)

		self.grid = next_grid
		self.generation += 1
		return self.grid

	def display(self):
		for row in self.grid:
			print("".join("O" if cell else "." for cell in row))

	def is_empty(self):
		return not any(any(row) for row in self.grid)

	def run(self, generations=10):
		if generations < 0:
			raise ValueError("generations must not be negative")

		seen_states = set()
		for _ in range(generations + 1):
			print(f"Generation {self.generation}")
			self.display()
			state = tuple(tuple(row) for row in self.grid)
			if self.is_empty() or state in seen_states:
				break
			seen_states.add(state)
			self.next_generation()


if __name__ == "__main__":
	blinker = [
		[False, False, False, False, False],
		[False, False, True, False, False],
		[False, False, True, False, False],
		[False, False, True, False, False],
		[False, False, False, False, False],
	]

	print("Fixed-border blinker")
	GameOfLife(blinker).run(generations=4)

	print("\nExpandable-border glider")
	glider = [
		[False, True, False],
		[False, False, True],
		[True, True, True],
	]
	GameOfLife(glider, expandable=True).run(generations=5)

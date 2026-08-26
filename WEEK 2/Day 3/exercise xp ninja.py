from abc import ABC, abstractmethod
import random


# Exercise 1: Temperature
class Temperature(ABC):
    def __init__(self, value):
        self.value = value

    @abstractmethod
    def to_celsius(self):
        pass

    def to_kelvin(self):
        return self.to_celsius() + 273.15

    def to_fahrenheit(self):
        return self.to_celsius() * 9 / 5 + 32

    def __repr__(self):
        return f"{self.__class__.__name__}({self.value})"


class Celsius(Temperature):
    def to_celsius(self):
        return self.value

    def to_kelvin(self):
        return self.value + 273.15

    def to_fahrenheit(self):
        return self.value * 9 / 5 + 32


class Kelvin(Temperature):
    def to_celsius(self):
        return self.value - 273.15

    def to_kelvin(self):
        return self.value

    def to_fahrenheit(self):
        return (self.value - 273.15) * 9 / 5 + 32


class Fahrenheit(Temperature):
    def to_celsius(self):
        return (self.value - 32) * 5 / 9

    def to_kelvin(self):
        return (self.value - 32) * 5 / 9 + 273.15

    def to_fahrenheit(self):
        return self.value


# Exercise 2: Quantum Particle
class QuantumParticle:
    _next_id = 1

    def __init__(self, x=None, y=None, p=None):
        self.id = QuantumParticle._next_id
        QuantumParticle._next_id += 1

        self._position = x if x is not None else random.randint(1, 10000)
        self._momentum = (
            y if y is not None
            else p if p is not None
            else random.random()
        )
        self._spin = random.choice((0.5, -0.5))
        self.entangled_particle = None

    def _disturb(self):
        self._position = random.randint(1, 10000)
        self._momentum = random.random()
        print("Quantum Interferences!!")

    def position(self):
        result = self._position
        self._disturb()
        return result

    def momentum(self):
        result = self._momentum
        self._disturb()
        return result

    def spin(self):
        result = self._spin
        self._disturb()

        if self.entangled_particle is not None:
            self.entangled_particle._spin = -result

        return result

    def entangle(self, particle):
        if not isinstance(particle, QuantumParticle):
            raise TypeError("A particle can only be entangled with another particle.")

        self.entangled_particle = particle
        particle.entangled_particle = self

        print("Spooky Action at a Distance !!")

    def __repr__(self):
        return (
            f"QuantumParticle("
            f"id={self.id}, "
            f"position={self._position}, "
            f"momentum={self._momentum:.3f}, "
            f"spin={self._spin})"
        )


if __name__ == "__main__":
    print(Celsius(25).to_fahrenheit())
    print(Kelvin(300).to_celsius())
    print(Fahrenheit( Fahrenheit(32).to_kelvin()).to_celsius())

    p1 = QuantumParticle(x=1, p=5.0)
    p2 = QuantumParticle(x=2, p=5.0)

    print(p1)
    print(p1.position())
    print(p1.momentum())
    print(p1.spin())

    p1.entangle(p2)
    print(f"Particle 1 spin: {p1.spin()}")
    print(f"Particle 2 spin: {p2._spin}")
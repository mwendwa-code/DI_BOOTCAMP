# Exercise 1: Currencies

class Currency:
    def __init__(self, currency, amount):
        self.currency = currency
        self.amount = amount

    def __str__(self):
        return f"{self.amount} {self.currency}s"

    def __repr__(self):
        return str(self)

    def __int__(self):
        return int(self.amount)

    def __add__(self, other):
        if isinstance(other, int):
            return self.amount + other

        if isinstance(other, Currency):
            if self.currency != other.currency:
                raise TypeError(
                    f"Cannot add between Currency type "
                    f"<{self.currency}> and <{other.currency}>"
                )
            return self.amount + other.amount

        return NotImplemented

    def __iadd__(self, other):
        result = self + other
        self.amount = result
        return self


c1 = Currency("dollar", 5)
c2 = Currency("dollar", 10)
c3 = Currency("shekel", 1)

print(c1)
print(int(c1))
print(repr(c1))
print(c1 + 5)
print(c1 + c2)
print(c1)

c1 += 5
print(c1)

c1 += c2
print(c1)

# Uncomment to test the TypeError:
# print(c1 + c3)

#exercise 2
def sum_numbers(number1, number2):
    print(number1 + number2)

sum_numbers(5, 7)

# Exercise 3: Random string
import random
import string
from datetime import datetime
from faker import Faker


random_string = ""

for _ in range(5):
    random_string += random.choice(string.ascii_letters)

print(random_string)


# Exercise 4: Current date
def display_current_date():
    print(datetime.now().date())


display_current_date()


# Exercise 5: Time until January 1st
def time_until_january_first():
    now = datetime.now()
    january_first = datetime(now.year + 1, 1, 1)
    print(january_first - now)


time_until_january_first()


# Exercise 6: Birthday and minutes
def minutes_lived(birthdate):
    birth_date = datetime.strptime(birthdate, "%Y-%m-%d")
    minutes = (datetime.now() - birth_date).total_seconds() / 60
    print(f"You have lived approximately {int(minutes):,} minutes.")


minutes_lived("2000-01-01")


# Exercise 7: Faker
fake = Faker()
users = []


def add_users(number):
    for _ in range(number):
        user = {
            "name": fake.name(),
            "address": fake.address(),
            "language_code": fake.language_code(),
        }
        users.append(user)


add_users(5)
print(users)
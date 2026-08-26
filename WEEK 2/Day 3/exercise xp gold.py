from datetime import date
import re
import secrets
import string


# Exercise 1
def upcoming_holiday():
    today = date.today()

    holidays = [
        (1, 1, "New Year's Day"),
        (2, 14, "Valentine's Day"),
        (7, 4, "Independence Day"),
        (10, 31, "Halloween"),
        (12, 24, "Christmas Eve"),
        (12, 25, "Christmas Day"),
        (12, 31, "New Year's Eve"),
    ]

    upcoming = []

    for month, day, name in holidays:
        holiday = date(today.year, month, day)
        if holiday >= today:
            upcoming.append((holiday, name))

    if not upcoming:
        next_date = date(today.year + 1, 1, 1)
        holiday_name = "New Year's Day"
    else:
        next_date, holiday_name = min(upcoming)

    days_left = (next_date - today).days

    print(f"Today's date: {today}")
    print(f"The next holiday is {holiday_name} in {days_left} days.")


# Exercise 2
def planetary_ages(age_in_seconds):
    earth_year = 31_557_600

    planets = {
        "Earth": 1,
        "Mercury": 0.2408467,
        "Venus": 0.61519726,
        "Mars": 1.8808158,
        "Jupiter": 11.862615,
        "Saturn": 29.447498,
        "Uranus": 84.016846,
        "Neptune": 164.79132,
    }

    for planet, orbital_period in planets.items():
        age = age_in_seconds / earth_year / orbital_period
        print(f"{planet}: {age:.2f} years")


# Exercise 3
def return_numbers(text):
    return "".join(re.findall(r"\d", text))


# Exercise 4
def validate_name(name):
    pattern = r"^[A-Z][a-z]+ [A-Z][a-z]+$"
    return bool(re.fullmatch(pattern, name))


def ask_name():
    name = input("Enter your full name: ")

    if validate_name(name):
        print("Valid name.")
    else:
        print("Invalid name.")


# Exercise 5
LOWERCASE = string.ascii_lowercase
UPPERCASE = string.ascii_uppercase
DIGITS = string.digits
SPECIAL = "!@#$%^_&*()-+="
ALL_CHARACTERS = LOWERCASE + UPPERCASE + DIGITS + SPECIAL


def generate_password(length):
    if not 6 <= length <= 30:
        raise ValueError("Length must be between 6 and 30.")

    password = [
        secrets.choice(LOWERCASE),
        secrets.choice(UPPERCASE),
        secrets.choice(DIGITS),
        secrets.choice(SPECIAL),
    ]

    for _ in range(length - 4):
        password.append(secrets.choice(ALL_CHARACTERS))

    secrets.SystemRandom().shuffle(password)
    return "".join(password)


def test_password(password, length):
    assert len(password) == length
    assert re.search(r"[a-z]", password)
    assert re.search(r"[A-Z]", password)
    assert re.search(r"\d", password)
    assert re.search(r"[!@#$%^_&*()\-+=]", password)


def test_password_generator():
    for _ in range(100):
        length = secrets.randbelow(25) + 6
        password = generate_password(length)
        test_password(password, length)

    print("All password tests passed.")


def password_program():
    while True:
        try:
            length = int(input("Enter password length (6-30): "))

            if 6 <= length <= 30:
                password = generate_password(length)
                print(f"Your password is: {password}")
                print("Keep it in a safe place!")
                break

            print("Please enter a number between 6 and 30.")

        except ValueError:
            print("Please enter a valid number.")


if __name__ == "__main__":
    upcoming_holiday()

    print("\nPlanetary ages:")
    planetary_ages(1_000_000_000)

    print("\nExtracted numbers:")
    print(return_numbers("k5k3q2g5z6x9bn"))

    print("\nName validation:")
    ask_name()

    print("\nPassword tests:")
    test_password_generator()

    print("\nPassword generator:")
    password_program()
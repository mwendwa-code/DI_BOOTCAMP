import random

wordslist = ['correction', 'childish', 'beach', 'python', 'assertive', 'interference', 'complete', 'share', 'credit card', 'rush', 'south']


def display_word(word, guessed_letters):
    display = ""
    for letter in word:
        if letter == ' ':
            display += '   '
        elif letter in guessed_letters:
            display += letter + ' '
        else:
            display += '* '
    return display.strip()


def display_gallows(wrong_guesses):
    stages = [
        """
          +---+
          |   |
          |   
          |   
          |   
          |   
        __|__
        """,
        """
          +---+
          |   |
          |   O
          |   
          |   
          |   
        __|__
        """,
        """
          +---+
          |   |
          |   O
          |   |
          |   
          |   
        __|__
        """,
        """
          +---+
          |   |
          |   O
          |  /|
          |   
          |   
        __|__
        """,
        """
          +---+
          |   |
          |   O
          |  /|\\
          |   
          |   
        __|__
        """,
        """
          +---+
          |   |
          |   O
          |  /|\\
          |   |
          |   
        __|__
        """,
        """
          +---+
          |   |
          |   O
          |  /|\\
          |   |
          |  / \\
        __|__
        """
    ]
    return stages[wrong_guesses]


def play():
    word = random.choice(wordslist).lower()
    guessed_letters = set()
    wrong_guesses = 0

    print("Welcome to Hangman!")
    print("Guess the word or phrase one letter at a time.")

    while wrong_guesses < 6:
        current_display = display_word(word, guessed_letters)
        print(display_gallows(wrong_guesses))
        print(current_display)

        if '*' not in current_display:
            print(f"You won! The word was: {word}")
            return

        guess = input("Guess a letter: ").lower()

        if len(guess) != 1 or not guess.isalpha():
            print("Please enter a single letter.")
            continue

        if guess in guessed_letters:
            print("You already guessed that letter. Try another one.")
            continue

        guessed_letters.add(guess)

        if guess in word:
            print("Correct! That letter is in the word.")
        else:
            wrong_guesses += 1
            print(f"Wrong guess! You now have {wrong_guesses} wrong guesses out of 6.")

    print(display_gallows(wrong_guesses))
    print(f"You lost! The word was: {word}")


if __name__ == "__main__":
    play()

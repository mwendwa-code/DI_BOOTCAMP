from anagram_checker import AnagramChecker


def main():
    checker = AnagramChecker()

    while True:
        print("\nAnagram Checker")
        print("1. Find anagrams")
        print("2. Exit")

        choice = input("Choose an option: ").strip()
        if choice == "2":
            print("Goodbye!")
            break
        if choice != "1":
            print("Please choose 1 or 2.")
            continue

        word = input("Enter a word: ").strip()
        if not word:
            print("Please enter a word.")
            continue
        if len(word.split()) > 1:
            print("Please enter only one word.")
            continue
        if not word.isalpha():
            print("Please enter letters only.")
            continue

        normalized_word = word.casefold()
        anagrams = checker.get_anagrams(normalized_word)
        print(f'\nYOUR WORD: "{word.upper()}"')
        if checker.is_valid_word(normalized_word):
            print("This is a valid English word.")
            if anagrams:
                print("Anagrams for your word:", ", ".join(anagrams) + ".")
            else:
                print("Anagrams for your word: None found.")
        else:
            print("This is not a valid English word.")


if __name__ == "__main__":
    main()

from game import Game


def get_user_menu_choice():
    menu = {
        "1": "Play a new game",
        "2": "Show scores",
        "3": "Quit",
    }

    while True:
        print("\nRock Paper Scissors")
        for choice, label in menu.items():
            print(f"{choice}. {label}")

        choice = input("Choose an option: ").strip()
        if choice in menu:
            return choice
        print("Invalid choice. Please choose 1, 2, or 3.")


def print_results(results):
    print("\nFinal scores")
    print(f"Wins: {results['win']}")
    print(f"Losses: {results['loss']}")
    print(f"Draws: {results['draw']}")
    print("Thank you for playing!")


def main():
    results = {"win": 0, "loss": 0, "draw": 0}

    while True:
        choice = get_user_menu_choice()
        if choice == "1":
            result = Game().play()
            results[result] += 1
        elif choice == "2":
            print_results(results)
        else:
            print_results(results)
            break


if __name__ == "__main__":
    main()

from menu_manager import MenuManager


manager = None


def load_manager():
    global manager
    manager = MenuManager()
    return manager


def show_restaurant_menu():
    print("\n      *       *")
    print("    *   *   *   *")
    print("   *     *     *")
    print("    *         *")
    print("      *     *")
    print("        * *")
    print("         *")
    print("\nRestaurant menu")
    for item in manager.menu:
        print(f"- {item['name']}: ${item['price']:.2f}")
    if manager.valentine_items:
        print("\nValentine's menu")
        for item in manager.valentine_items:
            print(f"- {item['name']}: {item['price']}")


def add_valentine_item_to_menu():
    name = input("Valentine item name: ").strip()
    price = input("Price (XX,14): ").strip()
    if manager.add_valentine_item(name, price):
        print("Valentine item was added successfully.")
    else:
        print("Invalid Valentine item name or price.")


def add_item_to_menu():
    name = input("Item name: ").strip()
    if not name:
        print("The item name cannot be empty.")
        return

    try:
        price = float(input("Item price: "))
    except ValueError:
        print("Please enter a valid price.")
        return

    manager.add_item(name, price)
    print("item was added successfully")


def remove_item_from_menu():
    name = input("Name of the item to remove: ").strip()
    if manager.remove_item(name):
        print("Item was deleted successfully.")
    else:
        print("There was an error: item was not found.")


def show_user_menu():
    while True:
        print("\n1. Show restaurant menu")
        print("2. Add an item")
        print("3. Delete an item")
        print("4. Add a Valentine item")
        print("5. Exit")
        choice = input("Choose an option: ").strip()

        if choice == "1":
            show_restaurant_menu()
        elif choice == "2":
            add_item_to_menu()
        elif choice == "3":
            remove_item_from_menu()
        elif choice == "4":
            add_valentine_item_to_menu()
        elif choice == "5":
            manager.save_to_file()
            print("The menu was saved. Goodbye!")
            return
        else:
            print("Please choose an option from 1 to 5.")


if __name__ == "__main__":
    load_manager()
    show_user_menu()

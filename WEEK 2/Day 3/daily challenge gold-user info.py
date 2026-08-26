users = []

for _ in range(5):
    name = input("Enter name: ")
    age = input("Enter age: ")
    score = input("Enter score: ")

    users.append((name, age, score))

users.sort(key=lambda user: (user[0], int(user[1]), int(user[2])))

print(users)
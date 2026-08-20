student_grades = {
     "addih": [88, 92, 100],
     "john": [75, 78, 80],
     "gogo": [92, 90, 85],
     "hadija": [83, 88, 92],
     "james": [78, 80, 72]
    }

# 1. Calculate the average grade for each student
print("1. Student averages")

student_averages = {}
for name, grades in student_grades.items():
     average = sum(grades) / len(grades)
     student_averages[name] = average

# 2. Assign each student a letter grade
print("2. Student letter grades")
student_letter_grades = {}
for name, avg in student_averages.items():
    if avg >= 90:
         grade = 'A'
    elif avg >= 80:
        grade = 'B'
    elif avg >= 70:
        grade = 'C'
    elif avg >= 60:
        grade = 'D'
    else:
        grade = 'F'
    student_letter_grades[name] = grade

# 3. Calculate and print the class average
print("3. Class average")
total_average = sum(student_averages.values())
class_size = len(student_averages)
class_average = total_average / class_size

print(student_averages)
print(student_letter_grades)
print(f"{class_average:.2f}")

max_name_length = max(len(name) for name in student_grades.keys())

# 4. Print each student's name, average, and letter grade
print("4. Student results")
for name in student_grades.keys():
    spaces = ' ' * (max_name_length - len(name))
    print(f"{name}:{spaces} Average Grade = {student_averages[name]:.2f}, Letter Grade = {student_letter_grades[name]}")



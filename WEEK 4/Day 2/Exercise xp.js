// ==========================================
// EXERCISE 1: LOCATION
// ==========================================

const person = {
    name: 'John Doe',
    age: 25,
    location: {
        country: 'Canada',
        city: 'Vancouver',
        coordinates: [49.2827, -123.1207]
    }
};

const {
    name,
    location: {
        country,
        city,
        coordinates: [lat, lng]
    }
} = person;

console.log(
    `I am ${name} from ${city}, ${country}. Latitude(${lat}), Longitude(${lng})`
);


// ==========================================
// EXERCISE 2: DISPLAY STUDENT INFO
// ==========================================

function displayStudentInfo({ first, last }) {
    return `Your full name is ${first} ${last}`;
}

console.log(
    displayStudentInfo({
        first: 'Elie',
        last: 'Schoppik'
    })
);


// ==========================================
// EXERCISE 3: USER & ID
// ==========================================

const users = {
    user1: 18273,
    user2: 92833,
    user3: 90315
};

// Part 1
const usersArray = Object.entries(users);

console.log(usersArray);

// Part 2
const doubledUsers = usersArray.map(([user, id]) => {
    return [user, id * 2];
});

console.log(doubledUsers);


// ==========================================
// EXERCISE 4: PERSON CLASS
// ==========================================

class Person {
    constructor(name) {
        this.name = name;
    }
}

const member = new Person('John');

console.log(typeof member);


// ==========================================
// EXERCISE 5: DOG CLASS
// ==========================================

class Dog {
    constructor(name) {
        this.name = name;
    }
}

// Correct answer: Option 2
class Labrador extends Dog {
    constructor(name, size) {
        super(name);
        this.size = size;
    }
}

const labrador = new Labrador('Max', 'large');

console.log(labrador);


// ==========================================
// EXERCISE 6: CHALLENGES
// ==========================================
function haveSameReference(firstvalue, secondvalue) {
    return firstvalue === secondvalue;
}

console.log(haveSameReference([2], [2]));
console.log(haveSameReference({}, {}));

const object1 = {number: 5};
const object2 = object1;
const object3 = object2
const object4 = {number: 5};

object1.number = 4;

console.log(object2.number)
console.log(object3.number)
console.log(object4.number)

class Animal {
    constructor(name, type, color) {
        this.name = name;
        this.type = type;
        this.color = color;
    }
}

class Mammal extends Animal {
    sounds(animalsounds) {
        return `The ${animalsounds}i'm a ${this.type} named ${this.name} and i'm ${this.color}`;
    }
}

const farmercow = new Mammal('Lily', 'cow', 'brown and white');
console.log(farmercow.sounds('Moo! '));

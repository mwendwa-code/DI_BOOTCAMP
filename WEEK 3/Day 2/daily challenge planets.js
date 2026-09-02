const planets = [
  { name: 'Mercury', color: 'gray', moons: 0 },
  { name: 'Venus', color: 'orange', moons: 0 },
  { name: 'Earth', color: 'blue', moons: 1 },
  { name: 'Mars', color: 'red', moons: 2 },
  { name: 'Jupiter', color: 'brown', moons: 4 },
  { name: 'Saturn', color: 'goldenrod', moons: 3 },
  { name: 'Uranus', color: 'lightblue', moons: 2 },
  { name: 'Neptune', color: 'darkblue', moons: 1 },
];

const section = document.querySelector('.listPlanets');

planets.forEach((planetData) => {
  const planet = document.createElement('div');
  planet.classList.add('planet');
  planet.classList.add(planetData.name.toLowerCase());
  planet.textContent = planetData.name;
  planet.style.backgroundColor = planetData.color;

  for (let i = 0; i < planetData.moons; i++) {
    const moon = document.createElement('div');
    moon.classList.add('moon');

    const angle = (Math.PI * 2 * i) / planetData.moons;
    const distance = 45;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    moon.style.left = `${50 + x}px`;
    moon.style.top = `${50 + y}px`;
    planet.appendChild(moon);
  }

  section.appendChild(planet);
});

const style = document.createElement('style');
style.textContent = `
  .mercury { background-color: gray; }
  .venus { background-color: orange; }
  .earth { background-color: blue; }
  .mars { background-color: red; }
  .jupiter { background-color: brown; }
  .saturn { background-color: goldenrod; }
  .uranus { background-color: lightblue; }
  .neptune { background-color: darkblue; }
`;
document.head.appendChild(style);

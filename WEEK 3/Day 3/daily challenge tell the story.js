const form = document.getElementById('libform');
const storyElement = document.getElementById('story');
const shuffleButton = document.getElementById('shuffle-button');

let currentValues = {};

const storyTemplates = [
  (values) => `${values.person} was walking through the ${values.place} when a ${values.adjective} ${values.noun} suddenly began to ${values.verb}.`,
  (values) => `At the ${values.place}, ${values.person} found a ${values.adjective} ${values.noun} and decided to ${values.verb} with it.`,
  (values) => `The ${values.adjective} ${values.noun} loved to ${values.verb} in ${values.place}, and ${values.person} was there to watch.`,
  (values) => `${values.person} shouted, "I will ${values.verb} this ${values.adjective} ${values.noun}!" as they rushed to ${values.place}.`
];

function captureValues() {
  const inputs = {
    noun: document.getElementById('noun').value.trim(),
    adjective: document.getElementById('adjective').value.trim(),
    person: document.getElementById('person').value.trim(),
    verb: document.getElementById('verb').value.trim(),
    place: document.getElementById('place').value.trim(),
  };

  const emptyFields = Object.entries(inputs).filter(([, value]) => value === '');
  if (emptyFields.length > 0) {
    alert('Please fill in all the fields before generating a story!');
    return null;
  }

  currentValues = inputs;
  return inputs;
}

function renderStory(values) {
  const randomStory = storyTemplates[Math.floor(Math.random() * storyTemplates.length)];
  const sentence = randomStory(values);
  storyElement.textContent = sentence;
}

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const values = captureValues();
    if (values) {
      renderStory(values);
    }
  });
}

if (shuffleButton) {
  shuffleButton.addEventListener('click', () => {
    if (Object.keys(currentValues).length === 0) {
      alert('Please generate a story first so the values are available to shuffle.');
      return;
    }

    renderStory(currentValues);
  });
}

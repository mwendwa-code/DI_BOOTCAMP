const totalRounds = 5;
let currentRound = 0;
let score = 0;
let currentQuestion = null;

const scoreEl = document.getElementById('score');
const roundEl = document.getElementById('round');
const emojiDisplay = document.getElementById('emoji-display');
const optionsContainer = document.getElementById('options');
const feedbackEl = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');
const guessForm = document.getElementById('guess-form');
const leaderboardList = document.getElementById('leaderboard');

async function loadLeaderboard() {
  const response = await fetch('/api/leaderboard');
  const leaderboard = await response.json();

  leaderboardList.innerHTML = leaderboard
    .map((entry, index) => `<li>${index + 1}. ${entry.name} - ${entry.score} pts</li>`)
    .join('');
}

async function fetchQuestion() {
  const response = await fetch('/api/question');
  currentQuestion = await response.json();
  renderQuestion();
}

function renderQuestion() {
  if (!currentQuestion) return;

  emojiDisplay.textContent = currentQuestion.emoji;
  optionsContainer.innerHTML = currentQuestion.options
    .map(
      (option) => `
        <label class="option-item">
          <input type="radio" name="guess" value="${option}" />
          <span>${option}</span>
        </label>
      `
    )
    .join('');

  feedbackEl.textContent = 'Choose the correct emoji name.';
  feedbackEl.className = 'feedback';
  nextBtn.hidden = true;
  guessForm.querySelector('button[type="submit"]').disabled = false;
}

async function submitGuess(event) {
  event.preventDefault();

  const selected = guessForm.querySelector('input[name="guess"]:checked');
  if (!selected) {
    feedbackEl.textContent = 'Please choose an option before submitting.';
    feedbackEl.className = 'feedback error';
    return;
  }

  guessForm.querySelector('button[type="submit"]').disabled = true;

  const response = await fetch('/api/guess', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ guess: selected.value })
  });

  const data = await response.json();

  feedbackEl.textContent = data.feedback;
  feedbackEl.className = data.correct ? 'feedback success' : 'feedback error';

  if (data.correct) {
    score += 1;
  }

  scoreEl.textContent = score;

  const options = optionsContainer.querySelectorAll('input[name="guess"]');
  options.forEach((option) => {
    option.disabled = true;
    const optionLabel = option.closest('.option-item');
    if (option.value === data.correctAnswer) {
      optionLabel.style.borderColor = '#22c55e';
      optionLabel.style.background = '#14532d';
    } else if (option.checked) {
      optionLabel.style.borderColor = '#ef4444';
      optionLabel.style.background = '#7f1d1d';
    }
  });

  if (currentRound >= totalRounds - 1) {
    nextBtn.textContent = 'Finish Game';
  } else {
    nextBtn.textContent = 'Next Emoji';
  }

  nextBtn.hidden = false;
}

async function nextRound() {
  currentRound += 1;
  roundEl.textContent = Math.min(currentRound + 1, totalRounds);

  if (currentRound >= totalRounds) {
    const playerName = prompt('Enter your name for the leaderboard:') || 'Player';
    const response = await fetch('/api/leaderboard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: playerName.trim() || 'Player', score })
    });
    const leaderboard = await response.json();
    leaderboardList.innerHTML = leaderboard
      .map((entry, index) => `<li>${index + 1}. ${entry.name} - ${entry.score} pts</li>`)
      .join('');

    emojiDisplay.textContent = '🏁';
    optionsContainer.innerHTML = '';
    feedbackEl.textContent = `Final score: ${score} / ${totalRounds}`;
    feedbackEl.className = 'feedback success';
    nextBtn.hidden = true;
    guessForm.querySelector('button[type="submit"]').disabled = true;
    return;
  }

  await fetchQuestion();
}

guessForm.addEventListener('submit', submitGuess);
nextBtn.addEventListener('click', nextRound);

async function startGame() {
  scoreEl.textContent = score;
  roundEl.textContent = 1;
  await loadLeaderboard();
  await fetchQuestion();
}

startGame();

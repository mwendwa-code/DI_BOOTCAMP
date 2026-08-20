const numbers = [3, 47, 99, -80, 22, 97, 54, -23, 5, 7];
const paragraph = `Artificial intelligence is transforming the way we live and work. From healthcare to transportation, AI applications are becoming increasingly prevalent. Scientists and engineers continue to develop new algorithms and models. The potential for AI to solve complex problems is enormous. However, we must also consider ethical implications and ensure responsible development.`;

const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]);

function renderStats(target, stats) {
    target.innerHTML = `<div class="stats">${stats.map(([label, value]) => `<div class="stat"><small>${escapeHtml(label)}</small><strong>${escapeHtml(value)}</strong></div>`).join('')}</div>`;
}

document.querySelector('#calculate-button').addEventListener('click', () => {
    const constantC = Number(document.querySelector('#constant-c').value);
    const constantH = Number(document.querySelector('#constant-h').value);
    const values = document.querySelector('#d-values').value.split(',').map((value) => Number(value.trim()));
    const result = document.querySelector('#calculator-result');
    if (!constantH || values.some((value) => Number.isNaN(value))) {
        result.textContent = 'Enter valid numbers, and H cannot be zero.';
        return;
    }
    result.textContent = `Results: ${values.map((value) => Math.round(Math.sqrt((2 * constantC * value) / constantH))).join(', ')}`;
});

renderStats(document.querySelector('#list-result'), [
    ['Original list', numbers.join(', ')],
    ['Descending', [...numbers].sort((a, b) => b - a).join(', ')],
    ['Sum', numbers.reduce((sum, number) => sum + number, 0)],
    ['First / last', `${numbers[0]} / ${numbers.at(-1)}`],
    ['Greater than 50', numbers.filter((number) => number > 50).join(', ')],
    ['Smaller than 10', numbers.filter((number) => number < 10).join(', ')],
    ['Squared', numbers.map((number) => number ** 2).join(', ')],
    ['Average', (numbers.reduce((sum, number) => sum + number, 0) / numbers.length).toFixed(2)],
    ['Largest / smallest', `${Math.max(...numbers)} / ${Math.min(...numbers)}`],
]);

const paragraphWords = paragraph.split(/\s+/);
const uniqueWords = new Set(paragraphWords.map((word) => word.toLowerCase().replace(/[.,?!]/g, '')));
renderStats(document.querySelector('#paragraph-result'), [
    ['Characters', paragraph.length],
    ['Sentences', (paragraph.match(/[.!?]/g) || []).length],
    ['Words', paragraphWords.length],
    ['Unique words', uniqueWords.size],
    ['Non-whitespace', paragraph.replace(/\s/g, '').length],
    ['Average words / sentence', (paragraphWords.length / 5).toFixed(2)],
]);

document.querySelector('#frequency-button').addEventListener('click', () => {
    const text = document.querySelector('#frequency-text').value.trim();
    const result = document.querySelector('#frequency-result');
    if (!text) {
        result.textContent = 'Enter some text first.';
        return;
    }
    const counts = text.split(/\s+/).reduce((words, word) => {
        const key = word.toLowerCase();
        words[key] = (words[key] || 0) + 1;
        return words;
    }, {});
    result.innerHTML = `<div class="word-list">${Object.entries(counts).sort(([a], [b]) => a.localeCompare(b)).map(([word, count]) => `<span class="word-chip">${escapeHtml(word)}: ${count}</span>`).join('')}</div>`;
});

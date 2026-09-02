const input = document.getElementById('letterInput');

if (input) {
  input.addEventListener('input', () => {
    input.value = input.value.replace(/[^a-zA-Z]/g, '');
  });
}

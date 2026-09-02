// Exercise 4: Volume of a sphere

// Get the form
const sphereForm = document.getElementById("MyForm");

if (sphereForm) {
  sphereForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const radiusInput = document.getElementById("radius");
    const volumeInput = document.getElementById("volume");

    const radius = parseFloat(radiusInput.value);

    // Check if radius is a valid positive number
    if (isNaN(radius) || radius <= 0) {
      alert("Please enter a valid positive number for radius!");
      return;
    }

    // Calculate volume of a sphere: V = (4/3) * π * r³
    const volume = (4 / 3) * Math.PI * Math.pow(radius, 3);

    // Display the result
    volumeInput.value = volume.toFixed(2);
  });
}

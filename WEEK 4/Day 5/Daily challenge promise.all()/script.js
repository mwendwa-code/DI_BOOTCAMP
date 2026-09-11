const form = document.getElementById("sunriseForm");
const result = document.getElementById("result");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get values from the form
    const lat1 = document.getElementById("lat1").value;
    const lon1 = document.getElementById("lon1").value;

    const lat2 = document.getElementById("lat2").value;
    const lon2 = document.getElementById("lon2").value;

    // Create the two promises
    const city1 = fetch(
        `https://api.sunrise-sunset.org/json?lat=${lat1}&lng=${lon1}&formatted=0`
    )
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch first city");
            }
            return response.json();
        });

    const city2 = fetch(
        `https://api.sunrise-sunset.org/json?lat=${lat2}&lng=${lon2}&formatted=0`
    )
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch second city");
            }
            return response.json();
        });

    // Wait until BOTH promises are resolved
    Promise.all([city1, city2])
        .then(data => {

            const sunrise1 = new Date(data[0].results.sunrise);
            const sunrise2 = new Date(data[1].results.sunrise);

            result.innerHTML = `
                <h2>Sunrise Results</h2>

                <p>
                    <strong>First City:</strong>
                    ${sunrise1.toLocaleTimeString()}
                </p>

                <p>
                    <strong>Second City:</strong>
                    ${sunrise2.toLocaleTimeString()}
                </p>
            `;
        })
        .catch(error => {
            result.innerHTML = `<p>Error: ${error.message}</p>`;
        });
});

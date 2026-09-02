function calculateTip() {
    const billAmount = parseFloat(document.getElementById('billAmt').value);
    const serviceQuality = Number(document.getElementById('serviceQual').value);
    let numberOfPeople = Number(document.getElementById('numOfPeople').value);
    const totalTip = document.getElementById('totalTip');
    const tip = document.getElementById('tip');
    const each = document.getElementById('each');

    if (serviceQuality === 0 || isNaN(billAmount) || billAmount === 0) {
        alert('Please enter the bill amount and service quality.');
        return;
    }

    if (isNaN(numberOfPeople) || numberOfPeople < 1) {
        numberOfPeople = 1;
        if (each) {
            each.style.display = 'none';
        }
    } else if (each) {
        each.style.display = 'block';
    }

    const total = ((billAmount * serviceQuality) / numberOfPeople).toFixed(2);
    totalTip.style.display = 'block';
    tip.textContent = total;
}

function validateEmailWithoutRegex(email) {
    if (!email || typeof email !== 'string') return false;

    const atIndex = email.indexOf('@');
    const dotIndex = email.lastIndexOf('.');
    if (atIndex <= 0 || dotIndex <= atIndex + 1 || dotIndex === email.length - 1) {
        return false;
    }

    const localPart = email.slice(0, atIndex);
    const domainPart = email.slice(atIndex + 1);
    if (!localPart || !domainPart) return false;

    const allowedChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789._%+-';
    for (const char of localPart) {
        if (!allowedChars.includes(char) && char !== '@') {
            return false;
        }
    }

    for (const char of domainPart) {
        if (!/[a-zA-Z0-9.-]/.test(char)) {
            return false;
        }
    }

    return true;
}

function validateEmailWithRegex(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getUserLocation() {
    const result = document.getElementById('geoResult');

    if (!navigator.geolocation) {
        result.textContent = 'Geolocation is not supported by this browser.';
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            result.textContent = `Latitude: ${position.coords.latitude}\nLongitude: ${position.coords.longitude}`;
        },
        (error) => {
            result.textContent = `Unable to retrieve your location: ${error.message}`;
        }
    );
}

document.addEventListener('DOMContentLoaded', () => {
    const totalTip = document.getElementById('totalTip');
    const calculateButton = document.getElementById('calculate');
    const emailForm = document.getElementById('emailForm');
    const emailInput = document.getElementById('emailInput');
    const emailOutput = document.getElementById('emailResult');
    const locationButton = document.getElementById('getLocation');

    if (totalTip) {
        totalTip.style.display = 'none';
    }

    if (calculateButton) {
        calculateButton.onclick = calculateTip;
    }

    if (emailForm) {
        emailForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = emailInput.value.trim();
            const isValid = validateEmailWithRegex(email);
            emailOutput.textContent = isValid ? 'Email is valid.' : 'Email is invalid.';
            emailOutput.style.color = isValid ? 'green' : 'red';
        });
    }

    if (locationButton) {
        locationButton.addEventListener('click', getUserLocation);
    }
});

// JavaScript to toggle wake lock functionality
let wakeLock = null;

// Activate button functionality
const activateButton = document.getElementById("activate-button");
const deactivateButton = document.getElementById("deactivate-button");
const status = document.getElementById("status");

activateButton.addEventListener("click", async () => {
    try {
        wakeLock = await navigator.wakeLock.request("screen");
        status.textContent = "Active";
        status.style.color = "#28a745";
    } catch (err) {
        console.error(`Error activating wake lock: ${err.message}`);
    }
});

// Deactivate button functionality
deactivateButton.addEventListener("click", async () => {
    if (wakeLock) {
        wakeLock.release();
        wakeLock = null;
        status.textContent = "Inactive";
        status.style.color = "#dc3545";
    }
});

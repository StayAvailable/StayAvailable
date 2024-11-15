let wakeLock = null;

async function requestWakeLock() {
    try {
        // Request Wake Lock to prevent sleep mode
        wakeLock = await navigator.wakeLock.request('screen');
        console.log("Wake Lock is active");

        // Update status on the webpage
        document.getElementById('status').innerText = 'Active';

        // Show deactivate button and hide activate button
        document.getElementById('activateButton').style.display = 'none';
        document.getElementById('deactivateButton').style.display = 'inline-block';

        // Add event listener for when Wake Lock is released
        wakeLock.addEventListener('release', () => {
            console.log("Wake Lock has been released.");
            document.getElementById('status').innerText = 'Inactive';
            document.getElementById('activateButton').style.display = 'inline-block';
            document.getElementById('deactivateButton').style.display = 'none';
        });
    } catch (err) {
        console.error(`Error requesting Wake Lock: ${err.name}, ${err.message}`);
        document.getElementById('status').innerText = 'Unable to activate Wake Lock.';
    }
}

function releaseWakeLock() {
    if (wakeLock !== null) {
        wakeLock.release();
        wakeLock = null;
    }
}

// Activate Wake Lock when the activate button is clicked
document.getElementById("activateButton").addEventListener("click", () => {
    requestWakeLock();
});

// Deactivate Wake Lock when the deactivate button is clicked
document.getElementById("deactivateButton").addEventListener("click", () => {
    releaseWakeLock();
});

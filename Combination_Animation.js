// Combination_Animation.js

let currentProfile = 1; // Variable to track the current profile

// Function to load a specific profile
function loadProfile(profileNumber) {
    currentProfile = profileNumber;
    document.getElementById('currentProfile').innerText = "Overview";
    console.log('Loading Overview');
}

// Event listener for stock dropdown change
document.getElementById('stock').addEventListener('change', function() {
    var filters = document.querySelector('.filters');
    if (this.value !== '') {
        filters.classList.add('show'); // Show filters if a stock is selected
    } else {
        filters.classList.remove('show'); // Hide filters if no stock is selected
    }
});

// Function to generate graph based on user selections
function generateGraph() {
    const symbol = document.getElementById('stock').value;
    const startDate = document.getElementById('fromDate').value;
    const endDate = document.getElementById('toDate').value;

    // Fetch data from MongoDB and generate graph
    // ...
}

// Optional: You can add JavaScript to handle chart hover events if needed
// For example, to log a message when a chart is hovered over
document.querySelectorAll('.chart').forEach(chart => {
    chart.addEventListener('mouseenter', function() {
        console.log('Chart hovered:', this.id);
    });
});

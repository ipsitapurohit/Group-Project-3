function generateGraph() {
    const symbol = document.getElementById('stock').value;
    const startDate = document.getElementById('fromDate').value;
    const endDate = document.getElementById('toDate').value;
    // Fetch data from MongoDB
    fetch(`http://localhost:3100/api/getData?symbol=${symbol}&startDate=${startDate}&endDate=${endDate}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Received data:', data); // Log the data received from the backend
            // Validate data
            if (!data || !Array.isArray(data)) {
                throw new Error('Invalid data format');
            }
            if (data.length === 0) {
                throw new Error('No data found from Backend');
            }
            console.log('Raw data from backend:', data);
            const formattedData = formatDataForUIProcessing(data);
            const chartData = processData(formattedData);
            renderChart(chartData);
        })
        .catch(error => console.error('Error fetching or processing data:', error));
}
function formatDataForUIProcessing(data) {
    // Format data
    const formattedData = data[0].Results.map(entry => ({
        Date: formatDate(entry.Date),
        Close: parseFloat(entry.Close).toFixed(2) // Round to two decimal places
    }));
    // Output the formatted data
    console.log('Formatted Data  ', formattedData);
    return formattedData;
}
// Function to format date as "YYYY-MM-DD"
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
function processData(formattedData) {
    const labels = formattedData.map(entry => entry.Date);
    const values = formattedData.map(entry => entry.Close);
    return {
        labels: labels,
        values: values
    };
}
function renderChart(chartData) {
    console.log('Chart data:', chartData); // Check if chartData is correct
    const trace = {
        x: chartData.labels,
        y: chartData.values,
        mode: 'lines',
        line: {
            color: 'rgb(75, 192, 192)',
            width: 2
        }
    };
    const layout = {
        title: 'Stock Performance',
        xaxis: {
            title: 'Date',
            type: 'date',
            tickformat: '%b %Y'
        },
        yaxis: {
            title: 'Close Price',
            rangemode: 'tozero'
        }
    };
    console.log('Rendering chart...'); // Check if the chart rendering is attempted
    // Plotly.newPlot to render the line chart
    Plotly.newPlot('chartContainer', [trace], layout)
    .then(() => console.log('Chart rendered successfully'))
    .catch(error => console.error('Error rendering chart:', error));
}
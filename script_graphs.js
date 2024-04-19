function generateGraphs() {
    const symbol1 = document.getElementById('stock1').value;
    const symbol2 = document.getElementById('stock2').value;
    const startDate = '2013-01-01';
    const endDate = '2023-12-31';
    Promise.all([
        fetchData(symbol1, startDate, endDate),
        fetchData(symbol2, startDate, endDate)
    ]).then(data => {
        const [data1, data2] = data;
        renderCharts(data1, data2);
    }).catch(error => console.error('Error fetching or processing data:', error));
}
function generateGraphs2() {
    const symbol1 = document.getElementById('stock1').value;
    Promise.all([
        fetchData2(symbol1)
    ]).then(data => {
        const [data1, data2] = data;
        renderCharts2(data1, data2);
    }).catch(error => console.error('Error fetching or processing data:', error));
}
function fetchData(symbol, startDate, endDate) {
    return fetch(`http://localhost:3100/api/getData?symbol=${symbol}&startDate=${startDate}&endDate=${endDate}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
}
function fetchData2(symbol) {
    return fetch(`{http://localhost:3100/api/getData?symbol=${symbol}&startDate=2015-01-01&endDate=2020-12-31}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
}
// Function to format date as "YYYY-MM-DD"
function formatDate1(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
function processData1(formattedData1) {
    const labels1 = formattedData1.map(entry => entry.Date);
    const values1 = formattedData1.map(entry => entry.Close);
    return {
        labels: labels1,
        values: values1
    };
}
function processData2(formattedData2) {
    const labels2 = formattedData2.map(entry => entry.Date);
    const values2 = formattedData2.map(entry => entry.Close);
    return {
        labels: labels2,
        values: values2
    };
}
function renderCharts(data1, data2) {
    const formattedData1 = formatDataForUIProcessing1(data1);
    const formattedData2 = formatDataForUIProcessing2(data2);
    const chartData1 = processData1(formattedData1);
    const chartData2 = processData2(formattedData2);
    renderChart1(chartData1, chartData2, 'chartContainers');
}
function renderCharts2(data1, data2) {
    const formattedData1 = formatDataForUIProcessing1(data1);
    const formattedData2 = formatDataForUIProcessing2(data2);
    const chartData1 = processData1(formattedData1);
    const chartData2 = processData2(formattedData2);
    renderChart3(chartData1, 'chartContainers');
}
function formatDataForUIProcessing1(data1) {
    // Format data
    const formattedData1 = data1[0].Results.map(entry => ({
        Date: formatDate(entry.Date),
        Close: parseFloat(entry.Close).toFixed(2) // Round to two decimal places
    }));
    // Output the formatted data
    console.log('Formatted Data for stock 1 ', formattedData1);
    return formattedData1;
}
function formatDataForUIProcessing2(data2) {
    // Format data
    const formattedData2 = data2[0].Results.map(entry => ({
        Date: formatDate(entry.Date),
        Close: parseFloat(entry.Close).toFixed(2) // Round to two decimal places
    }));
    // Output the formatted data
    console.log('Formatted Data for stock 2 ', formattedData2);
    return formattedData2;
}
function renderChart1(chartData1, chartData2, containerId) {
    const trace1 = {
        x: chartData1.labels,
        y: chartData1.values,
        mode: 'lines',
        line: {
            color: 'rgb(75, 192, 192)',
            width: 2
        },
        name: 'Stock 1'
    };
    const trace2 = {
        x: chartData2.labels,
        y: chartData2.values,
        mode: 'lines',
        line: {
            color: 'rgb(192, 75, 192)',
            width: 2
        },
        name: 'Stock 2'
    };
    const layout = {
        title: 'Stock Performance Comparison',
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
    Plotly.newPlot(containerId, [trace1, trace2], layout)
        .then(() => console.log('Chart rendered successfully'))
        .catch(error => console.error('Error rendering chart:', error));
}
function renderChart3(chartData1, containerId) {
    const trace1 = {
        x: chartData1.labels,
        y: chartData1.values,
        mode: 'lines',
        line: {
            color: 'rgb(75, 192, 192)',
            width: 2
        },
        name: 'Stock 1'
    };
    const layout = {
        title: 'Stock Performance All Data',
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
    Plotly.newPlot(containerId, [trace1, trace2], layout)
        .then(() => console.log('Chart rendered successfully'))
        .catch(error => console.error('Error rendering chart:', error));
}
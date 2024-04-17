<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stock Market Dashboard</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="Combination_Style.css"> <!-- Reference to Combination_Style.css -->

    <!-- Include Plotly.js -->
    <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
    <script src="script.js"></script>
</head>
<body>
    <header>
        <h1>STOCK MARKET DASHBOARD</h1>
        <div id="currentProfile">Profile 1</div> <!-- Label indicating the current profile -->
    </header>

    <!-- Chart containers -->
    <div class="chart-container">
        <div id="chartContainer1" class="chart large">
            <div class="filter-top">
                <label for="stock1">Stock:</label>
                <select id="stock1">
                    <option value="AAPL">Apple</option>
                    <option value="GOOG">Google</option>
                    <option value="META">Meta</option>
                    <option value="TSLA">Tesla</option>
                    <option value="MSFT">Microsoft</option>
                    <option value="NVDA">Nvidia</option>
                    <option value="NFLX">Netflix</option>
                </select>
                <label for="fromDate1">From Date:</label>
                <input type="date" id="fromDate1" min="2013-01-01" max="2023-12-31">
                <label for="toDate1">To Date:</label>
                <input type="date" id="toDate1" min="2013-01-01" max="2023-12-31">
                <button class="generateButton" onclick="generateGraph()">Generate Graph</button>
            </div>
        </div> <!-- Large chart at the bottom -->
    </div>
    <div class="chart-container">
        <div id="chartContainer2" class="chart small"></div> <!-- Small chart at the left upper quarter -->
        <div class="form">
            <label for="stock2">Stock:</label>
            <select id="stock2">
                <option value="AAPL">Apple</option>
                <option value="GOOG">Google</option>
                <option value="META">Meta</option>
                <option value="TSLA">Tesla</option>
                <option value="MSFT">Microsoft</option>
                <option value="NVDA">Nvidia</option>
                <option value="NFLX">Netflix</option>
            </select>
            <label for="fromDate2">From Date:</label>
            <input type="date" id="fromDate2" min="2013-01-01" max="2023-12-31">
            <br>
            <label for="toDate2">To Date:</label>
            <input type="date" id="toDate2" min="2013-01-01" max="2023-12-31">
            <br>
            <button class="generateButton" onclick="generateGraph()">Generate Graph</button>
        </div>

        <div id="chartContainer3" class="chart small"></div> <!-- Small chart at the right upper quarter -->
        <div class="form">
            <label for="stock3">Stock:</label>
            <select id="stock3">
                <option value="AAPL">Apple</option>
                <option value="GOOG">Google</option>
                <option value="META">Meta</option>
                <option value="TSLA">Tesla</option>
                <option value="MSFT">Microsoft</option>
                <option value="NVDA">Nvidia</option>
                <option value="NFLX">Netflix</option>
            </select>
            <label for="fromDate3">From Date:</label>
            <input type="date" id="fromDate3" min="2013-01-01" max="2023-12-31">
            <br>
            <label for="toDate3">To Date:</label>
            <input type="date" id="toDate3" min="2013-01-01" max="2023-12-31">
            <br>
            <button class="generateButton" onclick="generateGraph()">Generate Graph</button>
        </div>

    </div>
</body>
</html>

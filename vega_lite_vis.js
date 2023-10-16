// First, load the map spec dynamically
fetch('map.vg.json')
    .then(response => response.json())
    .then(data => {
        // Store the loaded spec in the mapSpec variable
        var mapSpec = data;

        function updateMapVisualization(startYear, endYear) {
            var modifiedMapSpec = JSON.parse(JSON.stringify(mapSpec)); // Deep copy of the spec

            // Find the filter transform and update its condition
            for (var i = 0; i < modifiedMapSpec.transform.length; i++) {
                var transform = modifiedMapSpec.transform[i];
                if (transform.filter && transform.filter.includes("startYear") && transform.filter.includes("endYear")) {
                    transform.filter = `(year(datum.ignition_date) >= ${startYear} && year(datum.ignition_date) <= ${endYear})`;
                    break;
                }
            }

            // Re-render the map visualization with the modified spec
            vegaEmbed('#map', modifiedMapSpec, {actions:false}).catch(console.error);
        }

        // Initial render of the map
        vegaEmbed('#map', mapSpec, {actions:false}).catch(console.error);

        // Expose the updateMapVisualization function to the global scope so it can be called from the HTML slider
        window.updateMapVisualization = updateMapVisualization;
    })
    .catch(console.error);

// Load the donut_chart spec dynamically
fetch('donut_chart.vg.json')
    .then(response => response.json())
    .then(data => {
        // Store the loaded spec in the donut_chart variable
        var donut_chart = data;

        function updateDCVisualization(startYear, endYear) {
            var modifiedSpec = JSON.parse(JSON.stringify(donut_chart)); // Deep copy of the spec

            // Find the filter transform and update its condition
            for (var i = 0; i < modifiedSpec.transform.length; i++) {
                var transform = modifiedSpec.transform[i];
                if (transform.filter && transform.filter.includes("startYear") && transform.filter.includes("endYear")) {
                    transform.filter = `(year(datum.ignition_date) >= ${startYear} && year(datum.ignition_date) <= ${endYear})`;
                    break;
                }
            }

            // Re-render the visualization with the modified spec
            vegaEmbed('#donut_chart', modifiedSpec, {actions:false}).catch(console.error);
        }

        // Initial render of the donut chart
        vegaEmbed('#donut_chart', donut_chart, {actions:false}).catch(console.error);

        // Expose the updateVisualization function to the global scope so it can be called from the HTML slider
        window.updateVisualization = updateDCVisualization;
    })
    .catch(console.error);

let donutView;

// Fetch the simplified donut_chart spec (assuming the spec is in a separate file named `donut_chart.vg.json`)
const fetchDonutChart = fetch('donut_chart.vg.json').then(response => response.json());

// Once the fetch is complete
fetchDonutChart.then(donut_chart => {
    
    // Embed the donut chart visualization and keep a reference to its view
    vegaEmbed('#vis', donut_chart, {actions:false})
        .then(result => {
            donutView = result.view;

            // Initialize the noUiSlider
            const slider = document.getElementById('yearRangeSlider');
            noUiSlider.create(slider, {
                start: [1899, 2022],
                range: {
                    'min': 1899,
                    'max': 2022
                },
                format: {
                    to: value => parseInt(value),
                    from: value => parseInt(value)
                },
                tooltips: [true, true],
                connect: true
            });

            slider.noUiSlider.on('update', function(values) {
                const startYear = parseInt(values[0]);
                const endYear = parseInt(values[1]);
                document.getElementById('yearRange').innerText = `${startYear} - ${endYear}`;

                // Update the donut chart visualization using the Vega view API
                if (donutView) {
                    donutView.signal('startYear', startYear).signal('endYear', endYear).run();
                }
            });

        })
        .catch(console.error);
}).catch(console.error);

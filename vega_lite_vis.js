// Variables to hold the Vega views
let mapView;
let donutView;

// Fetch the map spec
const fetchMap = fetch('map.vg.json').then(response => response.json());

// Fetch the donut_chart spec
const fetchDonutChart = fetch('Charts/donut_chart (cascade).vg.json').then(response => response.json());

// Once both fetches are complete
Promise.all([fetchMap, fetchDonutChart]).then(([mapSpec, donut_chart]) => {
    
    // Embed the map visualization and keep a reference to its view
    vegaEmbed('#map', mapSpec, {actions:false})
        .then(result => {
            mapView = result.view;
        })
        .catch(console.error);

    // Embed the donut chart visualization and keep a reference to its view
    vegaEmbed('#donut_chart', donut_chart, {actions:false})
        .then(result => {
            donutView = result.view;
        })
        .catch(console.error);

    // Initialize the noUiSlider
    var slider = document.getElementById('yearRangeSlider');
    noUiSlider.create(slider, {
        start: [1899, 2020],
        range: {
            'min': 1899,
            'max': 2020
        },
        format: {
            to: function(value) {
                return parseInt(value);
            },
            from: function(value) {
                return parseInt(value);
            }
        },
        tooltips: [true, true],
        connect: true
    });

    slider.noUiSlider.on('update', function(values, handle) {
        var startYear = parseInt(values[0]);
        var endYear = parseInt(values[1]);
        document.getElementById('yearRange').innerText = `${startYear} - ${endYear}`;

        // Update the map visualization using the Vega view API
        if (mapView) {
            mapView.signal('startYear', startYear).signal('endYear', endYear).run();
        }

        // Update the donut chart visualization using the Vega view API
        if (donutView) {
            donutView.signal('startYear', startYear).signal('endYear', endYear).run();
        }
    });
}).catch(console.error);    

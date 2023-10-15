// Embedding Vega Visualizations
var vg_1 = "map.vg.json";
vegaEmbed("#map", vg_1, {actions:false}).then(function(result) {
    // Access the Vega view instance as result.view
}).catch(console.error);

var vg_2 = "donut_chart.vg.json";
vegaEmbed("#donut_chart", vg_2, {actions:false}).then(function(result) {
    // Access the Vega view instance as result.view
}).catch(console.error);

// Slider logic
var yearRangeSlider = document.getElementById('yearRangeSlider');
var yearRangeOutput = document.getElementById('yearRange');

noUiSlider.create(yearRangeSlider, {
    start: [1899, 2020],
    connect: true,
    range: {
        'min': 1899,
        'max': 2020
    }
});

yearRangeSlider.noUiSlider.on('update', function(values, handle) {
    yearRangeOutput.innerHTML = Math.round(values[0]) + ' - ' + Math.round(values[1]);
    
    // Update the visualization
    updateVisualization(Math.round(values[0]), Math.round(values[1]));
});

function updateVisualization(startYear, endYear) {
    // Load your Vega-Lite specification from the JSON file
    fetch('donut_chart.vg.json')
      .then(response => response.json())
      .then(vegaLiteSpec => {
        // Modify the filter condition in the Vega-Lite specification
        for (var i = 0; i < vegaLiteSpec.transform.length; i++) {
          var transform = vegaLiteSpec.transform[i];
          if (transform.filter && transform.filter.includes("startYear") && transform.filter.includes("endYear")) {
            transform.filter = `(datum.year >= ${startYear} && datum.year <= ${endYear})`;
            break;
          }
        }
  
        // Re-render the visualization with the modified spec
        vegaEmbed('#donut_chart', vegaLiteSpec);
      })
      .catch(error => console.error(error));
  }
  

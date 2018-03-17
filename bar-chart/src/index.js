'use strict';

const GDP_DATA_URL = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';

fetch(GDP_DATA_URL)
  .then((res) => res.json())
  .then((gdpData) => {
    // generateBarChart(gdpData);
}).catch((error) => {
    console.log(error);
}); 

// TODO: Replace placeholders with chartData properties
function generateBarChart(chartdata) {
  const chart = c3.generate({
    bindto: '#chart', 
    data: {
      keys: {
        value: ['DATE', 'VALUE']
      }
    },
    types: {
      data: 'bar'
    },
    bar: {
      width: {
        ratio: 0.5
      }
    },
    axis: {
      y: {
        label: {
          text: 'Gross Domestic Product',
          position: 'outer-middle'
        }
      },
      x: {
        label: {
          text: 'Year',
          position: 'outer-center'
        }
      }
    }
  });
}
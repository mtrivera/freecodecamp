'use strict';

const GDP_DATA_URL = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';

fetch(GDP_DATA_URL)
  .then((res) => res.json())
  .then((gdpData) => {
    const dataArr = gdpData.data.slice(0);
    // Quarter periods stored at index 0
    const quarters = createArr(dataArr, 0);
    // Amounts in billion stored at index 1
    const billions = createArr(dataArr, 1);
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

function createArr(inputArr, indexFilter) {
  const outputArr = [];
  for (let count = 0; count < inputArr.length; count += 1) {
    outputArr[count] = inputArr[count][indexFilter];
  }
  return outputArr;
}
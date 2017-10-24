function getUserInput() {
  $('button.search').on('click', function() {
    let query = $('input').val();
    getQuery(query);
  });
}

function getQuery(searchQuery) {
  $.ajax({
    url: 'https://en.wikipedia.org/w/api.php',
    headers: { 'Api-User-Agent': 'Wiki_Viewer/1.0' },
    data: {
      action: 'opensearch',
      format: 'json',
      origin: '*',
      search: searchQuery
    },
    type: 'GET',
    dataType: 'json',
    success: function(data) {
       displayResults(data);
    }             
  });
}

function displayResults(listData) {
  let maxResults = 10;
  let html = '';

  for(let count = 0; count < maxResults; count++) { 
    html += '<li>';
    html += '<a href=' + listData[3][count] + ' ' + 'target=_blank>';
    html += '<h2>' + listData[1][count] + '</h2>';
    html += '<p>' + listData[2][count] + '</p>';
    html += '</a>';
    html += '</li>';
  }
  $('ul.list').html(html);
}

$(document).ready(function() {
  getUserInput();
});
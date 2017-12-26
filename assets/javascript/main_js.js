// Declare Variables
// ============================================

var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
queryURL += '?' + $.param({
  'api-key': "f04f7f7e1d4f4083b9ec4e13e1357f4a",
  'q': term,
  'fq': records,
  'begin_date': startYear,
  'end_date': endYear
});

// AJAX request
$.ajax({
  url: queryURL,
  method: 'GET',
}).done(function(result) {
	// DeBugger
	console.log(result);

	// adding result shortcut, creating div element to store h2 elements
	var docs = result.response.docs;
	var newDiv = $('<div>');
	// For Loop to Populate HTML with result array
	for (i=0;i<docs.length;i++) {
		//creating h2 elements to store each articles headline
		var h = $('<h2>');
		h.text(i + " " +docs[i].headline.main);
		h.attr('href', docs[i].web_url);
		// appending h2 elements to newiv
		newDiv.append(h);
  	}

  	//appending new div to main div in HTML body
  	$('.main').append(newDiv);
})


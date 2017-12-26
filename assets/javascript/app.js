//Click event for Submit button
$("#search").on("click",function() {
	ajaxFunction();

});

//Click event for Clear Results button
//$("#clear").on("click", function() {
//});

//Create working transfers of data between the text-boxes and the backend.
//Here we grab the text from the input box.
var term = $("#search-term").val();
var records =$("#number-records").val();
var startYear = $("#start-year").val();
var endYear = $("#end-year").val();

function ajaxFunction () {
var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
queryURL += '?' + $.param({
  'api-key': "01b8f15e77a54651bc736dfce7ffdb71",
  'q': "John Kennedy",
  'begin_date': "20151220",
  'end_date': "20171220"
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
	for (i=0;i<records;i++) {
		//creating h2 elements to store each articles headline
		var h = $('<h2>');
		h.text(i + " " +docs[i].headline.main);
		h.attr('href', docs[i].web_url);
		// appending h2 elements to newiv
		newDiv.append(h);
  	}

  	//appending new div to main div in HTML body
  	$('#main').append(newDiv);
})
}



//Experiment with creating content regions for where the article will go.
var retrieveArticles = [];
var results = $("<div>");
$("#top-articles").append(results);



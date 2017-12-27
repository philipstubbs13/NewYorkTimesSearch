//API key: 01b8f15e77a54651bc736dfce7ffdb71

//Set up variables
//=====================================================
var authKey = "01b8f15e77a54651bc736dfce7ffdb71";

var queryTerm = "";
var numResults = 0;
var startYear = 0;
var endYear = 0;

//URL Base
var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey;
var queryURL = queryURLBase;
//Variable to track number of articles
var articleCounter = 0;

//Functions
//======================================================

function runQuery(numArticles, queryURl) {

	//AJAX Function
	$.ajax({url: queryURL, method: "GET"})
		.done(function(NYTData) {

			//Clear the main div from the previous run/search.
			$("#main").empty();

			for (var i = 0; i < numArticles; i++){
				console.log(NYTData.response.docs[i].headline.main);
				console.log(NYTData.response.docs[i].section_name);
				console.log(NYTData.response.docs[i].pub_date);
				console.log(NYTData.response.docs[i].byline.original);
				console.log(NYTData.response.docs[i].web_url);

				//Start dumping to HTML here.
				var mainSection = $("<div>");
				mainSection.addClass("main mb-5");
				mainSection.attr("id", "articleDiv-" + i);
				$("#main").append(mainSection);

				//Check if headline exists.
				if (NYTData.response.docs[i].headline.main != null) {
					console.log(NYTData.response.docs[i].headline.main);
					$("#articleDiv-" + i).append("<h3>" + NYTData.response.docs[i].headline.main + "</h3>");
				}

				//Check if byline exists.
				if (NYTData.response.docs[i].byline && NYTData.response.docs[i].byline.hasOwnProperty("original")) {
					console.log(NYTData.response.docs[i].byline.original);
					$("#articleDiv-" + i).append("<h5>" + NYTData.response.docs[i].byline.original + "</h5>");
				}

				//Check if section name exists.
				if (NYTData.response.docs[i].section_name != null) {
					console.log(NYTData.response.docs[i].section_name);
					$("#articleDiv-" + i).append("<h5>" + NYTData.response.docs[i].section_name + "</h5>");

				}

				//attach the content to the appropriate div in the HTML.
				$("#articleDiv-" + i).append("<h5>" + NYTData.response.docs[i].pub_date + "</h5>");
				$("#articleDiv-" + i).append("<a target=_blank href=" + NYTData.response.docs[i].web_url + ">" + NYTData.response.docs[i].web_url + "</a>");
			}

			//Debugging to console...
			console.log(queryURL);
			console.log(numArticles);
			console.log(NYTData);
		})

}

//Main Processes
//========================================================

$("#search").on("click", function() {

	//Get search term.
	var queryTerm = $("#search-term").val().trim();

	//Add in the Search Term
	var newURL = queryURLBase + "&q=" + queryTerm;

	//Get the number of records
	numResults = $("#number-records").val();

	//Get the Start year and end year.
	startYear = $("#start-year").val().trim();
	endYear = $("#end-year").val().trim();

	if (parseInt(startYear)) {
		//Add the necessary fields.
		startYear = startYear + "0101";
		//Add the date information to the URL
		newURL = newURL +  "&begin_date=" + startYear;
	}

	if (parseInt(endYear)) {
		//Add the necessary fields.
		endYear = endYear + "0101";
		//Add the date information to the URL
		newURL = newURL +  "&end_date=" + endYear;
	}

	//Send the AJAX Call the newly assembled URL
	runQuery(numResults, newURL);

	return false;
})


//1. Retrieve user inputs and convert to variables.
//2. Use those variables to run an AJAX call to the New York Times.
//3. Break down the NYT Object into usable fields.
//4. Dynamically generate html content.

//5. Dealing with "edge cases" -- bugs or situations that are not intuitive.
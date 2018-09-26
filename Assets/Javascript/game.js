$(document).ready(function(){

    // empty array to hold the value of buttons created
    var topics= [];

    function displayGif(){

    // use the search word to grab the data
    var x = $(this).data("search");
    console.log(x);
    
    // api link and key for giphy with a limit of 10
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=GFANg7EsACPby359OcaadValMQMujRvw&limit=10";

    console.log(queryURL);

    // json object format with ajax
    $.ajax({
        url: queryURL,
        method: "GET"
    // when data is done loading run this function
    }).done(function(response){
        var results = response.data;
        console.log(results);
        
        // loop through the length of results
        for( var i = 0; i < results.length; i++){

            // create a div each time the loop runs
            var showDiv = $("<div class = 'col-md-4'>");

            // var rating has the value of results index array of i and grabs the rating from the api of the search term
            var rating = results[i].rating;
            
            // var defualtSrc does the same as rating but grabs an image with a fixed height
            defaultSrc = results[i].images.fixed_height.url;
            
            // var imgSrc grabs the results arry index of i but not as a gif as a still img
            var imgSrc = results[i].images.fixed_height_still.url;
            
            //showImage creates a img tag 
            var showImage = $("<img>");
            
            //var p creates a text element to plug ratings value 
            var p = $("<p>").text("Rating: " + rating);
            
            // apply img src so that the img element knows where to grab the img based off what value i has when looping through results
             showImage.attr("src", imgSrc);

             showImage.addClass("movieGif");
            
            // Code for pausing and stopping gifs
             showImage.attr("data-state", "still");
             showImage.attr("data-still", imgSrc);
             showImage.attr("data-animate", defaultSrc);
             //append showImage var after var p which holds <p> element with rating text
             showDiv.append(p);
            // append a div onto show image var
             showDiv.append(showImage);

            $("#gifDiv").prepend(showDiv);

        }
    });


}
    //click event for movie input
    $("#addMovie").on('click', function(){
        event.preventDefault();
        // var newMovie has value of id movieInput from html and takes its value and trims down any extra space
        var newMovie = $("#movieInput").val().trim();
        // once a value has been entered from user push the value being held in newMovie into topics array
        topics.push(newMovie);

        console.log(topics);
        $("#movieInput").val("");
        displayButtons();

    });

        function displayButtons() {
        $("#myButtons").empty();
        for (var i = 0; i < topics.length; i++) {
          var button = $('<button class="btn btn-primary">');
          button.attr("id", "show");
          button.attr("data-search", topics[i]);
          button.text(topics[i]);
          $("#myButtons").append(button);
        }
      }
    
    
      displayButtons();

       
        $(document).on("click", "#show", displayGif);

  
        $(document).on("click", ".movieGif", pausePlayGifs);

 
        function pausePlayGifs() {
  	        var state = $(this).attr("data-state");
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
  }
}



});
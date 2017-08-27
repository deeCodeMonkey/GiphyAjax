var animals = [];

//add animal
$('#add-animal').on('click', function () {
    event.preventDefault();

    var animal = $('#animal-input').val().trim();
    animals.push(animal);
    $('#animal-buttons').append('<button data-animal="' + animal + '">' + animal + '</button>');
    $('#animal-input').val('');
    $('button').on('click', displayQuery);
});



var displayQuery = function (e) {
    //assigning button attribute of ID 'data-animal'
    var animal = $(this).attr("data-animal");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=bf3c7649db354d1f97851d9044111306&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .done(function (response) {
            //place data into var result
            var results = response.data;
            console.log(results);
            //go through the results
            for (var i = 0; i < results.length; i++) {
                //CREATING A NEW DIV and assigned to gifDiv var
                var gifDiv = $("<div>");
                //place rating into var
                var rating = results[i].rating;
                //place preso of rating into var
                var p = $("<p>").text("Rating: " + rating);
                //place image into var
                var animalImage = $("<img>");
                //assign image attribute-- GET FROM OBJECT OF API
                animalImage.attr("src", results[i].images.fixed_height.url);
                //prepend statement to gifDiv
                gifDiv.prepend(p);
                //prepend image to gifDiv
                gifDiv.prepend(animalImage);
                //present gifDiv, PLACE CONTENT HERE
                $("#animals").prepend(gifDiv);
            }
        });
};



require("dotenv").config();


var fs = require("fs");
var keys = require("./key.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var request = require("request");



var command = process.argv[2];
var value = process.argv.slice(3).join(" ");
var x = value


switch (command) {

    case "movie-this":
        if (x) {
            movieThis(x)
        } else {
            movieThis("Mr. Nobody")
        }
        break;

    case "spotify-this-song":
        if (x) {
            spotifyThis(x)
        } else {
            spotifyThis("The Sign")
        }
        break;

    case "do-what-it-says":
        doIt();
        break;

};

function movieThis(movie) {
    var omdbURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&tomatoes=true&apikey=trilogy"

    request(omdbURL, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var body = JSON.parse(body);

            console.log("Title: " + body.Title);
            console.log("Released: " + body.Year);
            console.log("IMDB " + body.imdbRating);
            console.log("Rotten Tomatoes: " + body.Ratings[1].Value);
            console.log("Country: " + body.Country);
            console.log("Plot: " + body.Plot);
            console.log("Starring: " + body.Actors);

        }
    })

}

function spotifyThis(song) {

    spotify.search({ type: "track", query: song }, function (error, data) {
        if (error) {
            console.log("An error has occured");
            return;
        }


        var body = data.tracks.items;

        console.log("Artist: " + body[0].artists[0].name);
        console.log("Song: " + body[0].name);
        console.log("Preview Link: " + body[0].preview_url);
        console.log("Album: " + body[0].album.name);
    });
}
    
    


function doIt() {
            fs.readFile("random.txt", "utf8", function (error, data) {
                if (error) {
                    return console.log(error);
                }

                var j = data.split(",");

                spotifyThis(j[1]);
            });

        }
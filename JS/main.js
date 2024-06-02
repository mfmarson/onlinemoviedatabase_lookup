"use strict";

// Kick off all events
document.addEventListener("DOMContentLoaded", function (event) {
  const movieSearch = document.querySelector("#movieForm");

  console.log("DOM Ready!");
  // Kick off movie search event
  movieSearch.addEventListener("submit", function (event) {
    event.preventDefault();
    const myTitle = this.querySelector("input").value;
    movieLookup(myTitle);
  });
});

// Fetching movie data
function movieLookup(myTitle) {
  fetch(`http://www.omdbapi.com/?t=${myTitle}&apikey=babad4a8`)
    .then(function (response) {
      return response.json();
    }) // When JSON returns data, pull the variables of showMovie function
    .then(function (data) {
      showMovie(data);
    }) // If any of the promises halt or cannot be completed, throw error
    .catch(function (error) {
      console.error("ERROR!", error);
    });
}

// Display specific JSON data
// Section container for design purpose and to state what data requesting
function showMovie(movie) {
  const movieContainer = document.querySelector("#movies");
  const initialCard = document.querySelector("#initialCard");

  // Hide the initial card if another card is displayed
  if (initialCard) {
    initialCard.style.display = "none";
  }

  // Entire card element
  const card = document.createElement("div");
  card.className = "card";
  // Content in card (includes card front, and card back)
  const cardInner = document.createElement("div");
  cardInner.className = "card-inner";
  // Front of card includes moviePoster img
  const cardFront = document.createElement("div");
  cardFront.className = "card-front";
  // Back of card upon flip includes movieTitle, movieRelease, moviePlot, movieRating)
  const cardBack = document.createElement("div");
  cardBack.className = "card-back";
  // Movie image on front of card
  const moviePoster = document.createElement("img");
  moviePoster.src = movie.Poster;
  moviePoster.alt = "Movie poster";
  // Title on back of card
  const movieTitle = document.createElement("h2");
  movieTitle.innerText = movie.Title;
  // Movie release date on back of card
  const movieRelease = document.createElement("h3");
  movieRelease.innerText = movie.Released;

  // Movie plot on back of card
  const moviePlot = document.createElement("p");
  moviePlot.innerText = movie.Plot;
  // Appending card elements to the appropriate side of card
  cardBack.appendChild(movieTitle);
  cardBack.appendChild(movieRelease);
  cardBack.appendChild(moviePlot);
  cardFront.appendChild(moviePoster);
  // Obtaining all listed movie ratings to be on back of card
  movie.Ratings.forEach(function (rating) {
    const movieRatings = document.createElement("h4");
    movieRatings.innerText = `${rating.Source}: ${rating.Value}`;
    cardBack.appendChild(movieRatings);
  });
  // Appending the appropriate card front/back to content and then appending card to the overall movie container
  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);
  movieContainer.appendChild(card);
}

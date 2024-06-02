"use strict";
//Kick off all events
document.addEventListener("DOMContentLoaded", function (event) {
  const movieSearch = document.querySelector("#movieForm");

  console.log("DOM Ready!");
  //kick off movie search event
  movieSearch.addEventListener("submit", function (event) {
    event.preventDefault();
    const myTitle = this.querySelector("input").value;
    movieLookup(myTitle);
  });
});
//fetching movie data
function movieLookup(myTitle) {
  fetch(`http://www.omdbapi.com/?t=${myTitle}&apikey=babad4a8`)
    .then(function (response) {
      return response.json();
    }) //when json returns data, pull the variables of showMovie function
    .then(function (data) {
      showMovie(data);
    }) //if any of the promises halt or cannot be completed throw error
    .catch(function (error) {
      console.error("ERROR!", error);
    });
}
//display specific json data
//section container for design purpose and to state what data requesting
function showMovie(movie) {
  const movieContainer = document.querySelector("#movies");
  //entire card element
  const card = document.createElement("div");
  card.className = "card";
  //content in card (includes card front, and card back)
  const cardInner = document.createElement("div");
  cardInner.className = "card-inner";
  //front of card includes moviePoster img
  const cardFront = document.createElement("div");
  cardFront.className = "card-front";
  //back of card upon flip includes movieTitle, movieRelease, moviePlot, movieRating)
  const cardBack = document.createElement("div");
  cardBack.className = "card-back";
  //movie image on front of card
  const moviePoster = document.createElement("img");
  moviePoster.src = movie.Poster;
  moviePoster.alt = "Movie poster";
  //title on back of card
  const movieTitle = document.createElement("h2");
  movieTitle.innerText = movie.Title;
  //movie release date on back of card
  const movieRelease = document.createElement("h3");
  movieRelease.innerText = movie.Released;

  //movie plot on back of card
  const moviePlot = document.createElement("p");
  moviePlot.innerText = movie.Plot;
  //appending card elements to the appropriate side of card
  cardBack.appendChild(movieTitle);
  cardBack.appendChild(movieRelease);
  cardBack.appendChild(moviePlot);
  cardFront.appendChild(moviePoster);
  //obtaining all listed movie ratings to be on back of card
  movie.Ratings.forEach(function (rating) {
    const movieRatings = document.createElement("h4");
    movieRatings.innerText = `${rating.Source}: ${rating.Value}`;
    cardBack.appendChild(movieRatings);
  });
  //appending the appropriate card front/back to content and then appending card to the overall movie container
  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);
  movieContainer.appendChild(card);
}

//  init Classes
const api = new MovieApi();
const ui = new UI();

// assign components
const inputMovieName = document.getElementById('movieName');
const searchRes = document.querySelector('.search-result');
const favourites = document.querySelector('.favourites');

// Event Listers

// Search for movies, each key up is a api call(not ideal but it works 😄)
inputMovieName.addEventListener('keyup', e => {
  const searchText = e.target.value;
  if (searchText == '') {
    ui.clearSearchResults();
  } else {
    api.searchMovies(searchText).then(data => {
      ui.showResults(data);
    });
  }
});

// Add item to favourites
searchRes.addEventListener('click', e => {
  if (e.target.id === 'btnAddFav') {
    api.getMovieByID(e.target.dataset.movieId).then(data => {
      ui.addFavourite(data);
    });
  }
  e.preventDefault();
});

// Delete item from favourites
favourites.addEventListener('click', e => {
  if (e.target.id === 'removeItem' && confirm('Are You Sure?')) {
    e.target.parentElement.remove();
  }

  e.preventDefault();
});

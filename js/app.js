//  init Classes
const api = new MovieApi();
const ui = new UI();

// assign components
const inputMovieName = document.getElementById('movieName');
const searchRes = document.querySelector('.search-result');

// Event Listers
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

searchRes.addEventListener('click', e => {
  // console.log(e);
  const btn = e.target;
  if (btn.classList[0] === 'btnAdd') {
    api.getMovieByID(btn.dataset.movieId).then(data => {
      ui.addFavourite(data);
    });
  }
  e.preventDefault();
});

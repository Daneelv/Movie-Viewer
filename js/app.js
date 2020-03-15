//  init Classes
const api = new MovieApi();
const ui = new UI();

// assign components
const inputMovieName = document.getElementById('movieName');

// Event Listers
inputMovieName.addEventListener('keyup', e => {
  const searchText = e.target.value;
  if (searchText == '') {
    ui.clearSearchResults();
  } else {
    api.getMovie(searchText).then(data => {
      ui.showResults(data);
    });
  }
});

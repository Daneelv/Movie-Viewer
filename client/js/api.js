class MovieApi {
  constructor() {
    // /search/movie?api_key=531eaffcac14a8c431f91d7a77a345e8&query=home%20alone"

    this.URL = 'https://api.themoviedb.org/3';
    this.api_key = '531eaffcac14a8c431f91d7a77a345e8';
  }

  async searchMovies(movieName) {
    const movieResponse = await fetch(
      // https://api.themoviedb.org/3/search/movie?api_key=531eaffcac14a8c431f91d7a77a345e8&query=home%20alone

      `${this.URL}/search/movie?api_key=${this.api_key}&query=${movieName}`
    );

    const movieData = await movieResponse.json();

    return {
      movieData
    };
  }

  async getMovieByID(movieID) {
    const movieResponse = await fetch(
      // https://api.themoviedb.org/3/movie/12536?api_key=531eaffcac14a8c431f91d7a77a345e8

      `${this.URL}/movie/${movieID}?api_key=${this.api_key}`
    );

    const movieData = await movieResponse.json();

    return {
      movieData
    };
  }
}

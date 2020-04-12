class DataApi {
  constructor() {
    this.URL = 'http://127.0.0.1:3000';
  }

  async loginUser(userdata) {
    const userDetails = await fetch(`${this.URL}/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(userdata),
    });

    const resp = await userDetails.json();

    return {
      resp,
    };
  }
  async registerUser(userdata) {
    const userDetails = await fetch(`${this.URL}/users`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(userdata),
    });

    const resp = await userDetails.json();

    return {
      resp,
    };
  }

  async saveToFavourites(movieId) {
    const pvtData = this.getStorageData();
    const movieInfo = await fetch(`${this.URL}/users/${pvtData.Id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `bearer ${pvtData.token}`,
      },
      body: JSON.stringify(movieId),
    });

    const resp = await movieInfo.json();

    return {
      resp,
    };
  }

  async deleteFromFavourites(movieId) {
    const pvtData = this.getStorageData();
    const movieInfo = await fetch(`${this.URL}/users/${pvtData.Id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: `bearer ${pvtData.token}`,
      },
      body: JSON.stringify(movieId),
    });

    const resp = await movieInfo.json();

    return {
      resp,
    };
  }

  async getUserData() {
    const pvtData = this.getStorageData();

    const movieInfo = await fetch(`${this.URL}/users/${pvtData.Id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `bearer ${pvtData.token}`,
      },
    });

    const resp = await movieInfo.json();

    return {
      resp,
    };
  }

  getStorageData() {
    return JSON.parse(localStorage.getItem('movieData'));
  }
}

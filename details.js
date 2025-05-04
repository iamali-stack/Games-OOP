class GameDetailsApp {
  constructor(apiUrl, containerId) {
    this.apiUrl = apiUrl;
    this.container = document.getElementById(containerId);
  }

  getGameIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
  }

  async fetchGameDetails() {
    const gameId = this.getGameIdFromUrl();
    if (!gameId) {
      this.container.innerHTML = `<div class='alert alert-warning'>No game selected.</div>`;
      return;
    }
    try {
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '342994247amshab8dfe968459626p1dcdebjsnf77369997bfc',
          'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
      };
      const api = await fetch(`${this.apiUrl}?id=${gameId}`, options);
      const game = await api.json();
      UI.displayGameDetails(game, this.container);
    } catch (error) {
      this.container.innerHTML = `<div class='alert alert-danger'>Failed to load game details. Please try again later.</div>`;
      console.error(error);
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const app = new GameDetailsApp('https://free-to-play-games-database.p.rapidapi.com/api/game', 'details-container');
  app.fetchGameDetails();
});
/**
 * UI Module
 * This module handles all UI-related functionality for the application
 */

const UI = (function() {
    /**
     * Display a list of games as cards
     * @param {Array} games - Array of game objects
     * @param {HTMLElement} container - The container to render cards in
     */
    function displayGames(games, container) {
        container.innerHTML = '';
        games.forEach(game => {
            const col = document.createElement('div');
            col.className = 'col-md-4 col-lg-3';
            col.innerHTML = `
                <div class="card bg-dark text-light h-100 shadow-sm game-card" style="cursor:pointer;">
                  <img src="${game.thumbnail}" class="card-img-top" alt="${game.title}">
                  <div class="card-body d-flex flex-column">
                    <h5 class="card-title" style="font-family: 'Pacifico', cursive;">${game.title}</h5>
                    <p class="card-text small flex-grow-1">${game.short_description}</p>
                    <div class="d-flex flex-wrap gap-2 mt-2">
                      <span class="badge bg-info">${game.genre}</span>
                      <span class="badge bg-secondary">${game.platform}</span>
                      <span class="badge bg-primary">${game.status ? game.status : 'Free'}</span>
                    </div>
                  </div>
                </div>
            `;
            // Card click navigates to details.html with game id
            col.querySelector('.game-card').addEventListener('click', () => {
                window.location.href = `details.html?id=${game.id}`;
            });
            container.appendChild(col);
        });
    }

    /**
     * Display details of a single game
     */
    function displayGameDetails(game, container) {
        container.innerHTML = `
        <div class="row g-4 align-items-start">
          <div class="col-md-4">
            <img src="${game.thumbnail}" class="img-fluid rounded shadow mb-3" alt="${game.title}">
          </div>
          <div class="col-md-8">
            <h2 style="font-family: 'Pacifico', cursive;">Title: ${game.title}</h2>
            <div class="mb-4 mt-4">
              <div class="mb-3 d-flex align-items-center">
                <span style="font-family: 'Pacifico', cursive; font-size: 1.5rem;">Category:</span>
                <span class="badge rounded-pill bg-info text-dark ms-2" style="font-size: 1.2rem; font-style: italic;">${game.genre}</span>
              </div>
              <div class="mb-3 d-flex align-items-center">
                <span style="font-family: 'Pacifico', cursive; font-size: 1.5rem;">Platform:</span>
                <span class="badge rounded-pill bg-info text-dark ms-2" style="font-size: 1.2rem; font-style: italic;">${game.platform}</span>
              </div>
              <div class="mb-3 d-flex align-items-center">
                <span style="font-family: 'Pacifico', cursive; font-size: 1.5rem;">Status:</span>
                <span class="badge rounded-pill bg-info text-dark ms-2" style="font-size: 1.2rem; font-style: italic;">${game.status ? game.status : 'Live'}</span>
              </div>
            </div>
            <p class="mt-3">${game.description}</p>
            <a href="${game.game_url}" target="_blank" class="btn btn-outline-warning mt-3">Show Game</a>
          </div>
        </div>
        <button class="btn-close position-absolute" style="top: 4.5rem; right: 4.5rem; color: #C9C9CA; filter: invert(0.7); opacity: 1;" aria-label="Close" onclick="window.history.back()"></button>
        `;
    }

    return {
        displayGames,
        displayGameDetails
    };
})();


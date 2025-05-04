// GameApp: Handles fetching and displaying games, and category navigation
class GameApp {
    constructor(apiUrl, containerId) {
        this.apiUrl = apiUrl;
        this.container = document.getElementById(containerId);
        this.currentCategory = null;
        this.initCategoryListeners();
    }

    // Fetch games from API, optionally by category
    async fetchGames(category = null) {
        try {
            // Show spinner while loading
            this.container.innerHTML = `<div class="d-flex justify-content-center align-items-center" style="min-height:200px;"><span class="loader"></span></div>`;
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '342994247amshab8dfe968459626p1dcdebjsnf77369997bfc',
                    'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
                }
            };
            let url = this.apiUrl;
            if (category) {
                url += `?category=${encodeURIComponent(category)}`;
            }
            const api = await fetch(url, options);
            const games = await api.json();
            UI.displayGames(games, this.container);
        } catch (error) {
            this.container.innerHTML = `<div class='alert alert-danger'>Failed to load games. Please try again later.</div>`;
            console.error(error);
        }
    }

    // Set up click listeners for category navigation
    initCategoryListeners() {
        document.querySelectorAll('.nav-link[data-category]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                // Remove active class from all links
                document.querySelectorAll('.nav-link[data-category]').forEach(l => l.classList.remove('active'));
                // Add active to clicked link
                link.classList.add('active');
                // Fetch and display games for this category
                const category = link.getAttribute('data-category');
                this.fetchGames(category);
            });
        });
    }
}

// Initialize app on DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
    const app = new GameApp(
        'https://free-to-play-games-database.p.rapidapi.com/api/games',
        'games-container'
    );
    app.fetchGames(); // Load all games by default
});
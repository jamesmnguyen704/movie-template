// Add your script below this line, but above the next comment!
// TMDb API key for authentication
const tmdbApiKey = '69971c171ca25d21134880bcfe861e67'; // key i received when I signed up for api on TMDB site

// Function to fetch and display upcoming movies grouped by month
function fetchUpcomingMovies() {
  // Today's date for filtering movies released after this date
  const today = '2025-09-05';

  // TMDb Discover endpoint with filters for popularity and release date
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}&language=en-US&sort_by=popularity.desc&primary_release_date.gte=${today}`;

  // Fetch data from TMDb API
  fetch(url)
    .then(response => response.json()) // Parse the response as JSON
    .then(data => {
      // Get the container div where movies will be displayed
      const upcomingDiv = document.getElementById('upcoming-movies');
      if (upcomingDiv) {
        // Group movies by month and year
        const moviesByMonth = {};
        data.results.forEach(movie => {
          if (movie.release_date) {
            // Extract year and month from release date
            const [year, month] = movie.release_date.split('-');
            // Get month name (e.g., January, February)
            const monthName = new Date(movie.release_date).toLocaleString('default', { month: 'long' });
            // Create a key like "September 2025"
            const key = `${monthName} ${year}`;
            // Initialize array for this month if not present
            if (!moviesByMonth[key]) moviesByMonth[key] = [];
            // Add movie to the corresponding month
            moviesByMonth[key].push(movie);
          }
        });

        // Render the grouped movies by month
        upcomingDiv.innerHTML = Object.keys(moviesByMonth).length > 0
          ? Object.entries(moviesByMonth).map(([month, movies]) => `
              <div class="month-group">
                <h2>${month}</h2>
                <div class="month-movies">
                  ${movies.map(movie => `
                    <div class="upcoming-movie">
                      <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title} poster" style="width:100px;">
                      <div>${movie.title}</div>
                      <div style="font-size:0.85em;color:#888;">${movie.release_date}</div>
                      <div style="font-size:0.8em;color:#ffd700;">Popularity: ${movie.popularity}</div>
                    </div>
                  `).join('')}
                </div>
              </div>
            `).join('')
          : '<div>No big upcoming movies found after September 5, 2025.</div>';
      }
    })
    .catch(error => console.error('TMDb API error:', error)); // Log any errors
}

// Call the function to fetch and display upcoming movies when the page loads
fetchUpcomingMovies();

// Function to fetch and display trending movies for the week for index.html
function fetchTrendingMovies() {
  // TMDb Trending endpoint for movies this week
  const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${tmdbApiKey}`;

  // Fetch data from TMDb API
  fetch(url)
    .then(response => response.json()) // Parse the response as JSON
    .then(data => {
      // Get the container div for trending movies
      const trendingDiv = document.getElementById('trending-movies');
      if (trendingDiv) {
        // Render trending movies horizontally
        trendingDiv.innerHTML = data.results.map(movie => `
          <div class="trending-movie">
            <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title} poster">
            <div>${movie.title}</div>
            <div style="font-size:0.85em;color:#888;">${movie.release_date ? movie.release_date.slice(0,4) : ''}</div>
          </div>
        `).join('');
      }
    })
    .catch(error => console.error('TMDb Trending API error:', error)); // Log any errors
}

// Call the function to fetch and display trending movies when the page loads
fetchTrendingMovies();

function getBtnAndShow() {
  function displayDateAndTime() {
    document.getElementById('time').innerHTML = Date();
  }
  document.getElementById('timeCheckBtn').addEventListener('click', displayDateAndTime);
}
function clearDateAndTime() {
  document.getElementById('time').innerHTML = '';
}
getBtnAndShow();
setInterval(clearDateAndTime, 5000);






// This export is to enable testing of your two testable primary functions.
// PLEASE DO NOT EDIT below this line!!!

module.exports.getBtnAndShow = getBtnAndShow;
module.exports.clearDateAndTime = clearDateAndTime;



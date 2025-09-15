// TMDb API key for authentication
const tmdbApiKey = '69971c171ca25d21134880bcfe861e67'; // Your TMDb API key

function fetchUpcomingMovies() {  // Function to fetch and display upcoming movies
  const today = '2025-09-05'; // Today's date for filtering upcoming releases
  const urls = [  // Array of URLs for 5 pages of upcoming movies from TMDb
    `https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}&language=en-US&sort_by=popularity.desc&primary_release_date.gte=${today}&page=1`,
    `https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}&language=en-US&sort_by=popularity.desc&primary_release_date.gte=${today}&page=2`,
    `https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}&language=en-US&sort_by=popularity.desc&primary_release_date.gte=${today}&page=3`,
    `https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}&language=en-US&sort_by=popularity.desc&primary_release_date.gte=${today}&page=4`,
    `https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}&language=en-US&sort_by=popularity.desc&primary_release_date.gte=${today}&page=5`
  ]; // see if i can just past page 5 as the argument

  // const urls = [  // Array of URLs for 5 pages of upcoming movies from TMDb
  //   `https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}&language=en-US&sort_by=popularity.desc&primary_release_date.gte=${today}&page=5`
  // ];


  Promise.all(urls.map(url => fetch(url).then(res => res.json()))) // Fetch all 5 pages in parallel and process the results
    .then(pages => {
      const allMovies = pages.flatMap(page => page.results); // Combine results from all pages into one array
      const upcomingDiv = document.getElementById('upcoming-movies'); // Get the container div for upcoming movies
      if (upcomingDiv) {
        const moviesByMonth = {}; // Group movies by month and year of release
        allMovies.forEach(movie => {
          if (movie.release_date) {
            const [year, month] = movie.release_date.split('-'); // Extract year and month
            const monthName = new Date(movie.release_date).toLocaleString('default', { month: 'long' }); // Get month name
            const key = `${monthName} ${year}`; // Create grouping key
            if (!moviesByMonth[key]) moviesByMonth[key] = []; // Initialize array if needed
            moviesByMonth[key].push(movie); // Add movie to group
          }
        });
 // Render grouped movies into HTML
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
          : '<div>No big upcoming movies found after September 5, 2025.</div>'; // Show message if no movies found
      }
    })
    .catch(error => console.error('TMDb API error:', error)); // Log any errors
}
fetchUpcomingMovies(); // Call the function to fetch and display upcoming movies when the page loads

function fetchTrendingMovies() {  // Function to fetch and display trending movies for the week for index.html
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

// Function to set up the time check button
function getBtnAndShow() {
  function displayDateAndTime() {
    document.getElementById('time').innerHTML = Date(); // Show current date/time
  }
  document.getElementById('timeCheckBtn').addEventListener('click', displayDateAndTime); // Add click event
}

// Function to clear the displayed time after 5 seconds
function clearDateAndTime() {
  document.getElementById('time').innerHTML = ''; // Clear time display
}

// Set up time check button and auto-clear
getBtnAndShow();
setInterval(clearDateAndTime, 5000); // Clear time every 5 seconds

// Export functions for testing (do not edit below this line)
module.exports.getBtnAndShow = getBtnAndShow;
module.exports.clearDateAndTime = clearDateAndTime;
// Add your script below this line, but above the next comment!
const tmdbApiKey = '69971c171ca25d21134880bcfe861e67';

function fetchUpcomingMovies() {
  const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${tmdbApiKey}&language=en-US&page=1`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log('Upcoming Movies:', data.results);
      // You can add code here to display movies on your page
    })
    .catch(error => console.error('TMDb API error:', error));
}

// Call the function to fetch upcoming movies
fetchUpcomingMovies();

// ...existing code...

function fetchTrendingMovies() {
  const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${tmdbApiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const trendingDiv = document.getElementById('trending-movies');
      if (trendingDiv) {
        trendingDiv.innerHTML = data.results.map(movie => `
          <div class="trending-movie">
            <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title} poster">
            <div>${movie.title}</div>
            <div style="font-size:0.85em;color:#888;">${movie.release_date ? movie.release_date.slice(0,4) : ''}</div>
          </div>
        `).join('');
      }
    })
    .catch(error => console.error('TMDb Trending API error:', error));
}

// Call the function to fetch trending movies
fetchTrendingMovies();

// ...existing code...


// This export is to enable testing of your two testable primary functions.
// PLEASE DO NOT EDIT below this line!!!

module.exports.getBtnAndShow = getBtnAndShow;
module.exports.clearDateAndTime = clearDateAndTime;



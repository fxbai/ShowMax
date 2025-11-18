document.getElementById("watch-btn").addEventListener("click", () => {
    nav.go("../watch/watch.html");
});

// movie.js
const params = new URLSearchParams(window.location.search);
const poster = params.get('poster');

document.querySelector('img').src = poster;

document.addEventListener('DOMContentLoaded', () => {
    const watchBtn = document.getElementById('watch-btn');
    watchBtn.addEventListener('click', () => {
        const poster = document.getElementById('movie-poster').src;
        // Store in sessionStorage
        sessionStorage.setItem('lastMoviePoster', poster);

        // Navigate to watch page
        window.location.href = '../watch/watch.html';
    });

    // Restore poster if coming back from watch page
    const storedPoster = sessionStorage.getItem('lastMoviePoster');
    if (storedPoster) document.getElementById('movie-poster').src = storedPoster;
});

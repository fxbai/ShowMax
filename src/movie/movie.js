document.getElementById("watch-btn").addEventListener("click", () => {
    nav.go("../watch/watch.html");
});

// movie.js
const params = new URLSearchParams(window.location.search);
const poster = params.get('poster');

document.querySelector('img').src = poster;
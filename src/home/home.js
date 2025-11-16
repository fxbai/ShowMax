// Every movie card navigates to the Movie page
document.querySelectorAll(".movie-card").forEach(card => {
    card.addEventListener("click", () => {
        nav.go("../movie/movie.html");
    });
});

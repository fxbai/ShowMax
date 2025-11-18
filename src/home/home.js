// Every movie card navigates to the Movie page
document.querySelectorAll('.movie-card').forEach(card => {
    card.addEventListener('click', () => {
        const movieId = card.dataset.id;
        const movieTitle = encodeURIComponent(card.dataset.title);
        const posterUrl = encodeURIComponent(card.style.backgroundImage.slice(5, -2));
        window.location.href = `../movie/movie.html?id=${movieId}&title=${movieTitle}&poster=${posterUrl}`;
    });
});
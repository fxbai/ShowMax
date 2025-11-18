document.getElementById("invite-btn").addEventListener("click", () => {
    document.getElementById("invite-popup").classList.remove("hidden");
});
const seekBar = document.getElementById('seek-bar');
const videoBox = document.querySelector('.video-box'); // placeholder


document.addEventListener('DOMContentLoaded', () => {
    const playBtn = document.getElementById('play-btn');
    let isPlaying = false;

    if (playBtn) {  // safety check
        playBtn.addEventListener('click', () => {
            isPlaying = !isPlaying;
            playBtn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
            console.log(isPlaying ? 'Playing video...' : 'Pausing video...');
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const poster = sessionStorage.getItem('lastMoviePoster');

    if (poster) {
        document.getElementById('movie-poster').src = poster;
    }
});


const chatToggle = document.getElementById('chat-toggle');
const chatPanel = document.querySelector('.chat-panel');

chatPanel.style.width = '350px';
chatToggle.checked = true;

chatToggle.addEventListener('change', () => {
    chatPanel.style.width = chatToggle.checked ? '350px' : '0';
});
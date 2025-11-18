// Hardcoded movie database
//totally wrong posters dont flame me
const MOVIES_DATABASE = [
    { id: 1, title: "Interstellar",  runtime: "2h 49m", rating: 8.6, genre: "Sci-Fi", poster:   "../shared/posters/poster1.jpg"  },
    { id: 2, title: "The Shawshank Redemption", runtime: "2h 22m", rating: 9.3, genre: "Drama", poster: "../shared/posters/poster2.jpg" },
    { id: 3, title: "The Dark Knight", runtime: "2h 32m", rating: 9.0, genre: "Action", poster: "../shared/posters/poster3.jpg" },
    { id: 4, title: "Inception", runtime: "2h 28m", rating: 8.8, genre: "Sci-Fi", poster: "../shared/posters/poster4.jpg"  },
    { id: 5, title: "Pulp Fiction", runtime: "2h 34m", rating: 8.9, genre: "Crime", poster: "../shared/posters/poster5.jpg"  },
    { id: 6, title: "Forrest Gump", runtime: "2h 22m", rating: 8.8, genre: "Drama", poster: "../shared/posters/poster6.jpg"  },
    { id: 7, title: "The Matrix", runtime: "2h 16m", rating: 8.7, genre: "Sci-Fi", poster: "../shared/posters/poster7.jpg" },
    { id: 8, title: "Goodfellas", runtime: "2h 26m", rating: 8.7, genre: "Crime", poster: "../shared/posters/poster8.jpg"    },
    { id: 9, title: "The Godfather", runtime: "2h 55m", rating: 9.2, genre: "Crime", poster: "../shared/posters/poster9.jpg"  },
    { id: 10, title: "Parasite", runtime: "2h 12m", rating: 8.5, genre: "Thriller", poster: "../shared/posters/poster10.jpg"  },
    { id: 11, title: "Gladiator", runtime: "2h 35m", rating: 8.5, genre: "Action", poster: "../shared/posters/poster11.jpg"    },
    { id: 12, title: "Spirited Away", runtime: "2h 5m", rating: 8.6, genre: "Animation", poster: "../shared/posters/poster12.jpg"  },
];

 

// hardcoded preloaded playlists
let playlists = [
    {
        id: 'playlist1',
        name: 'Action Weekend',
        movies: [1, 3, 11],
        isFavorite: true,
        dateCreated: new Date('2025-11-10')
    },

    {
        id: 'playlist2',
        name: 'Sci-Fi Essentials',
        movies: [1, 4, 7],
        isFavorite: false,
        dateCreated: new Date('2025-11-12')
    }
];




const popularPlaylists = [
    { id: 'popular1',
        name: 'Top Rated of All Time',
        movies: [2, 9, 3, 5],
        isPopular: true
    },

    {
        id: 'popular2',
        name: 'Comfy Night In',
        movies: [6, 12, 5, 8],
        isPopular: true
    }
];

let currentPlaylist = null;
let currentSortBy = 'dateAdded'; // dateAdded, title, rating

function getMovieById(id) {
    return MOVIES_DATABASE.find(m => m.id === id);
}

function getPlaylistById(id){
    return playlists.find(p => p.id === id) || popularPlaylists.find(p => p.id === id);
}

function generateId() {
    return 'playlist_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}


//  function that creates a custom prompt dialog
function customPrompt(message, defaultValue, callback){
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:9999;';
    
    const dialog = document.createElement('div'); // create dialog box
    dialog.style.cssText = 'background:#1e1e33;padding:24px;border-radius:12px;width:400px;max-width:90%;';
    
    dialog.innerHTML = `<h3 style="margin:0 0 16px 0;color:#fff;">${message}</h3>
        <input type="text" id="custom-prompt-input" value="${defaultValue || ''}" style="width:100%;padding:10px;background:#2d2d4e;border:2px solid #3d3d5e;border-radius:8px;color:#fff;font-size:15px;outline:none;">
        <div style="display:flex;gap:10px;margin-top:20px;justify-content:flex-end;">
            <button id="custom-prompt-cancel" style="padding:10px 20px;background:#2d2d4e;border:none;border-radius:8px;color:#fff;cursor:pointer;font-weight:600;">Cancel</button>
            <button id="custom-prompt-ok" style="padding:10px 20px;background:#6c6cff;border:none;border-radius:8px;color:#fff;cursor:pointer;font-weight:600;">OK</button>
        </div>`;
    
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);
    
    const input = document.getElementById('custom-prompt-input');
    input.focus();
    input.select();
    
    const cleanup = (value) => {
        document.body.removeChild(overlay);
        callback(value);
    };
    
    document.getElementById('custom-prompt-ok').onclick = () => cleanup(input.value);
    document.getElementById('custom-prompt-cancel').onclick = () => cleanup(null);
    input.onkeypress = (e) => { if(e.key === 'Enter') cleanup(input.value); };
}




 
// function that creates a custom confirm dialog 
function customConfirm(message, callback) {
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:9999;';
    
    const dialog = document.createElement('div');
    dialog.style.cssText = 'background:#1e1e33;padding:24px;border-radius:12px;width:400px;max-width:90%;';
    
    dialog.innerHTML = `<h3 style="margin:0 0 16px 0;color:#fff;">Confirm</h3>
        <p style="margin:0 0 20px 0;color:#aaa;">${message}</p>
        <div style="display:flex;gap:10px;justify-content:flex-end;">
            <button id="custom-confirm-cancel" 
            style="padding:10px 20px;
            background:#2d2d4e;
            border:none;
            border-radius:8px;
            color:#fff;
            cursor:pointer;
            font-weight:600;">Cancel</button>

            
            <button id="custom-confirm-ok" 
            style="padding:10px 20px;
            background:#ff4757;
            border:none;
            border-radius:8px;
            color:#fff;
            cursor:pointer;
            font-weight:600;">Delete</button>
        </div>`;
    
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);
    
    const cleanup = (result) => {
        document.body.removeChild(overlay);
        callback(result);
    };
    
    document.getElementById('custom-confirm-ok').onclick = () => cleanup(true);
    document.getElementById('custom-confirm-cancel').onclick = () => cleanup(false);
}

//rendering functins

function renderPlaylists(){
    const userPlaylistsGrid = document.querySelector('.playlist-grid');
    const popularPlaylistsGrid = document.querySelectorAll('.playlist-grid')[1];
    
    // rnder user playlists
    userPlaylistsGrid.innerHTML = playlists.map(playlist => {
        const playlistMovies = playlist.movies.slice(0, 4).map(id => getMovieById(id));
        const favoriteIcon = playlist.isFavorite ? '<i class="fas fa-heart favorite-icon"></i>' : '';
        
        return `<div class="playlist-card" data-playlist="${playlist.id}">
                ${favoriteIcon}
                <div class="playlist-art">
                    ${playlistMovies.map(movie => `<img src="${movie.poster}" alt="${movie.title}">`).join('')}
                    ${playlist.movies.length < 4 ? '<div class="empty-slot">+</div>'.repeat(4 - playlist.movies.length) : ''}
                </div>
                <div class="playlist-info">
                    <h3>${playlist.name}</h3>
                    <p>${playlist.movies.length} movie${playlist.movies.length !== 1 ? 's' : ''}</p>
                </div>
            </div>`;
    }).join('');
    
    // Render popular playlists
    if(popularPlaylistsGrid) {
        popularPlaylistsGrid.innerHTML = popularPlaylists.map(playlist => {
            const playlistMovies = playlist.movies.slice(0, 4).map(id => getMovieById(id));
            
            return `<div class="playlist-card" data-playlist="${playlist.id}">
                <div class="playlist-art">
                    ${playlistMovies.map(movie => `<img src="${movie.poster}" alt="${movie.title}">`).join('')}
                </div>
                <div class="playlist-info">
                    <h3>${playlist.name}</h3>
                    <p>${playlist.movies.length} movies</p>
                </div>
            </div>`;
        }).join('');
    }
    
    attachPlaylistCardListeners();
}

function renderModalContent(playlistId) {
    const playlist = getPlaylistById(playlistId);
    if(!playlist) return;
    
    currentPlaylist = playlist;
    
    const modalTitle = document.getElementById('modal-playlist-title');
    const modalCount = document.getElementById('modal-playlist-count');
    const modalCover = document.querySelector('.modal-cover');
    const modalMoviesList = document.querySelector('.modal-movies-list');
    const modalActions = document.querySelector('.modal-actions');
    
    // Update header
    modalTitle.textContent = playlist.name;
    modalCount.textContent = `${playlist.movies.length} movie${playlist.movies.length !== 1 ? 's' : ''}`;
    
    // Set cover image (first movie poster)
    const firstMovie = getMovieById(playlist.movies[0]);
    if(firstMovie){
        modalCover.src = firstMovie.poster;
    }
    
    // Show/hide action buttons based on playlist type
    const isUserPlaylist = !playlist.isPopular;
    modalActions.style.display = isUserPlaylist ? 'flex' : 'none';
    
    // Update favorite button
    const favoriteBtn = document.querySelector('.modal-favorite');
    if(favoriteBtn && isUserPlaylist) {
        favoriteBtn.innerHTML = playlist.isFavorite 
            ? '<i class="fas fa-heart"></i> Favorited' 
            : '<i class="far fa-heart"></i> Favorite';
    }
    
    // Render movies
    renderPlaylistMovies(playlist);
}

function renderPlaylistMovies(playlist){
    const modalMoviesList = document.querySelector('.modal-movies-list');
    let movies = playlist.movies.map(id => ({ ...getMovieById(id), addedDate: new Date() }));
    
    // Apply sorting
    switch(currentSortBy){
        case 'title':
            movies.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'rating':
            movies.sort((a, b) => b.rating - a.rating);
            break;
        case 'dateAdded':
        default:
            // Keep original order
            break;
    }
    
    const isUserPlaylist = !playlist.isPopular;
    
    modalMoviesList.innerHTML = `<div class="sort-controls">
            <span>Sort by:</span>
            <button class="sort-btn ${currentSortBy === 'dateAdded' ? 'active' : ''}" data-sort="dateAdded">Date Added</button>
            <button class="sort-btn ${currentSortBy === 'title' ? 'active' : ''}" data-sort="title">Title</button>
            <button class="sort-btn ${currentSortBy === 'rating' ? 'active' : ''}" data-sort="rating">Rating</button>
        </div>
        ${movies.map(movie => `<div class="movie-row" data-movie-id="${movie.id}">
                <img src="${movie.poster}" alt="${movie.title}">
                <div class="movie-info">
                    <strong>${movie.title}</strong>
                    <span>Runtime: ${movie.runtime}</span>
                    <span>Rating: ${movie.rating}/10</span>
                    <span class="movie-genre">${movie.genre}</span>
                </div>
                ${isUserPlaylist ? `<button class="remove-movie-btn" data-movie-id="${movie.id}"><i class="fas fa-times"></i></button>` : ''}
            </div>`).join('')}`;
    
    // attach listeners to sort buttons and remove buttons
    attachSortListeners();
    attachRemoveMovieListeners();
}


//functon to render movie selector
function renderMovieSelector(){
    const modalMoviesList = document.querySelector('.modal-movies-list');
    const currentMovieIds = currentPlaylist.movies;
    const availableMovies = MOVIES_DATABASE.filter(m => !currentMovieIds.includes(m.id));
    
    modalMoviesList.innerHTML = `<div class="movie-selector-header">
            <h3>Select Movies to Add</h3>
            <button class="back-to-playlist-btn"><i class="fas fa-arrow-left"></i> Back</button>
        </div>
        <div class="movie-selector-grid">
            ${availableMovies.map(movie => `<div class="movie-selector-card" data-movie-id="${movie.id}">
                    <img src="${movie.poster}" alt="${movie.title}">
                    <div class="movie-selector-info">
                        <strong>${movie.title}</strong>
                        <span>${movie.genre} • ${movie.rating}/10</span>
                    </div>
                    <button class="add-movie-to-playlist-btn" data-movie-id="${movie.id}">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>`).join('')}
        </div>`;
    
    // Back button
    document.querySelector('.back-to-playlist-btn').addEventListener('click', () => {
        renderModalContent(currentPlaylist.id);
    });
    
    // Add movie buttons
    document.querySelectorAll('.add-movie-to-playlist-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const movieId = parseInt(btn.dataset.movieId);
            addMovieToPlaylist(currentPlaylist.id, movieId);
            renderMovieSelector(); // Re-render to update available movies
        });
    });
}

//modal functions to open and close modal
function openModal(playlistId){
    const modal = document.getElementById('playlist-modal');
    renderModalContent(playlistId);
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('playlist-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    currentPlaylist = null;
    currentSortBy = 'dateAdded';
    renderPlaylists(); // Update playlist cards
}

//playlist stuff
function createNewPlaylist(){
    customPrompt('Enter playlist name:', '', (name) => {
        if(!name || name.trim() === '') return;
        
        const newPlaylist = {
            id: generateId(),
            name: name.trim(),
            movies: [],
            isFavorite: false,
            dateCreated: new Date()
        };
        
        playlists.unshift(newPlaylist);
        renderPlaylists();
    });
}

//add, remove, delete, edit, toggle fav functions
function addMovieToPlaylist(playlistId, movieId) {
    const playlist = getPlaylistById(playlistId);
    if(!playlist || playlist.movies.includes(movieId)) return;
    
    playlist.movies.push(movieId);
    renderModalContent(playlistId);
}

function removeMovieFromPlaylist(playlistId, movieId){
    const playlist = getPlaylistById(playlistId);
    if (!playlist) return;
    
    playlist.movies = playlist.movies.filter(id => id !== movieId);
    renderModalContent(playlistId);
}



function deletePlaylist(playlistId) {
    customConfirm('Are you sure you want to delete this playlist?', (confirmed) => {
        if(!confirmed) return;
        playlists = playlists.filter(p => p.id !== playlistId);
        closeModal();
    });
}






function toggleFavorite(playlistId){
    const playlist = getPlaylistById(playlistId);
    if(!playlist || playlist.isPopular) return;
    
    playlist.isFavorite = !playlist.isFavorite;
    renderModalContent(playlistId);
}


function editPlaylistName(playlistId) {
    const playlist = getPlaylistById(playlistId);
    if (!playlist || playlist.isPopular) return;
    
    customPrompt('Enter new playlist name:', playlist.name, (newName) => {
        if(!newName || newName.trim() === '') return;
        
        playlist.name = newName.trim();
        renderModalContent(playlistId);
    });
}

function showSharePopup(){
    const sharePopup = document.getElementById('share-popup');
    sharePopup.style.display = 'flex';
    
    setTimeout(() => {
        sharePopup.style.display = 'none';
    }, 2000);
}










function attachPlaylistCardListeners(){
    document.querySelectorAll('.playlist-card').forEach(card => {
        card.addEventListener('click', () => {
            const playlistId = card.dataset.playlist;
            openModal(playlistId);
        });
    });
}


function attachSortListeners() {
    document.querySelectorAll('.sort-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentSortBy = btn.dataset.sort;
            renderPlaylistMovies(currentPlaylist);
        });
    });
}

function attachRemoveMovieListeners(){
    document.querySelectorAll('.remove-movie-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const movieId = parseInt(btn.dataset.movieId);
            removeMovieFromPlaylist(currentPlaylist.id, movieId);
        });
    });
}

//switch tab
const tabs = document.querySelectorAll('.tab');
const panes = document.querySelectorAll('.tab-pane');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        panes.forEach(p => p.classList.remove('active'));
        document.getElementById(tab.dataset.tab).classList.add('active');
    });
});

//start 

//load in dom so buttons are ready otherwise errors and stuff
document.addEventListener('DOMContentLoaded', () => {
    renderPlaylists();
    
    const modal = document.getElementById('playlist-modal');
    
    // close modal
    modal.addEventListener('click', (e) => {
        if(e.target === modal) closeModal();
    });
    
    // create playlist button
    const createBtn = document.querySelector('.create-playlist-btn');
    if(createBtn){
        createBtn.addEventListener('click', createNewPlaylist);
    }
    
    // Modal action buttons
    const modalAdd = document.querySelector('.modal-add');
    if(modalAdd) {
        modalAdd.addEventListener('click', () => {
            if(currentPlaylist && !currentPlaylist.isPopular){
                renderMovieSelector();
            }
        });
    }
    
    const modalEdit = document.querySelector('.modal-edit');
    if(modalEdit) {
        modalEdit.addEventListener('click', () => {
            if(currentPlaylist && !currentPlaylist.isPopular) {
                editPlaylistName(currentPlaylist.id);
            }
        });
    }
    
    const modalDelete = document.querySelector('.modal-delete');
    if(modalDelete){
        modalDelete.addEventListener('click', () => {
            if(currentPlaylist && !currentPlaylist.isPopular){
                deletePlaylist(currentPlaylist.id);
            }
        });
    }
    
    const modalFavorite = document.querySelector('.modal-favorite');
    if(modalFavorite) {
        modalFavorite.addEventListener('click', () => {
            if(currentPlaylist && !currentPlaylist.isPopular) {
                toggleFavorite(currentPlaylist.id);
            }
        });
    }
    
    const shareBtn = document.querySelector('.share-btn');
    if(shareBtn){
        shareBtn.addEventListener('click', showSharePopup);
    }
});
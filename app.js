const music = new Audio('audio/1.mp3');

// create Array 

const songs = [
    {
        id:'1',
        songName:` On My Way <br>
        <div class="subtitle">Alan Walker</div>`,
        poster: "img/1.jpg"
    },
    {
        id:'2',
        songName:` Alan Walker-Fade <br>
        <div class="subtitle">Alan Walker</div>`,
        poster: "img/2.jpg"
    },
    {
        id:"3",
        songName: `Cartoon - On & On <br><div class="subtitle"> Daniel Levi</div>`,
        poster: "img/3.jpg",
    },
    {
        id:"4",
        songName: `Warriyo - Mortals <br><div class="subtitle">Mortals</div>`,
        poster: "img/4.jpg",
    },
    {
        id:"5",
        songName: `Ertugrul Gazi <br><div class="subtitle">Ertugrul</div>`,
        poster: "img/5.jpg",
    },
    {
        id:"6",
        songName: `Electronic Music <br><div class="subtitle">Electro</div>`,
        poster: "img/6.jpg",
    },
    {
        id:"7",
        songName: `Agar Tum Sath Ho <br><div class="subtitle">Tamashaa</div>`,
        poster: "img/7.jpg",
    },
    {
        id:"8",
        songName: `Suna Hai <br><div class="subtitle">Neha Kakker</div>`,
        poster: "img/8.jpg",
    },
    {
        id:"9",
        songName: `Dilber <br><div class="subtitle">Satyameva Jayate</div>`,
        poster: "img/9.jpg",
    },
    {
        id:"10",
        songName: `Duniya <br><div class="subtitle">Luka Chuppi</div>`,
        poster: "img/10.jpg",
    },
    {
        id:"11",
        songName: `Lagdi Lahore Di <br><div class="subtitle">Street Dancer 3D</div>`,
        poster: "img/11.jpg",
    },
    {
        id:"12",
        songName: `Putt Jatt Da <br><div class="subtitle">Putt Jatt Da</div>`,
        poster: "img/12.jpg",
    },
    {
        id:"13",
        songName: `Baarishein <br><div class="subtitle">Atif Aslam</div>`,
        poster: "img/13.jpg",
    },
    {
        id:"14",
        songName: `Vaaste <br><div class="subtitle">Dhvani Bhanushali</div>`,
        poster: "img/14.jpg",
    },
    {
        id:"15",
        songName: `Lut Gaye <br><div class="subtitle">Jubin Nautiyal</div>`,
        poster: "img/15.jpg",
    },
]

// State variables
let shuffle_active = false;
let repeat_mode = 0; // 0: off, 1: all, 2: one
let favorites = JSON.parse(localStorage.getItem('favoriteSongs')) || [];

Array.from(document.getElementsByClassName('songItem')).forEach((element, i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].poster;
    element.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
})

let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementsByClassName('wave')[0];
let shuffle_btn = document.getElementById('shuffle');
let repeat_btn = document.getElementById('repeat');
let favorite_btn = document.getElementById('favorite');

// Tooltip functionality
const tooltip = document.getElementById('tooltip');
function showTooltip(text, x, y) {
    tooltip.textContent = text;
    tooltip.style.left = x + 'px';
    tooltip.style.top = (y - 35) + 'px';
    tooltip.style.opacity = '1';
    setTimeout(() => {
        tooltip.style.opacity = '0';
    }, 1500);
}

// Main Play Button
masterPlay.addEventListener('click',()=>{
    if (music.paused || music.currentTime <=0) {
        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
    } else {
        music.pause();
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
        wave.classList.remove('active2');
    }
})

// Shuffle functionality
shuffle_btn.addEventListener('click', (e) => {
    shuffle_active = !shuffle_active;
    shuffle_btn.classList.toggle('active', shuffle_active);
    showTooltip(shuffle_active ? '🔀 Shuffle ON' : '🔀 Shuffle OFF', e.clientX, e.clientY);
});

// Repeat functionality
repeat_btn.addEventListener('click', (e) => {
    repeat_mode = (repeat_mode + 1) % 3;
    repeat_btn.classList.remove('repeat-one');
    
    if (repeat_mode === 0) {
        repeat_btn.classList.remove('active');
        showTooltip('🔁 Repeat OFF', e.clientX, e.clientY);
    } else if (repeat_mode === 1) {
        repeat_btn.classList.add('active');
        showTooltip('🔁 Repeat ALL', e.clientX, e.clientY);
    } else {
        repeat_btn.classList.add('active', 'repeat-one');
        showTooltip('🔂 Repeat ONE', e.clientX, e.clientY);
    }
});

// Favorite functionality
favorite_btn.addEventListener('click', (e) => {
    if (index) {
        if (favorites.includes(index)) {
            favorites = favorites.filter(id => id != index);
            favorite_btn.classList.remove('active');
            favorite_btn.classList.remove('bi-heart-fill');
            favorite_btn.classList.add('bi-heart');
            showTooltip('❤️ Removed from Favorites', e.clientX, e.clientY);
        } else {
            favorites.push(index);
            favorite_btn.classList.add('active');
            favorite_btn.classList.remove('bi-heart');
            favorite_btn.classList.add('bi-heart-fill');
            showTooltip('❤️ Added to Favorites', e.clientX, e.clientY);
        }
        localStorage.setItem('favoriteSongs', JSON.stringify(favorites));
    }
});

// Add hover tooltips
document.getElementById('back').addEventListener('mouseenter', (e) => showTooltip('⏮️ Previous', e.clientX, e.clientY));
document.getElementById('next').addEventListener('mouseenter', (e) => showTooltip('⏭️ Next', e.clientX, e.clientY));
document.getElementById('masterPlay').addEventListener('mouseenter', (e) => showTooltip('▶️ Play/Pause', e.clientX, e.clientY));

// ===== NAVIGATION TAB FUNCTIONALITY =====
let recentlyPlayed = JSON.parse(localStorage.getItem('recentlyPlayed')) || [];

const navTabs = document.querySelectorAll('.nav_tab');
const tabContents = document.querySelectorAll('.tab_content');

navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active from all tabs
        navTabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(tc => tc.classList.remove('active'));
        
        // Add active to clicked tab
        tab.classList.add('active');
        const tabName = tab.dataset.tab + '_tab';
        const tabContent = document.getElementById(tabName);
        if (tabContent) {
            tabContent.classList.add('active');
        }
    });
});

// ===== SEARCH FUNCTIONALITY =====
const searchInput = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearchBtn');
const searchResultsTab = document.getElementById('search_results_tab');
const searchResultsList = document.getElementById('searchResultsList');
const searchResultCount = document.getElementById('search_result_count');

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    
    if (query.length === 0) {
        clearSearchBtn.style.display = 'none';
        searchResultsTab.classList.remove('active');
        navTabs[0].click(); // Show discover tab
        return;
    }
    
    clearSearchBtn.style.display = 'block';
    
    // Filter songs based on search query
    const results = songs.filter(song => 
        song.songName.toLowerCase().includes(query)
    );
    
    // Display search results
    searchResultsList.innerHTML = '';
    results.forEach(song => {
        const resultHtml = `
            <div class="search_result_item" data-id="${song.id}">
                <img src="${song.poster}" alt="${song.songName}">
                <h4>${song.songName.replace(/<br>|<div[^>]*>|<\/div>/g, ' ')}</h4>
                <p>Click to play</p>
            </div>
        `;
        searchResultsList.innerHTML += resultHtml;
    });
    
    searchResultCount.textContent = `Found ${results.length} song(s)`;
    
    // Remove active from all tabs and contents
    navTabs.forEach(t => t.classList.remove('active'));
    tabContents.forEach(tc => tc.classList.remove('active'));
    
    // Show search results
    searchResultsTab.classList.add('active');
    
    // Add click handlers to search results
    document.querySelectorAll('.search_result_item').forEach(item => {
        item.addEventListener('click', () => {
            const songId = item.dataset.id;
            const playBtn = document.getElementById(songId);
            if (playBtn) {
                playBtn.click();
            }
        });
    });
});

clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearSearchBtn.style.display = 'none';
    searchResultsTab.classList.remove('active');
    navTabs[0].click(); // Show discover tab
});

// ===== FEATURED BUTTONS (PLAY & FOLLOW) =====
const playFeaturedBtn = document.getElementById('playFeatured');
const followFeaturedBtn = document.getElementById('followFeatured');

playFeaturedBtn.addEventListener('click', () => {
    // Play the first song in discover (Alan Walker - Faded)
    const firstPlayBtn = document.getElementById('1');
    if (firstPlayBtn) {
        firstPlayBtn.click();
    }
});

followFeaturedBtn.addEventListener('click', () => {
    // Add first song to favorites
    showTooltip('❤️ Added Alan Walker to favorites!', event.clientX, event.clientY);
    favorites.push('1');
    localStorage.setItem('favoriteSongs', JSON.stringify(favorites));
    followFeaturedBtn.style.background = '#1DB954';
    followFeaturedBtn.style.color = '#fff';
});

// ===== UPDATE LIBRARY & FAVORITES DISPLAY =====
function updateLibraryDisplay() {
    const favoritesList = document.getElementById('favoritesList');
    const recentlyPlayedList = document.getElementById('recentlyPlayed');
    
    // Display favorites
    if (favorites.length > 0) {
        favoritesList.innerHTML = '';
        favorites.forEach(fav => {
            const song = songs.find(s => s.id == fav);
            if (song) {
                const songName = song.songName.replace(/<br>|<div[^>]*>|<\/div>/g, ' ');
                favoritesList.innerHTML += `<li>${songName}</li>`;
            }
        });
    } else {
        favoritesList.innerHTML = '<li style="color: #4c5262;">No favorites yet. Add songs by clicking the heart icon!</li>';
    }
    
    // Display recently played
    if (recentlyPlayed.length > 0) {
        recentlyPlayedList.innerHTML = '';
        recentlyPlayed.slice(-5).reverse().forEach(id => {
            const song = songs.find(s => s.id == id);
            if (song) {
                const songName = song.songName.replace(/<br>|<div[^>]*>|<\/div>/g, ' ');
                recentlyPlayedList.innerHTML += `<li>${songName}</li>`;
            }
        });
    } else {
        recentlyPlayedList.innerHTML = '<li style="color: #4c5262;">No recently played songs yet.</li>';
    }
}

// ===== RADIO STATIONS =====
let currentRadioStation = null;
let customRadioStations = JSON.parse(localStorage.getItem('customRadioStations')) || [];

const predefinedRadioStations = [
    {
        id: 'station_1',
        name: 'Top Hits',
        description: 'Most popular songs right now',
        icon: 'bi-broadcast',
        songs: [1, 2, 3, 4, 5, 6],
        isCustom: false
    },
    {
        id: 'station_2',
        name: 'Chill Vibes',
        description: 'Relax with smooth music',
        icon: 'bi-music-note-beamed',
        songs: [7, 8, 9, 10, 11],
        isCustom: false
    },
    {
        id: 'station_3',
        name: 'Workout Mix',
        description: 'Energy-packed workouts',
        icon: 'bi-heart-pulse',
        songs: [4, 5, 6, 12, 13],
        isCustom: false
    },
    {
        id: 'station_4',
        name: 'Night Drive',
        description: 'Perfect for late night drives',
        icon: 'bi-moon-stars',
        songs: [14, 15, 1, 2, 3],
        isCustom: false
    }
];

function renderRadioStations() {
    const predefinedContainer = document.getElementById('predefinedStations');
    const customContainer = document.getElementById('customStations');
    const customSection = document.getElementById('customStationsSection');

    // Render Predefined Stations
    predefinedContainer.innerHTML = '';
    predefinedRadioStations.forEach(station => {
        predefinedContainer.innerHTML += createRadioStationHTML(station);
    });

    // Render Custom Stations
    if (customRadioStations.length > 0) {
        customSection.style.display = 'block';
        customContainer.innerHTML = '';
        customRadioStations.forEach(station => {
            customContainer.innerHTML += createRadioStationHTML(station);
        });
    } else {
        customSection.style.display = 'none';
    }

    attachRadioEventListeners();
}

function createRadioStationHTML(station) {
    const iconClass = station.icon;
    return `
        <div class="radio_station" data-station-id="${station.id}">
            <div class="station_content">
                <div class="station_icon">
                    <i class="bi ${iconClass}"></i>
                </div>
                <h3>${station.name}</h3>
                <p>${station.description}</p>
                <div class="station_actions">
                    <button class="btn_play_radio" data-station-id="${station.id}">
                        <i class="bi bi-play-fill"></i> Play
                    </button>
                    ${station.isCustom ? `
                        <button class="btn_edit_station" data-station-id="${station.id}">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn_delete_station" data-station-id="${station.id}">
                            <i class="bi bi-trash"></i>
                        </button>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

function attachRadioEventListeners() {
    // Play button listeners
    document.querySelectorAll('.btn_play_radio').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const stationId = btn.dataset.stationId;
            playRadioStation(stationId);
        });
    });

    // Edit button listeners
    document.querySelectorAll('.btn_edit_station').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const stationId = btn.dataset.stationId;
            editRadioStation(stationId);
        });
    });

    // Delete button listeners
    document.querySelectorAll('.btn_delete_station').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const stationId = btn.dataset.stationId;
            if (confirm('Delete this station?')) {
                deleteRadioStation(stationId);
            }
        });
    });
}

function playRadioStation(stationId) {
    const allStations = [...predefinedRadioStations, ...customRadioStations];
    const station = allStations.find(s => s.id === stationId);
    
    if (!station) return;
    
    currentRadioStation = station;
    
    // Show now playing section
    const nowPlayingSection = document.getElementById('nowPlayingRadio');
    nowPlayingSection.style.display = 'flex';
    document.getElementById('nowPlayingStationName').textContent = station.name;
    
    // Play first song in station
    if (station.songs.length > 0) {
        const firstSongId = station.songs[0];
        const playBtn = document.getElementById(firstSongId);
        if (playBtn) {
            playBtn.click();
        }
    }
    
    showTooltip(`🎙️ Now playing: ${station.name}`, event.clientX, event.clientY);
}

function editRadioStation(stationId) {
    const station = customRadioStations.find(s => s.id === stationId);
    if (!station) return;
    
    document.getElementById('radioModalTitle').textContent = 'Edit Radio Station';
    document.getElementById('stationName').value = station.name;
    document.getElementById('stationDesc').value = station.description;
    document.getElementById('stationIcon').value = station.icon;
    document.getElementById('stationSongs').value = station.songs.join(',');
    document.getElementById('submitRadioBtn').textContent = 'Update';
    
    const radioModal = document.getElementById('radioModal');
    radioModal.classList.add('show');
    radioModal.dataset.editMode = 'true';
    radioModal.dataset.stationId = stationId;
}

function deleteRadioStation(stationId) {
    customRadioStations = customRadioStations.filter(s => s.id !== stationId);
    localStorage.setItem('customRadioStations', JSON.stringify(customRadioStations));
    renderRadioStations();
    showTooltip('🗑️ Station deleted', event.clientX, event.clientY);
}

function stopRadioStation() {
    currentRadioStation = null;
    document.getElementById('nowPlayingRadio').style.display = 'none';
    masterPlay.click(); // This will pause the music
    showTooltip('⏸️ Radio stopped', event.clientX, event.clientY);
}

// Radio Modal Handlers
const createStationBtn = document.getElementById('createStationBtn');
const radioModal = document.getElementById('radioModal');
const closeRadioModalBtn = document.getElementById('closeRadioModal');
const cancelRadioBtn = document.getElementById('cancelRadioBtn');
const radioStationForm = document.getElementById('radioStationForm');
const stopRadioBtn = document.getElementById('stopRadioBtn');

createStationBtn.addEventListener('click', () => {
    document.getElementById('radioModalTitle').textContent = 'Create Radio Station';
    radioStationForm.reset();
    document.getElementById('submitRadioBtn').textContent = 'Create';
    radioModal.classList.add('show');
    radioModal.dataset.editMode = 'false';
    radioModal.dataset.stationId = '';
});

closeRadioModalBtn.addEventListener('click', () => {
    radioModal.classList.remove('show');
});

cancelRadioBtn.addEventListener('click', () => {
    radioModal.classList.remove('show');
});

stopRadioBtn.addEventListener('click', () => {
    stopRadioStation();
});

radioStationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('stationName').value;
    const desc = document.getElementById('stationDesc').value;
    const icon = document.getElementById('stationIcon').value;
    const songsInput = document.getElementById('stationSongs').value;
    const songs = songsInput.split(',').map(s => parseInt(s.trim())).filter(s => !isNaN(s) && s > 0);
    
    if (songs.length === 0) {
        alert('Please enter at least one valid song ID');
        return;
    }
    
    const isEditMode = radioModal.dataset.editMode === 'true';
    
    if (isEditMode) {
        const stationId = radioModal.dataset.stationId;
        const stationIndex = customRadioStations.findIndex(s => s.id === stationId);
        if (stationIndex !== -1) {
            customRadioStations[stationIndex] = {
                id: stationId,
                name,
                description: desc,
                icon,
                songs,
                isCustom: true
            };
        }
        showTooltip('✏️ Station updated', event.clientX, event.clientY);
    } else {
        const newStation = {
            id: 'custom_' + Date.now(),
            name,
            description: desc,
            icon,
            songs,
            isCustom: true
        };
        customRadioStations.push(newStation);
        showTooltip('✨ Station created', event.clientX, event.clientY);
    }
    
    localStorage.setItem('customRadioStations', JSON.stringify(customRadioStations));
    radioModal.classList.remove('show');
    renderRadioStations();
});

// Click outside modal to close
radioModal.addEventListener('click', (e) => {
    if (e.target === radioModal) {
        radioModal.classList.remove('show');
    }
});

// Initial render on page load
renderRadioStations();

// Call update on page load
updateLibraryDisplay();


const makeAllPlays = () =>{
    Array.from(document.getElementsByClassName('playListPlay')).forEach((element)=>{
            element.classList.add('bi-play-circle-fill');
            element.classList.remove('bi-pause-circle-fill');
    })
}
const makeAllBackgrounds = () =>{
    Array.from(document.getElementsByClassName('songItem')).forEach((element)=>{
            element.style.background = "rgb(105, 105, 170, 0)";
    })
}

let index = 0;
let poster_master_play = document.getElementById('poster_master_play');
let title = document.getElementById('title');

// Attach click listeners to all play buttons in sidebar
Array.from(document.getElementsByClassName('playListPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        e.stopPropagation();
        index = e.target.id;
        playSongAtIndex();
    })
})

function updateFavoriteButton() {
    if (favorites.includes(index.toString())) {
        favorite_btn.classList.add('active');
        favorite_btn.classList.remove('bi-heart');
        favorite_btn.classList.add('bi-heart-fill');
    } else {
        favorite_btn.classList.remove('active');
        favorite_btn.classList.add('bi-heart');
        favorite_btn.classList.remove('bi-heart-fill');
    }
}


let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

music.addEventListener('timeupdate',()=>{
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    let min = Math.floor(music_dur/60);
    let sec = Math.floor(music_dur%60);
    if (sec<10) {
        sec = `0${sec}`
    }
    currentEnd.innerText = `${min}:${sec}`;

    let min1 = Math.floor(music_curr/60);
    let sec1 = Math.floor(music_curr%60);
    if (sec1<10) {
        sec1 = `0${sec1}`
    }
    currentStart.innerText = `${min1}:${sec1}`;

    let progressbar = parseInt((music.currentTime/music.duration)*100);
    seek.value = progressbar;
    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;
})

seek.addEventListener('change', ()=>{
    music.currentTime = seek.value * music.duration/100;
})

music.addEventListener('ended', ()=>{
    masterPlay.classList.add('bi-play-fill');
    masterPlay.classList.remove('bi-pause-fill');
    wave.classList.remove('active2');
    
    // Handle repeat and shuffle
    if (repeat_mode === 2) {
        // Repeat one - play same song again
        music.currentTime = 0;
        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
    } else if (shuffle_active) {
        // Shuffle next
        playNextShuffled();
    } else {
        // Normal next or repeat all
        if (repeat_mode === 1) {
            // Repeat all - go to next, and loop back at end
            playNext();
        } else {
            // No repeat - just go to next
            playNext();
        }
    }
})


let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_dot = document.getElementById('vol_dot');
let vol_bar = document.getElementsByClassName('vol_bar')[0];

vol.addEventListener('change', ()=>{
    if (vol.value == 0) {
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.add('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if (vol.value > 0) {
        vol_icon.classList.add('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if (vol.value > 50) {
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.add('bi-volume-up-fill');
    }

    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`;
    vol_dot.style.left = `${vol_a}%`;
    music.volume = vol_a/100;
})



let back = document.getElementById('back');
let next = document.getElementById('next');

back.addEventListener('click', ()=>{
    playPrevious();
})

function playPrevious() {
    index -= 1;
    if (index < 1) {
        index = Array.from(document.getElementsByClassName('songItem')).length;
    }
    playSongAtIndex();
}

next.addEventListener('click', ()=>{
    playNext();
})

function playNext() {
    index += 1;
    if (index > Array.from(document.getElementsByClassName('songItem')).length) {
        index = 1;
    }
    playSongAtIndex();
}

function playNextShuffled() {
    index = Math.floor(Math.random() * Array.from(document.getElementsByClassName('songItem')).length) + 1;
    playSongAtIndex();
}

function playSongAtIndex() {
    music.src = `audio/${index}.mp3`;
    poster_master_play.src =`img/${index}.jpg`;
    music.play();
    let song_title = songs.filter((ele)=>{
        return ele.id == index;
    })

    song_title.forEach(ele =>{
        let {songName} = ele;
        title.innerHTML = songName;
    })
    
    // Track recently played
    if (!recentlyPlayed.includes(index)) {
        recentlyPlayed.push(index);
    }
    localStorage.setItem('recentlyPlayed', JSON.stringify(recentlyPlayed));
    updateLibraryDisplay();
    
    makeAllPlays()

    document.getElementById(`${index}`).classList.remove('bi-play-circle-fill');
    document.getElementById(`${index}`).classList.add('bi-pause-circle-fill');
    makeAllBackgrounds();
    Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)";
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');
    wave.classList.add('active2');
    
    // Update favorite button state
    updateFavoriteButton();
}


let left_scroll = document.getElementById('left_scroll');
let right_scroll = document.getElementById('right_scroll');
let pop_song = document.getElementsByClassName('pop_song')[0];

left_scroll.addEventListener('click', ()=>{
    pop_song.scrollLeft -= 330;
})
right_scroll.addEventListener('click', ()=>{
    pop_song.scrollLeft += 330;
})


let left_scrolls = document.getElementById('left_scrolls');
let right_scrolls = document.getElementById('right_scrolls');
let item = document.getElementsByClassName('item')[0];

left_scrolls.addEventListener('click', ()=>{
    item.scrollLeft -= 330;
})
right_scrolls.addEventListener('click', ()=>{
    item.scrollLeft += 330;
})

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        masterPlay.click();
    }
    if (e.code === 'ArrowRight') {
        next.click();
    }
    if (e.code === 'ArrowLeft') {
        back.click();
    }
});

// Load favorites and recently played on page load
window.addEventListener('load', () => {
    favorites = JSON.parse(localStorage.getItem('favoriteSongs')) || [];
    recentlyPlayed = JSON.parse(localStorage.getItem('recentlyPlayed')) || [];
    updateFavoriteButton();
    updateLibraryDisplay();
});

// ===== TRENDING SONGS SCROLL =====
const leftTrendingBtn = document.getElementById('left_trending');
const rightTrendingBtn = document.getElementById('right_trending');
const trendingContainer = document.getElementById('trendingContainer');

if (leftTrendingBtn && rightTrendingBtn && trendingContainer) {
    leftTrendingBtn.addEventListener('click', () => {
        trendingContainer.scrollLeft -= 250;
    });

    rightTrendingBtn.addEventListener('click', () => {
        trendingContainer.scrollLeft += 250;
    });
}

// ===== MOOD CARDS INTERACTIONS =====
const moodCards = document.querySelectorAll('.mood_card');
moodCards.forEach(card => {
    card.addEventListener('click', () => {
        const moodName = card.querySelector('h4').textContent;
        showTooltip(`🎵 Play ${moodName} playlist`, card.getBoundingClientRect().left + 75, card.getBoundingClientRect().top);
    });
});
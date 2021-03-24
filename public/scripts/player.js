const coverImage = document.getElementById('cover-image');
const musicTitle = document.getElementById('music-title');
const musicArtist = document.getElementById('music-artist');
const duration = document.getElementById('duration');
const current_time = document.getElementById('current-time');
const progress = document.getElementById('slider');
const progressIndicator = document.getElementById('slider-indicator');
const backward = document.getElementById('backward');
const playPause = document.getElementById('play');
const forward = document.getElementById('forward');
const music = document.getElementById('music');

const playPauseFav = document.getElementById('play-pause-fav');

music.volume = 0.1;
let isPlaying = false;
let index = 0;


// Function to load music
const loadMusic = () => {
    music.src = musicList[index].preview;
    coverImage.style.backgroundImage = `url(${musicList[index].album.cover_medium})`;
    musicTitle.innerText = musicList[index].title;
    musicArtist.innerText = musicList[index].artist.name;
    if (index >= 1) {
        playMusic();
    }
}

setTimeout(() => {
    loadMusic();
}, 1500);

// Function to play the music
const playMusic = () => {
    playPauseFav.classList.replace("fa-play", "fa-pause");
    music.play();
    isPlaying = true;
}


// Function to pause the music
const pauseMusic  = () => {
    playPauseFav.classList.replace("fa-pause", "fa-play");
    music.pause();
    isPlaying = false;
}


// Function to handle the forward button
const nextSong = () => {
    isPlaying = false;
    index = (index + 1) % musicList.length; 
    loadMusic();
}

// Function to handle the previous button
const previousSong = () => {
    isPlaying = false;
    index = index == 0 ? musicList.length-1 : ((index - 1) % musicList.length); 
    loadMusic();
}

// -----------Listening Click Event on PlayPause Button to play pause the music
playPause.addEventListener('click', () => isPlaying == true ? pauseMusic() : playMusic());
forward.addEventListener('click', nextSong);
backward.addEventListener('click', previousSong);


// _______________________Progress Bar Code

// Some Variable
let musicDur = 0;
const updateCurrentTime = (c_time) => {
    let tempMin = Math.floor(c_time/60);
    let tempSec = Math.floor(c_time % 60);
    if(tempSec < 10) {
        tempSec = `0${tempSec}`;
    }
    current_time.textContent = `${tempMin}:${tempSec}`;
}

const setDuration = (t) => {
    musicDur = t;
    let duration_min = Math.floor(t/60);
    let duration_sec = Math.floor(t % 60);
    duration.textContent = `${duration_min}:${duration_sec}`;

}

// updating progress
const updateProgress = (cur_t, dur) => {
    progressIndicator.style.width = `${(cur_t / dur) * 100}%`;
    // console.log(progressIndicator.clientWidth);
}

music.addEventListener('timeupdate', (event) => {
    const {currentTime, duration} = event.srcElement;
    // console.log(currentTime)
    if(duration) {
        setDuration(duration)
    }
    updateCurrentTime(currentTime);
    updateProgress(currentTime, duration);
    if(currentTime === duration) {
        nextSong();
    }
});
const volumeUp = document.getElementById('volumeup');
const volumeDown = document.getElementById('volumedown');
const powerRocker = document.getElementById('poweronoff');
const volumeIndicator = document.getElementById('volume-level');
const volumeIndicatorBorder = document.getElementById('volume-level-border');
const mobileScreen = document.getElementById('mobile-screen');
const deviceScreen = document.getElementById('device-screen');
const lockScreen = document.getElementById('lock-screen');
const recentTime = document.getElementById('time');
const statusTime = document.getElementById('status-time');


let isIndicatorVisible = false;
let isLocked = true;
let musicList = [];


// ------------------------------------Function to handle volume up button------------------------------

const increaseVolume = () => {
    // console.log(music.volume, volumeIndicator.clientHeight)
    volumeUp.style.left = '-1px';

    setTimeout(() => {
        volumeUp.style.left = '0px';
    }, 150)

    if (isLocked == false) {
        if (isIndicatorVisible == false) {
            volumeIndicatorBorder.style.display = 'block';
            volumeIndicator.style.display = 'block';
            isIndicatorVisible = true;

            setTimeout(() => {
                volumeIndicatorBorder.style.display = 'none';
                volumeIndicator.style.display = 'none';
                isIndicatorVisible = false;
            }, 2000);
        }


        if (volumeIndicator.clientHeight < 134) {
            volumeIndicator.style.height = `${volumeIndicator.clientHeight + 10}px`;
            music.volume = (music.volume + 0.035) % 0.99;
        } else {
            volumeIndicator.style.height = `${volumeIndicator.clientHeight + 21}px`;
            music.volume = 0.99;
        }
    }
}


// ------------------------------------Function to handle volume down button------------------------------

const decresaeVolume = () => {
    // console.log(volumeIndicator.clientHeight)
    volumeDown.style.left = '-1px';

    setTimeout(() => {
        volumeDown.style.left = '0px';
    }, 150);

    if (isLocked == false) {
        if (isIndicatorVisible == false) {
            volumeIndicatorBorder.style.display = 'block';
            volumeIndicator.style.display = 'block';
            isIndicatorVisible = true;

            setTimeout(() => {
                volumeIndicatorBorder.style.display = 'none';
                volumeIndicator.style.display = 'none';
                isIndicatorVisible = false;
            }, 2000);
        }


        if (volumeIndicator.clientHeight > 40) {
            volumeIndicator.style.height = `${volumeIndicator.clientHeight - 10}px`;
            music.volume = music.volume - 0.10;
        }
    }
}

// ---------------Function to handle Event Listener on volume down and Up button -----------------------

volumeUp.addEventListener('click', increaseVolume)

volumeDown.addEventListener('click', decresaeVolume)


// ------------------------------------Function to handle power rocker button------------------------------
powerRocker.addEventListener('click', () => {
    powerRocker.style.left = '-1px';

    if (isLocked == true) {
        mobileScreen.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        lockScreen.style.visibility = 'hidden';
        deviceScreen.style.visibility = 'visible';
        isLocked = false;

    } else {
        mobileScreen.style.backgroundColor = '#052339';
        lockScreen.style.visibility = 'visible';
        deviceScreen.style.visibility = 'hidden';
        isLocked = true;
    }
    setTimeout(() => {
        powerRocker.style.left = '0px';
    }, 200)
})


// Implementation of the double tap functionality
let tapTimes = 0;
lockScreen.addEventListener('click', () => {
    tapTimes += 1;
    if (tapTimes == 2) {
        mobileScreen.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        lockScreen.style.visibility = 'hidden';
        deviceScreen.style.visibility = 'visible';
        isLocked = false;
        tapTimes = 0;
        return
    } 

    setTimeout(() => {
        tapTimes = 0;
    }, 500)
})

// -------------------------------Function to fetch music------------------------
const fetchSongs = () => {
        fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=english%20songs", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "5e8881fe6emsh0453bf78dc85913p117103jsnfcae76429d85",
                "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
            }
        })
        .then(response => response.json())
        .then(songs => {
            musicList = songs.data;
            console.log(musicList)
        })
        .catch(err => {
            console.error(err);
        });
}

fetchSongs();



// Function to change the current time
const updateRecentTime = () => {
    let h = "0";
    let m = "0";
    let s = "0";
    const date = new Date();
    if (date.getHours() < 10) {
        h = `0${date.getHours()}`
    } else {
        h = date.getHours();
    }
    if (date.getMinutes() < 10) {
        m = `0${date.getMinutes()}`
    } else {
        m = date.getMinutes();
    }
    if (date.getSeconds() < 10) {
        s = `0${date.getSeconds()}`
    } else {
        s = date.getSeconds();
    }
    recentTime.innerText = `${h}:${m}:${s}`;
    statusTime.innerText = `${h > 12 ? (h-12) : h}:${m} ${h > 12 ? 'PM' : 'AM'}`;
}

// for status time

setInterval(updateRecentTime, 1000);
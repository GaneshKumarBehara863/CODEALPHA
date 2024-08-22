let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

let curr_track = document.createElement('audio');

let track_list = [
{
	name: "KALKI",
	artist: "Santhosh Narayan",
	image: "https://www.hindustantimes.com/ht-img/img/2024/04/27/1600x900/kalki_1714219826036_1714219826326.jpg",
	path: "audio/Kalki.mp3"
},
{
	name: "Karu Karu pai",
	artist: "Anirudh",
	image: "https://imgs.search.brave.com/Zo-rDGKPQQOIbDBoEgAepP1JfPUXb-q9Js9T0c--b_4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJidXp6Lm5l/dC93cC1jb250ZW50/L3VwbG9hZHMvMjAy/My8wMi9sZW8tYmxv/b2R5LXN3ZWV0LXBv/c3Rlci1pbWFnZXMu/anBn",
	path: "audio/leo.mp3"
},
{
	name: "Mere Angne Mein",
	artist: "Amitabh Bachchan",
	image: "https://cdns-images.dzcdn.net/images/cover/95afe77432fe22f308e0efeda8751ca4/1900x1900-000000-80-0-0.jpg",
	path: "audio/Mere Angne Mein.mp3",
},
{
    name: "My Heart is Beating",
	artist: "Dev sri Prasad",
	image: "https://pics.filmaffinity.com/Jalsa-403327139-large.jpg",
	path: "audio/My heart is beating.mp3",
},
{
    name: "Tere Vaaste",
	artist: "Varun Jain",
	image: "https://i1.sndcdn.com/artworks-yE3bynzfQQQTpm2r-ktoK9A-t500x500.jpg",
	path: "audio/Tere Vaasthe.mp3",
},
];
function loadTrack(track_index) {
    
    clearInterval(updateTimer);
    resetValues();
    
    curr_track.src = track_list[track_index].path;
    curr_track.load();
    
    track_art.style.backgroundImage = 
        "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent = 
        "PLAYING " + (track_index + 1) + " OF " + track_list.length;
    
    updateTimer = setInterval(seekUpdate, 1000);
    
    curr_track.addEventListener("ended", nextTrack);
    
    random_bg_color();
    }
    
    function random_bg_color() {

    let red = Math.floor(Math.random() * 256) + 64;
    let green = Math.floor(Math.random() * 256) + 64;
    let blue = Math.floor(Math.random() * 256) + 64;
    

    let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";
    
    document.body.style.background = bgColor;
    }
    
    function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
    }
    function playpauseTrack() {
        if (!isPlaying) playTrack();
        else pauseTrack();
        }
        
        function playTrack() {
        curr_track.play();
        isPlaying = true;
        
        playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
        }
        
        function pauseTrack() {
        curr_track.pause();
        isPlaying = false;
        
        playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
        }
        
        function nextTrack() {
       
        if (track_index < track_list.length - 1)
            track_index += 1;
        else track_index = 0;
        
        loadTrack(track_index);
        playTrack();
        }
        
        function prevTrack() {
        if (track_index > 0)
            track_index -= 1;
        else track_index = track_list.length - 1;
        
        loadTrack(track_index);
        playTrack();
        }
        function seekTo() {
            seekto = curr_track.duration * (seek_slider.value / 100);
            
            curr_track.currentTime = seekto;
            }
            
            function setVolume() {

            curr_track.volume = volume_slider.value / 100;
            }
            
            function seekUpdate() {
            let seekPosition = 0;
            
            if (!isNaN(curr_track.duration)) {
                seekPosition = curr_track.currentTime * (100 / curr_track.duration);
                seek_slider.value = seekPosition;
            
                let currentMinutes = Math.floor(curr_track.currentTime / 60);
                let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
                let durationMinutes = Math.floor(curr_track.duration / 60);
                let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
            
                if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
                if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
                if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
                if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
            
                curr_time.textContent = currentMinutes + ":" + currentSeconds;
                total_duration.textContent = durationMinutes + ":" + durationSeconds;
            }
            }
loadTrack(track_index);

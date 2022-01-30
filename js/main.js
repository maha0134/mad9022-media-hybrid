'use strict'
import songs from './songs.js';
let currentSong = 0;
let player=document.getElementById('player');
const PLAYER= {
    
    init: ()=>{
        PLAYER.addListeners();
        PLAYER.buildPlaylist();
        player.src = songs[currentSong].src; //load the song
    },

    addListeners: ()=>{
        let btnPlay = document.getElementById('btnPlay');
        btnPlay.addEventListener('click',PLAYER.btnPlay);
        let btnPause = document.getElementById('btnPause');
        btnPause.addEventListener('click',PLAYER.btnPause);
        let btnStop = document.getElementById('btnStop');
        btnStop.addEventListener('click',PLAYER.btnStop);
        player.addEventListener('ended', PLAYER.playNextTrack);
        player.addEventListener('play', PLAYER.startAnimations);
        player.addEventListener('durationchange', PLAYER.updateTotalTime);
        player.addEventListener('timeupdate', PLAYER.updateCurrentTime);
    },

    buildPlaylist: ()=> {
        let playlistArea = document.getElementById("playlist-area");
        let ul = document.createElement("ul");
        ul.className="unstyled-list";
        
        songs.forEach(song => {
            let li = document.createElement("li");
            li.classList.add("playlist-item");
            let span = document.createElement("span");
            span.classList.add("thumbnail");
            let img = document.createElement("img");
            img.src=song.img;
            img.alt="cover image";
            let div = document.createElement('div');
            div.className='detail';
            let track = document.createElement("p");
            track.classList.add("song");
            track.textContent=song.title;
            let artist = document.createElement("p");
            artist.classList.add("artist");
            artist.textContent=song.artist;
            div.append(track, artist);
            span.append(img);
            li.append(span,div);
            ul.append(li);
        })
        playlistArea.append(ul);
        PLAYER.albumArt();
    },

    albumArt: ()=> {
        let imgWrapper = document.querySelector('.img-wrapper');
        let albumArt = document.createElement('img');
        albumArt.src = songs[currentSong].img;
        albumArt.alt = `${songs[currentSong].title} album art`;
        imgWrapper.append(albumArt);
    },

    btnPlay: (ev)=> {
        let clickedButton = ev.currentTarget;
        document.querySelector('.hidden').classList.remove('hidden');
        clickedButton.classList.add('hidden');
        player.play();
    },

    btnPause:(ev)=> {
        player.pause();
        let clickedButton = ev.currentTarget;
        document.querySelector('.hidden').classList.remove('hidden');
        clickedButton.classList.add('hidden');
    },

    btnStop:()=>{
        player.pause();
        player.currentTime = 0;
        let hiddenButton = document.querySelector('.hidden');
        if(hiddenButton.hasAttribute('id','btnPlay')) {
            hiddenButton.classList.remove('hidden');
            document.getElementById('btnPause').classList.add('hidden');
        }
    },

    playNextTrack: ()=>{
        // Code for next button click will go here
    },

    startAnimations: ()=> {
        let playerArea = document.getElementById('player-whole');
        playerArea.className='is-playing';
        let playlist = document.getElementById('playlist-area');
        let listSongs = Array.from(playlist.querySelectorAll('.song')); //fetch all the list items with class of song inside them
        let activeSong = listSongs.filter(element=> element.innerHTML===songs[currentSong].title); //find the currently playing song's element
        activeSong[0].parentElement.parentElement.classList.add('active');  //add the active class to the element playlist item
        // Animation code will go here
    },

    updateTotalTime: ()=> {
        let timer = document.getElementById('timer');
        let duration = Math.round(player.duration); //turn total duration(in seconds) into an integer
        let minutes=Math.floor(duration/60).toString().padStart(2,'0'); //minutes part padded with a zero
        let seconds =Math.floor(duration%60); //seconds part
        timer.lastElementChild.innerHTML=`${minutes}:${seconds}`;
    },

    updateCurrentTime: ()=> {
        // code to move the current time as per track playback status
    },

}

document.addEventListener('DOMContentLoaded',PLAYER.init);
'use strict'
import songs from './songs.js';
let currentSong = 0;
let player=document.getElementById('player');
const PLAYER= {
    
    init: ()=>{
        PLAYER.addListeners();
        PLAYER.buildPlaylist();
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
            let p = document.createElement("p");
            p.classList.add("detail");
            p.textContent=`${song.title} by ${song.artist}`;
            span.append(img);
            li.append(span);
            li.append(p);
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
        if(!player.src) { //if play button pressed on page load
            player.src = songs[currentSong].src;
        } 
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

        // Animation code will go here
    },

    updateTotalTime: ()=> {
        let timer = document.getElementById('timer');
        timer.lastElementChild.innerHTML=Math.round(player.duration/60*100)/100;
    },

    updateCurrentTime: ()=> {

    },

}

document.addEventListener('DOMContentLoaded',PLAYER.init);
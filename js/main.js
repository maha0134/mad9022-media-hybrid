'use strict'
import songs from './songs.js';
let currentSong = 0;
let player=document.getElementById('player');
const PLAYER= {
    
    init: ()=>{
        PLAYER.buildPlaylist();
        PLAYER.addListeners();

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

    btnPlay: (ev)=> {
        let clickedButton = ev.currentTarget;
        document.querySelector('.hidden').classList.remove('hidden');
        clickedButton.classList.add('hidden');
        
        if(player.paused) { //if player was paused
            player.play();
        } else {
            player.src = songs[currentSong].src;
            player.play();
        }
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

    },

    startAnimations: ()=> {
        // Animation code will go here
    },

    updateTotalTime: ()=> {

    },

    updateCurrentTime: ()=> {

    },

}

document.addEventListener('DOMContentLoaded',PLAYER.init);
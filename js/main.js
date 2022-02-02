'use strict'
import songs from './songs.js';
let currentSong = 0;
    
const PLAYER= {
    
    player:null,
    
    init: ()=>{
        PLAYER.player=document.getElementById('player');
        PLAYER.buildPlaylist();
        PLAYER.addListeners();
        PLAYER.loadSong(true);
    },

    addListeners: ()=>{
        document.getElementById('controls').addEventListener('click',PLAYER.routing);
        document.querySelector('.unstyled-list').addEventListener('click',PLAYER.clickedSong);
        PLAYER.player.addEventListener('ended', PLAYER.playNextTrack);
        PLAYER.player.addEventListener('play', PLAYER.startAnimations);
        PLAYER.player.addEventListener('durationchange', PLAYER.updateTotalTime);
        PLAYER.player.addEventListener('timeupdate', PLAYER.updateCurrentTime);
    },

    loadSong:(firstLoad)=>{
        if(firstLoad) {
            PLAYER.player.src = songs[currentSong].src; //load the song
            PLAYER.albumArt();
        }else {
            PLAYER.player.src = songs[currentSong].src; //load the song
            PLAYER.albumArt();
            PLAYER.player.play();
        }
    },
    
    //to choose which function to call based on which button was clicked
    routing: (ev)=> {
        let clickedButton = ev.target.closest('.buttons');
        switch(clickedButton.id) {
            case "btnPlay":
            PLAYER.btnPlay();
            break;
            
            case "btnPause":
            PLAYER.btnPause();
            break;
            
            case "btnStop":
            PLAYER.btnStop();
            break;
        }
    },
    //builds the whole playlist from data in the songs file
    buildPlaylist: ()=> {
        let playlistArea = document.getElementById("playlist-area");
        let ul = document.createElement("ul");
        ul.className="unstyled-list";
        songs.forEach((song,index) => {
            let li = document.createElement("li");
            li.classList.add("playlist-item");
            li.setAttribute('data-index',index);
            //setting the active class on player load to the first song
            if(index===0){
                li.classList.add('active')
            }
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
        });
        playlistArea.append(ul);
    },

    albumArt: ()=> {
        let imgWrapper = document.querySelector('.img-wrapper');
        //check if album art already exists, if not create new else replace it to match the currently playing song
        if(imgWrapper.firstElementChild) {
            //check if the displayed album art matches the currently playing song's album art
            if(imgWrapper.firstElementChild.src !== songs[currentSong].img) {
                imgWrapper.firstElementChild.src = songs[currentSong].img;
            }
        } else {
            let albumArt = document.createElement('img');
            albumArt.src = songs[currentSong].img;
            albumArt.alt = `${songs[currentSong].title} album art`;
            imgWrapper.append(albumArt);
        }
    },

    btnPlay: ()=> {
        PLAYER.player.play();
        PLAYER.togglePlayPause();
    },

    btnPause:()=> {
        PLAYER.player.pause();
        PLAYER.togglePlayPause();
        PLAYER.stopAnimations();
    },

    togglePlayPause: ()=>{
        let hiddenButton = document.querySelector('.hidden');
        hiddenButton.classList.remove('hidden');
        let id = hiddenButton.getAttribute('id');
        if(id ==='btnPlay') {
            document.getElementById('btnPause').classList.add('hidden');
        }else {
            document.getElementById('btnPlay').classList.add('hidden');
        }
    },

    btnStop:()=>{
        PLAYER.player.pause();
        PLAYER.player.currentTime = 0;
        PLAYER.togglePlayPause();
        PLAYER.stopAnimations();
    },

    clickedSong: (ev)=>{
        let clickedSong = ev.target.closest('.playlist-item');
        let index = clickedSong.getAttribute('data-index');
        if(index !== currentSong.toString()){
            document.querySelector('.active').classList.remove('active');
            clickedSong.classList.add('active');
            currentSong=index;
            let playerArea = document.getElementById('player-whole');
            if(playerArea.className==='paused'){
                PLAYER.togglePlayPause();
            }
            PLAYER.loadSong();
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

    stopAnimations:()=>{
        let playerArea = document.getElementById('player-whole');
        playerArea.className='paused';
        //code to stop the animations shall go here
    },

    updateTotalTime: ()=> {
        let timer = document.getElementById('timer');
        let duration = Math.round(PLAYER.player.duration); //turn total duration(in seconds) into an integer
        let minutes=Math.floor(duration/60).toString().padStart(2,'0'); //minutes part padded with a zero
        let seconds =Math.floor(duration%60).toString().padEnd(2,'0'); //seconds part
        timer.lastElementChild.innerHTML=`${minutes}:${seconds}`;
    },

    updateCurrentTime: ()=> {
        // code to move the current time as per track playback status
    },

}

document.addEventListener('DOMContentLoaded',PLAYER.init);
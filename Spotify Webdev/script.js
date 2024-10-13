function playAll(songNumber){
    var audioElement = document.getElementById("song");
    var playBtn = document.getElementById("play-pause");
    var songFileName = "music/"+songNumber+".mp3";
    var currentRow = document.getElementById("song"+songNumber);

    var allRows = document.querySelectorAll(".song-row");
    allRows.forEach(function(row) {
        row.classList.remove("highlight");
    });

    if(audioElement.getAttribute("src")==songFileName && !audioElement.paused){
        audioElement.pause();
        playBtn.innerHTML = '<img src = "images/play-button.svg">';
        
    }else{
        audioElement.setAttribute("src",songFileName);
        audioElement.play();
        playBtn.innerHTML = '<img src = "images/pause-button.svg">';
        currentRow.classList.add("highlight");
    }

}

function playaudio(){
    var audio = document.getElementById("song");
    var playBtn = document.getElementById("play-pause");

    if(audio.paused){
        audio.play();
        playBtn.innerHTML = '<img src = "images/pause-button.svg">';
    }else{
        audio.pause();
        playBtn.innerHTML = '<img src = "images/play-button.svg">';
    }

}
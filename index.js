
var leftDiv = document.getElementById("left-div")
var rightDiv = document.getElementById("right-div")
var titleElement = document.getElementById("title")

$.get("http://5dd1894f15bbc2001448d28e.mockapi.io/playlist", function (response) {
    var audioData = response
    localStorage.setItem("audioData",JSON.stringify(audioData))
    console.log(JSON.parse(localStorage.getItem("audioData")))
    var rightDiv = document.getElementById("right-div")
    for (var i = 0; i < audioData.length; i++) {
        rightDiv.innerHTML += `
        <div id="card-wrapper" onclick="selectedAudio(${i})">
        <div id="card-img">
            <img src=${audioData[i].albumCover} />
        </div>
        <div id="card-content">
            <h3>${audioData[i].track}</h3>
            <p>${audioData[i].artist}</p>
        </div>
    </div>`
    }
})

var image = document.getElementById("image")
function selectedAudio(i) {
    $.get("http://5dd1894f15bbc2001448d28e.mockapi.io/playlist", function (response) {
        var audioData1 = response
        leftDiv.innerHTML = `<audio autoplay  id="audioElement${i}">
    <source id="source" src=${audioData1[i].file} />
</audio>
<img id="image" src=${audioData1[i].albumCover} />
<div id="progressbar-wrapper">
    <div id="progressbar${i}" class="progressBar">

    </div>
</div>
<div id="buttons-wrapper">
    <div id="suffle${i}" class="btn-div" onclick="suffle(${i})">
        <i class="fas fa-random"></i>
    </div>
    <div id="backward${i}" class="btn-div" onclick="backward(${i})">
        <i class="fas fa-step-backward"></i>
    </div>
    <div id="play${i}" class="btn-div"  onclick="play(${i})">
        <i id="icon${i}" class="far fa-pause-circle"></i>
    </div>
    <div id="forward${i}" class="btn-div" onclick="forward(${i})">
        <i class="fas fa-step-forward"></i>
    </div>
    <div id="restart${i}" class="btn-div" onclick="restart(${i})">
        <i class="fas fa-undo"></i>
    </div>
</div>
<div id="title">
    <h2>${audioData1[i].track}</h2>
    <p>${audioData1[i].artist}</p>
</div>`
        bar(i)

    })
}
//Play Btn
function play(i) {
    var audioElement = document.getElementById("audioElement" + i)
    var playDiv = document.getElementById("play" + i)
    var progressBar = document.getElementById("progressbar" + i)
    var iTag = document.getElementById("icon" + i)
    if (iTag.className == "far fa-play-circle") {
        iTag.className = "far fa-pause-circle"
        audioElement.play()
    }
    else if (iTag.className == "far fa-pause-circle") {
        iTag.className = "far fa-play-circle"
        audioElement.pause()
    }
    bar(i)

}

function bar(i) {
    var audioElement = document.getElementById("audioElement" + i)
    var progressBar = document.getElementById("progressbar" + i)
    audioElement.addEventListener("timeupdate", function () {
        progressBar.style.width = (audioElement.currentTime / audioElement.duration) * 100 + "%"
    })
}

//Repeat Btn
function restart(i) {
    var audioElement = document.getElementById("audioElement" + i)
    audioElement.currentTime = 0
}


var audio = JSON.parse(localStorage.getItem("audioData"))
//Farward Btn
function forward(i) {
    if (i == (audio.length - 1)) {
        i = -1
    }
    leftDiv.innerHTML = `<audio autoplay  id="audioElement${i + 1}">
    <source id="source" src=${audio[i + 1].file} />
</audio>
<img id="image" src=${audio[i + 1].albumCover} />
<div id="progressbar-wrapper">
    <div id="progressbar${i + 1}" class="progressBar">

    </div>
</div>
<div id="buttons-wrapper">
    <div id="suffle${i + 1}" class="btn-div" onclick="suffle(${i + 1})">
        <i class="fas fa-random"></i>
    </div>
    <div id="backward${i + 1}" class="btn-div" onclick="backward(${i + 1})">
        <i class="fas fa-step-backward"></i>
    </div>
    <div id="play${i + 1}" class="btn-div"  onclick="play(${i + 1})">
        <i id="icon${i + 1}" class="far fa-pause-circle"></i>
    </div>
    <div id="forward${i + 1}" class="btn-div" onclick="forward(${i + 1})">
        <i class="fas fa-step-forward"></i>
    </div>
    <div id="restart${i + 1}" class="btn-div" onclick="restart(${i + 1})">
        <i class="fas fa-undo"></i>
    </div>
</div>
<div id="title">
    <h2>${audio[i + 1].track}</h2>
    <p>${audio[i + 1].artist}</p>
</div>`
    bar(i + 1)

}

//Backward Btn
function backward(i) {
    if (i == 0) {
        i = 7
    }
    leftDiv.innerHTML = `<audio autoplay  id="audioElement${i - 1}">
    <source id="source" src=${audio[i - 1].file} />
</audio>
<img id="image" src=${audio[i - 1].albumCover} />
<div id="progressbar-wrapper">
    <div id="progressbar${i - 1}" class="progressBar">

    </div>
</div>
<div id="buttons-wrapper">
    <div id="suffle${i - 1}" class="btn-div" onclick="suffle(${i - 1})">
        <i class="fas fa-random"></i>
    </div>
    <div id="backward${i - 1}" class="btn-div" onclick="backward(${i - 1})">
        <i class="fas fa-step-backward"></i>
    </div>
    <div id="play${i - 1}" class="btn-div"  onclick="play(${i - 1})">
        <i id="icon${i - 1}" class="far fa-pause-circle"></i>
    </div>
    <div id="forward${i - 1}" class="btn-div" onclick="forward(${i - 1})">
        <i class="fas fa-step-forward"></i>
    </div>
    <div id="restart${i - 1}" class="btn-div" onclick="restart(${i - 1})">
        <i class="fas fa-undo"></i>
    </div>
</div>
<div id="title">
    <h2>${audio[i - 1].track}</h2>
    <p>${audio[i - 1].artist}</p>
</div>`
    bar(i - 1)
}

//Suffle
function suffle(i) {
    var randomIndex = Math.floor(Math.random() * audio.length);
    leftDiv.innerHTML = `<audio autoplay  id="audioElement${randomIndex}">
    <source id="source" src=${audio[randomIndex].file} />
</audio>
<img id="image" src=${audio[randomIndex].albumCover} />
<div id="progressbar-wrapper">
    <div id="progressbar${randomIndex}" class="progressBar">

    </div>
</div>
<div id="buttons-wrapper">
    <div id="suffle${randomIndex}" class="btn-div" onclick="suffle(${randomIndex})">
        <i class="fas fa-random"></i>
    </div>
    <div id="backward${randomIndex}" class="btn-div" onclick="backward(${randomIndex})">
        <i class="fas fa-step-backward"></i>
    </div>
    <div id="play${randomIndex}" class="btn-div"  onclick="play(${randomIndex})">
        <i id="icon${randomIndex}" class="far fa-pause-circle"></i>
    </div>
    <div id="forward${randomIndex}" class="btn-div" onclick="forward(${randomIndex})">
        <i class="fas fa-step-forward"></i>
    </div>
    <div id="restart${randomIndex}" class="btn-div" onclick="restart(${randomIndex})">
        <i class="fas fa-undo"></i>
    </div>
</div>
<div id="title">
    <h2>${audio[randomIndex].track}</h2>
    <p>${audio[randomIndex].artist}</p>
</div>`
bar(randomIndex)
}



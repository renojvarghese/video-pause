import "./scss/main.scss";
require.context("../static", true);
import * as handTrack from 'handtrackjs';
 
const stream = document.getElementById("stream");
let model = null;
let debounce = false;
// Load the model.




function detect() {
    model.detect(stream).then(predictions => {
        console.log('Predictions: ', predictions); 
        if (predictions.length > 0 && !debounce) {
            ping();
        }
    });
    requestAnimationFrame(detect);
}

handTrack.load().then(lmodel => {
    console.log("model loaded")
    model = lmodel;
  // detect objects in the image.
  handTrack.startVideo(stream).then(function (status) {
    console.log("video started", status);
    detect();
  });
  
  
});


import mov from "../static/videos/spheres.mp4";
let video = document.getElementById("video");
video.onloadedmetadata = function() {
    vidObj = 
    {
        name: "dice",
        url: "dice.mp4",
        times: [
            0,7
        ],
        finished_times:[],
        idx: 0,
        stopTime() {
            return this.times[0];
        },
        nextTime() {
            this.finished_times.push(this.times.shift());
        },
        restart() {
            this.times = this.finished_times;
            this.finished_times = [];
        },
        empty() {
            return this.times.length <= 0;
        }

    }
}
video.src = mov


let vidObj = null



let flipOver = false;
video.addEventListener("timeupdate", function(){
    if (video.currentTime >= vidObj.stopTime()) {
        if (vidObj.stopTime()) {
            video.pause();
        }
    }
    console.log(vidObj.stopTime())
});

video.addEventListener("ended", function() {
    console.log("HELLO");
    vidObj.restart();
})

function ping() {
    console.log(debounce)
    if (!debounce) {
            vidObj.nextTime()
            video.play();
            debounce = true;
            setTimeout(function() {
                debounce = false;
            },10 * 1000);
            
    }
}

//video.addEventListener("onended", function)
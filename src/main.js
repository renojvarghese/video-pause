import "./scss/main.scss";
require.context("../static", true);
import "./gest"

let debounce = false;
// Load the model.


const videos = [
    {
        name: "spheres",
        url: "spheres.mp4",
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

    },
    {
        name: "dice",
        url: "dice.mp4",
        times: [
            0,3,6,8,10,12,15,17,19,22,25,27,29,31,34,36,39,41
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

    },


]
// function detect() {
//     model.detect(stream).then(predictions => {
//         console.log('Predictions: ', predictions); 
//         if (predictions.length > 0 && !debounce) {
//             ping();
//         }
//     });
//     requestAnimationFrame(detect);
// }

// handTrack.load().then(lmodel => {
//     console.log("model loaded")
//     model = lmodel;
//   // detect objects in the image.
//   handTrack.startVideo(stream).then(function (status) {
//     console.log("video started", status);
//     detect();
//   });
// });

gest.options.subscribeWithCallback(function(gesture) {
    if (gesture.direction) {
        ping();
    }
})

// EDIT ME
import mov from "../static/videos/dice.mp4";
let video = document.getElementById("video");
video.onloadedmetadata = function() {
    vidObj = videos[1];
    
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
            },2 * 1000);
            
    }
}
gest.start();
//video.addEventListener("onended", function)
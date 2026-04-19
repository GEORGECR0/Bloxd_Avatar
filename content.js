const img = document.createElement("img");

const idleImg = chrome.runtime.getURL("assets/image1.png");
const talkingImg = chrome.runtime.getURL("assets/image2.png");

img.src = idleImg;

img.style.position = "fixed";
img.style.bottom = "0px";
img.style.left = "0px";
img.style.width = "400px";
img.style.zIndex = "999999999";
img.style.pointerEvents = "none";
img.style.transformOrigin = "bottom left";

document.body.appendChild(img);

function applyZoomCompensation() {
  const zoom = window.devicePixelRatio;
  img.style.transform = `scale(${1 / zoom})`;
}

applyZoomCompensation();
window.addEventListener("resize", applyZoomCompensation);

navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
  const audioContext = new AudioContext();
  const mic = audioContext.createMediaStreamSource(stream);
  const analyser = audioContext.createAnalyser();

  mic.connect(analyser);

  const data = new Uint8Array(analyser.frequencyBinCount);

  let speaking = false;

  function checkAudio() {
    analyser.getByteFrequencyData(data);

    let volume = 0;
    for (let i = 0; i < data.length; i++) {
      volume += data[i];
    }

    volume = volume / data.length;

    if (volume > 15) {
      if (!speaking) {
        speaking = true;
        img.src = talkingImg;
      }
    } else {
      if (speaking) {
        speaking = false;
        img.src = idleImg;
      }
    }

    requestAnimationFrame(checkAudio);
  }

  checkAudio();
});

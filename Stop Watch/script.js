let display = document.querySelector("#displayTime");
let stops = document.querySelector("#stop");
let play = document.querySelector("#play");
let reset = document.querySelector("#reset");
let intervalId;

stops.addEventListener("click", stopTime);
play.addEventListener("click", startTime);
reset.addEventListener("click", resetTime);

let [hour, minute, second] = [0, 0, 0];

function displayTime() {
  second++;
  if (second == 60) {
    second = 0;
    minute++;
    if (minute == 60) {
      minute = 0;
      hour++;
    }
  }
  let h = hour < 10 ? "0" + hour : hour;
  let m = minute < 10 ? "0" + minute : minute;
  let s = second < 10 ? "0" + second : second;
  display.innerText = `${h}: ${m}: ${s}`;
}

function stopTime() {
  clearInterval(intervalId);
}

function startTime() {
  clearInterval(intervalId);
  intervalId = setInterval(displayTime, 1000);
}

function resetTime() {
  clearInterval(intervalId);
  [hour, minute, second] = [0, 0, 0];
  display.innerText = `00:00:00`;
}

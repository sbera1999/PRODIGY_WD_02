let timerInterval;
let elapsedTime = 0;
let paused = true;

const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const timeDisplay = document.getElementById('time');
const lapsList = document.getElementById('lapsList');

startPauseBtn.addEventListener('click', startPause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

function startPause() {
    if (paused) {
        paused = false;
        startPauseBtn.textContent = 'Pause';
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 100);
    } else {
        paused = true;
        startPauseBtn.textContent = 'Start';
        clearInterval(timerInterval);
    }
}

function reset() {
    paused = true;
    clearInterval(timerInterval);
    startPauseBtn.textContent = 'Start';
    elapsedTime = 0;
    timeDisplay.textContent = '00:00:00';
    lapsList.innerHTML = '';
}

function recordLap() {
    if (!paused) {
        const lapTime = formatTime(elapsedTime);
        const li = document.createElement('li');
        li.textContent = lapTime;
        lapsList.appendChild(li);
    }
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
}

function formatTime(time) {
    const totalSeconds = Math.floor(time / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(unit) {
    return unit < 10 ? '0' + unit : unit;
}

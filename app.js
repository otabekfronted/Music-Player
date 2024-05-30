document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("audio");
    const playPauseButton = document.getElementById("play-pause");
    const stopButton = document.getElementById("stop");
    const volumeUpButton = document.getElementById("volume-up");
    const volumeDownButton = document.getElementById("volume-down");
    const progressBar = document.getElementById("progress-bar");
    const currentTimeElement = document.getElementById("current-time");
    const durationElement = document.getElementById("duration");

    playPauseButton.addEventListener("click", function () {
        if (audio.paused) {
            audio.play();
            playPauseButton.textContent = "Pause";
        } else {
            audio.pause();
            playPauseButton.textContent = "Play";
        }
    });

    stopButton.addEventListener("click", function () {
        audio.pause();
        audio.currentTime = 0;
        playPauseButton.textContent = "Play";
    });

    volumeUpButton.addEventListener("click", function () {
        audio.volume = Math.min(audio.volume + 0.1, 1);
    });

    volumeDownButton.addEventListener("click", function () {
        audio.volume = Math.max(audio.volume - 0.1, 0);
    });

    audio.addEventListener("timeupdate", function () {
        const currentTime = Math.floor(audio.currentTime);
        const duration = Math.floor(audio.duration);

        progressBar.value = (currentTime / duration) * 100;
        currentTimeElement.textContent = formatTime(currentTime);
        durationElement.textContent = formatTime(duration);
    });

    progressBar.addEventListener("input", function () {
        const duration = audio.duration;
        audio.currentTime = (progressBar.value / 100) * duration;
    });

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    }
});

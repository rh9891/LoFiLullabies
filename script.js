// DOM Elements.
const musicContainer = document.getElementById("music-container");

const playButton = document.getElementById("play");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

// Array of song titles.
const songs = [
  "Blue Boi",
  "By The Pool",
  "Chill Day",
  "Doing Just Fine",
  "I Found Me",
  "In My Clouds",
  "Overjoyed",
  "This Feeling",
  "Visions",
  "Warm Nights",
];

// Keeps track of song.
let songIndex = 0;

// Function to load song details into DOM initially.
loadSong(songs[songIndex]);

// Function to update song details (image/title/music).
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/covers/${song}.jpg`;
}

// Function to play song.
playSong = () => {
  musicContainer.classList.add("play");
  playButton.querySelector("i.fas").classList.remove("fa-play");
  playButton.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
};

// Function to pause song.
pauseSong = () => {
  musicContainer.classList.remove("play");
  playButton.querySelector("i.fas").classList.add("fa-play");
  playButton.querySelector("i.fas").classList.remove("fa-pause");

  audio.pause();
};

// Function to play previous song.
playPrevSong = () => {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
};

// Function to play next song.
playNextSong = () => {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
};

// Function to update the time/progress of the song via the progress bar.
updateProgress = (event) => {
  const { duration, currentTime } = event.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
};

// Function to set the progress of song when clicking on progress bar.
function setProgress(event) {
  const width = this.clientWidth;
  const pointClicked = event.offsetX;
  const duration = audio.duration;

  audio.currentTime = (pointClicked / width) * duration;
}

// Event listener to play and/or pause song.
playButton.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Event listener to change song to previous song.
prevButton.addEventListener("click", playPrevSong);

// Event listener to change song to next song.
nextButton.addEventListener("click", playNextSong);

// Event listener to update the time/progress of the song.
audio.addEventListener("timeupdate", updateProgress);

// Event listener to set the progress of song when clicking on progress bar.
progressContainer.addEventListener("click", setProgress);

// Event listener for when the song ends.
audio.addEventListener("ended", playNextSong);

document.addEventListener('DOMContentLoaded', function() {
  const video = document.getElementById('energyVideo');
  const pauseBtn = document.getElementById('pauseBtn');
  const playBtn = document.getElementById('playBtn');
  const videoContainer = document.getElementById('videoContainer');
  
  // Initially hide both buttons on page load
  pauseBtn.style.opacity = '0';
  pauseBtn.style.pointerEvents = 'none';
  playBtn.style.opacity = '0';
  playBtn.style.pointerEvents = 'none';
  
  // Ensure autoplay works
  video.autoplay = true;
  video.muted = true;
  
  // Show the pause button only when hovering over the video (if the video is playing)
  videoContainer.addEventListener('mouseover', function() {
    if (!video.paused) {
      pauseBtn.style.opacity = '1';
      pauseBtn.style.pointerEvents = 'auto';
    }
  });
  
  // Hide pause button when mouse leaves (only if video is playing)
  videoContainer.addEventListener('mouseleave', function() {
    if (!video.paused) {
      pauseBtn.style.opacity = '0';
      pauseBtn.style.pointerEvents = 'none';
    }
  });
  
  // When the pause button is clicked, pause the video, hide the pause button, and show the play button
  pauseBtn.addEventListener('click', function() {
    video.pause();
    pauseBtn.style.opacity = '0';
    pauseBtn.style.pointerEvents = 'none';
    playBtn.style.opacity = '1';
    playBtn.style.pointerEvents = 'auto';
  });
  
  // When the play button is clicked, play the video and hide the play button
  playBtn.addEventListener('click', function() {
    video.play();
    playBtn.style.opacity = '0';
    playBtn.style.pointerEvents = 'none';
    // Don't show pause button immediately after clicking play
    // It will only show when hovering over the video again
  });
  
  // When the video is paused, always show the play button
  video.addEventListener('pause', function() {
    playBtn.style.opacity = '1';
    playBtn.style.pointerEvents = 'auto';
    pauseBtn.style.opacity = '0';
    pauseBtn.style.pointerEvents = 'none';
  });
  
  // When the video plays, hide the play button
  video.addEventListener('play', function() {
    playBtn.style.opacity = '0';
    playBtn.style.pointerEvents = 'none';
    // Don't automatically show pause button
  });
});
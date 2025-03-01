const navMenu = document.getElementById('navMenu');
const hamburgerIcon = document.getElementById('hamburger');
const menuDropdown = document.getElementById('menuDropdown');

hamburgerIcon.addEventListener('click', () => {
    if (menuDropdown.classList.contains('hidden')) {
      // Show the menu
      menuDropdown.classList.remove('hidden');
      menuDropdown.classList.add('visible');
    } else {
      // Hide the menu
      menuDropdown.classList.remove('visible');
      menuDropdown.classList.add('hidden');
    }
  });


  document.addEventListener("DOMContentLoaded", () => {
    const videos = document.querySelectorAll("video");
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.play(); 
        } else {
          entry.target.pause(); 
        }
      });
    }, { threshold: 0.5 }); 
  
    videos.forEach(video => {
      video.muted = true; 
      observer.observe(video);
    });
  });
  
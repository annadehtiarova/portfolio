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
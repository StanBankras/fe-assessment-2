const hamburger = document.getElementById('hamburger');
const navigation = document.getElementById('main-nav');

hamburger.addEventListener('click', () => {
  navigation.classList.toggle('active');
  hamburger.classList.toggle('active');
});

// Adds specific styling needed for when Javascript is enabled in the browser
navigation.classList.add('js');
hamburger.classList.add('js');
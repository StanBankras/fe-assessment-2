const hamburger = document.getElementById('hamburger');
const navigation = document.getElementById('main-nav');

hamburger.addEventListener('click', () => {
  navigation.classList.toggle('active');
  hamburger.classList.toggle('active');
});

navigation.classList.add('js');
hamburger.classList.add('js');
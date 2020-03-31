const matchUl = document.querySelector('#match-items ul');
const sliderNav = document.querySelector('#slider-nav .wrap');

let users = [];

axios.get('https://frontend-development-server.herokuapp.com/users')
.then(response => {
  users = response.data;
  renderMatches('5e676b813cd15e48d4114d80');
})
.catch(err => {
  console.log(err);
});

// Render the matches when the page is ready

function renderMatches(userId) {
  const matches = getMatches(userId);
  const user = getUser(userId);

  document.querySelector('#match-amount').textContent = matches.length;

  matches.forEach(match => {
    let li = document.createElement('LI');
    li.setAttribute('data-match', match.id);
    li.innerHTML = `
    <figure>
      <div class="img-wrapper">
        <img class="profile-picture"
          src="${ match.picture }"
          width="250px" height="auto" alt="${ match.firstName } ${ match.lastName }">
      </div>
      <figcaption>${ match.firstName } ${ match.lastName }, ${ match.age }</figcaption>
    </figure>
    <div class="hearts">
      <form action="/like" method="POST">
        <input type="hidden" name="id" value="${ match.id }">
        <button type="submit">
          <img class="like ${ user.likedPersons.includes(match.id) ? 'active' : '' }" src="img/like.png" alt="">
          <span class="liked-text">${ user.likedPersons.includes(match.id) ? 'liked' : 'not liked' }</span>
        </button>
      </form>
    </div>  
    `;
    matchUl.appendChild(li);
  });

  renderSliderButtons(matches);
}

function renderSliderButtons(matches) {
  const backArrow = document.createElement('I');
  backArrow.setAttribute('id', 'slide-back');
  backArrow.setAttribute('class', 'material-icons arrows');
  backArrow.textContent = 'arrow_back_ios';
  const forwardArrow = document.createElement('I');
  forwardArrow.setAttribute('id', 'slide-forward');
  forwardArrow.setAttribute('class', 'material-icons arrows');
  forwardArrow.textContent = 'arrow_forward_ios';

  sliderNav.appendChild(backArrow);

  for(let i=0;i<matches.length;i++) {
    const button = document.createElement('I');
    button.setAttribute('data-slide', `${ i }`);
    button.setAttribute('class', 'material-icons slide-icon');
    button.textContent = 'panorama_fish_eye';
    sliderNav.appendChild(button);
  }

  sliderNav.appendChild(forwardArrow);
  initializeSlider();
  initializeLiking();
}

// Get user by userId
function getUser(userId) {
  return users.filter(x => { return x.id == userId })[0];
}

// Get all matches from a user
function getMatches(userId) {
  const user = getUser(userId);
  const matches = [];
  user.matches.forEach(match => {
    matches.push(getUser(match));
  });
  return matches;
}


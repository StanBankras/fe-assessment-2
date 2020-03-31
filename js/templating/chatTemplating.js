const chatList = document.querySelector('#chat-list');
let users = [];
let chats = [];

axios.get('http://localhost:3000/chats')
.then(response => {
  chats = response.data;
})
.then(() => {
  axios.get('http://localhost:3000/users')
  .then(response => {
    users = response.data;
    renderChats('5e676b813cd15e48d4114d80');
  })
  .catch(err => {
    console.log(err);
  });
})
function renderChats(userId) {
  const chats = getChats(userId);
  const user = getUser(userId);
  console.log(chats);
  chats.forEach(chat => {
    const otherUser = userId == chat.users[0].id ? getUser(chat.users[0]) : getUser(chat.users[1]);
    const chatItem = document.createElement('LI');
    chatItem.setAttribute('class', 'chat-item');
    chatItem.innerHTML = `
    <a href="chat.html">
      <img src="${ otherUser.picture }" 
        alt="${ otherUser.firstName + ' ' + otherUser.lastName }"
        width="200px" 
        height="auto">
      <div>
        <h3>Chat with ${ otherUser.firstName }, ${ otherUser.age }</h3>
        <p class="last-message">Hoe is het? - 12:06 - 23/09</p>
      </div>
      <i class="material-icons arrows">arrow_forward_ios</i>
    </a>
    `;
    chatList.appendChild(chatItem);
  });
  
}

// Get user by userId
function getUser(userId) {
  return users.filter(x => { return x.id == userId })[0];
}

function getChat(chatId) {
  return chats.filter(x => x.id == chatId)[0];
}

// Get all matches from a user
function getChats(userId) {
  const user = getUser(userId);
  const chats = [];
  user.chats.forEach(chat => {
    chats.push(getChat(chat));
  });
  return chats;
}


const userSelect = document.querySelector('#user');
let users = [];

axios.get('https://frontend-development-server.herokuapp.com/users')
.then(response => {
  users = response.data;
  addUsersToSelect();
})

function addUsersToSelect() {
  users.forEach(user => {
    const option = document.createElement('OPTION');
    option.setAttribute('value', user.id);
    option.textContent = user.firstName + ' ' + user.lastName;
    userSelect.appendChild(option);
  })
}
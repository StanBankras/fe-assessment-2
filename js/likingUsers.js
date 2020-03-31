function initializeLiking(activeUser) {

    const likeHearts = document.querySelectorAll('.hearts button');

    likeHearts.forEach((heart) => {
        heart.addEventListener('click', (e) => {
            e.preventDefault();
            const id = e.target.parentNode.parentNode.parentNode.parentNode.dataset.match;
            // Used axios to send data from clientside to backend, as it's very lightweight and cleaner/easier in use than Fetch API
            return axios.post('https://frontend-development-server.herokuapp.com/like', {
                likedUser: id,
                userId: activeUser,
                type: 'js'
            })
            .then((res) => {
                if (res.request.status == 201) {
                    e.target.classList.remove('active');
                } else {
                    e.target.classList.add('active');
                }
            })
            .catch(err => console.error(err));
        });
    });

}
const feed = document.getElementById('feed');

// 1. Page load hote hi local storage se purani posts dikhao
window.onload = () => {
    const savedPosts = JSON.parse(localStorage.getItem('myPosts')) || [];
    savedPosts.forEach(post => createPostHTML(post.user, post.img));
};

// 2. Add Post Function
function addPost() {
    const user = document.getElementById('username').value;
    const img = document.getElementById('imageLink').value;
    if(!user || !img) return alert("Fill everything!");

    createPostHTML(user, img);
    saveToStorage(user, img); // Save kar lo
}

function createPostHTML(user, img) {
    const postHTML = `
        <div class="post-card">
            <div class="header"><b>${user}</b></div>
            <div class="image-box"><img src="${img}"></div>
            <div class="actions">
                <span class="like-count">0</span> Likes 
                <button class="like-btn">Like</button>
                <button class="del-btn" style="background:red">Delete</button>
            </div>
        </div>
    `;
    feed.innerHTML += postHTML;
}

// 3. LocalStorage logic
function saveToStorage(user, img) {
    const posts = JSON.parse(localStorage.getItem('myPosts')) || [];
    posts.push({ user, img });
    localStorage.setItem('myPosts', JSON.stringify(posts));
}

// 4. Event Delegation (Like & Delete dono ka kaam)
feed.addEventListener('click', (e) => {
    // Like logic
    if (e.target.classList.contains('like-btn')) {
        let countSpan = e.target.parentElement.querySelector('.like-count');
        countSpan.innerText = parseInt(countSpan.innerText) + 1;
    }
    // Delete logic
    if (e.target.classList.contains('del-btn')) {
        e.target.closest('.post-card').remove();
    }
});
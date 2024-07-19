document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('posts-container');
    const createPostButton = document.getElementById('create-post-button');
    const postForm = document.getElementById('post-form');
    const submitPostButton = document.getElementById('submit-post');
    const searchInput = document.getElementById('search');
    const filterSelect = document.getElementById('filter');
    
    const initialPosts = [
        { id: 1, title: 'Поделитесь знанием?', content: 'Привет всем! Вчера нашла замечательный ресурс для изучения Python, который рекомендую всем, кто только начинает в программировании. Ссылка!', likes: 5, dislikes: 2, author: 'admin' },
        { id: 2, title: 'Вопрос!Помогите :(', content: 'Привет! У меня возник вопрос по проекту на JavaScript. Как лучше организовать код для работы с API? Буду признательна за советы!', likes: 3, dislikes: 1, author: 'admin' },
        { id: 3, title: 'Советы и рекомендации', content: 'Девушки, не забывайте про важность сетевого взаимодействия. Участвуйте в конференциях, вебинарах и мероприятиях, чтобы расширять свои профессиональные связи!', likes: 8, dislikes: 0, author: 'admin' },
        { id: 4, title: 'Личный опыт?', content: 'Недавно завершила стажировку в IT-компании и хочу поделиться своими впечатлениями. Это был отличный опыт, который помог мне понять, что именно я хочу делать дальше. ', likes: 7, dislikes: 4, author: 'admin' }
    ];
    
    const currentUser = 'user';
    const posts = [...initialPosts]; 

    function renderPosts() {
        postsContainer.innerHTML = '';
        posts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.className = 'post';
            
            const rating = post.likes - post.dislikes;
            
            postDiv.innerHTML = `
                <a href="post.html?id=${post.id}" class="title">${post.title}</a>
                <div class="content">${post.content}</div>
                <div class="actions">
                    <div class="rating">Рейтинг: ${rating}</div>
                    <div class="likes-dislikes">
                        <button class="like-btn" onclick="likePost(${post.id})">👍 ${post.likes}</button>
                        <button class="dislike-btn" onclick="dislikePost(${post.id})">👎 ${post.dislikes}</button>
                        ${post.author === currentUser ? `
                            <button class="edit-btn" onclick="editPost(${post.id})">Редактировать</button>
                            <button class="delete-btn" onclick="deletePost(${post.id})">Удалить</button>` : ''}
                    </div>
                </div>
            `;
            
            postsContainer.appendChild(postDiv);
        });
    }
    
    function addPost(title, content) {
        const newPost = {
            id: posts.length + 1,
            title,
            content,
            likes: 0,
            dislikes: 0,
            author: currentUser
        };
        posts.push(newPost);
        renderPosts();
    }

    window.editPost = function(postId) {
        const post = posts.find(p => p.id === postId);
        if (post) {
            document.getElementById('post-title').value = post.title;
            document.getElementById('post-content').value = post.content;
            postForm.classList.remove('hidden');
            submitPostButton.innerText = 'Сохранить изменения';
            
            submitPostButton.onclick = () => {
                const updatedTitle = document.getElementById('post-title').value.trim();
                const updatedContent = document.getElementById('post-content').value.trim();
                if (updatedTitle && updatedContent) {
                    post.title = updatedTitle;
                    post.content = updatedContent;
                    postForm.classList.add('hidden');
                    submitPostButton.innerText = 'Опубликовать';
                    renderPosts();
                }
            };
        }
    }
    
    window.likePost = function(postId) {
        const post = posts.find(p => p.id === postId);
        if (post) {
            post.likes++;
            renderPosts();
        }
    }
    
    window.dislikePost = function(postId) {
        const post = posts.find(p => p.id === postId);
        if (post) {
            post.dislikes++;
            renderPosts();
        }
    }
    
    window.deletePost = function(postId) {
        const postIndex = posts.findIndex(p => p.id === postId);
        if (postIndex !== -1) {
            posts.splice(postIndex, 1);
            renderPosts();
        }
    }
    
    createPostButton.addEventListener('click', () => {
        postForm.classList.toggle('hidden');
        submitPostButton.innerText = 'Опубликовать';
        submitPostButton.onclick = () => {
            const title = document.getElementById('post-title').value.trim();
            const content = document.getElementById('post-content').value.trim();
            if (title && content) {
                addPost(title, content);
                document.getElementById('post-title').value = '';
                document.getElementById('post-content').value = '';
                postForm.classList.add('hidden');
            }
        };
    });
    
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(query) || post.content.toLowerCase().includes(query));
        postsContainer.innerHTML = '';
        filteredPosts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.className = 'post';
            
            const rating = post.likes - post.dislikes;
            
            postDiv.innerHTML = `
                <a href="post.html?id=${post.id}" class="title">${post.title}</a>
                <div class="content">${post.content}</div>
                <div class="actions">
                    <div class="rating">Рейтинг: ${rating}</div>
                    <div class="likes-dislikes">
                        <button class="like-btn" onclick="likePost(${post.id})">👍 ${post.likes}</button>
                        <button class="dislike-btn" onclick="dislikePost(${post.id})">👎 ${post.dislikes}</button>
                        ${post.author === currentUser ? `
                            <button class="edit-btn" onclick="editPost(${post.id})">Редактировать</button>
                            <button class="delete-btn" onclick="deletePost(${post.id})">Удалить</button>` : ''}
                    </div>
                </div>
            `;
            
            postsContainer.appendChild(postDiv);
        });
    });
    
    filterSelect.addEventListener('change', () => {
        const filter = filterSelect.value;
        if (filter === 'popular') {
            posts.sort((a, b) => (b.likes - b.dislikes) - (a.likes - a.dislikes));
        } else if (filter === 'less-popular') {
            posts.sort((a, b) => (a.likes - a.dislikes) - (b.likes - b.dislikes));
        } else {
            posts.sort((a, b) => a.id - b.id);
        }
        renderPosts();
    });
    
    renderPosts();
});

document.addEventListener('DOMContentLoaded', () => {
    const postTitle = document.getElementById('post-title');
    const postContent = document.getElementById('post-content');
    const postRating = document.getElementById('post-rating');
    const likeBtn = document.getElementById('like-btn');
    const dislikeBtn = document.getElementById('dislike-btn');
    const likesCount = document.getElementById('likes-count');
    const dislikesCount = document.getElementById('dislikes-count');
    const commentsContainer = document.getElementById('comments-container');
    const commentContent = document.getElementById('comment-content');
    const submitCommentButton = document.getElementById('submit-comment');
    

    const urlParams = new URLSearchParams(window.location.search);
    const postId = parseInt(urlParams.get('id'), 10);
    
    const initialPosts = [
        { id: 1, title: 'Поделитесь знанием?', content: 'Привет всем! Вчера нашла замечательный ресурс для изучения Python, который рекомендую всем, кто только начинает в программировании. Ссылка!', likes: 5, dislikes: 2, author: 'admin' , comments : []},
        { id: 2, title: 'Вопрос!Помогите :(', content: 'Привет! У меня возник вопрос по проекту на JavaScript. Как лучше организовать код для работы с API? Буду признательна за советы!', likes: 3, dislikes: 1, author: 'admin' , comments : []},
        { id: 3, title: 'Советы и рекомендации', content: 'Девушки, не забывайте про важность сетевого взаимодействия. Участвуйте в конференциях, вебинарах и мероприятиях, чтобы расширять свои профессиональные связи!', likes: 8, dislikes: 0, author: 'admin'  , comments : [] },
        { id: 4, title: 'Личный опыт?', content: 'Недавно завершила стажировку в IT-компании и хочу поделиться своими впечатлениями. Это был отличный опыт, который помог мне понять, что именно я хочу делать дальше. ', likes: 7, dislikes: 4, author: 'admin' , comments : [] }
    ];
    
    const post = initialPosts.find(p => p.id === postId);
    
    if (post) {
        postTitle.textContent = post.title;
        postContent.textContent = post.content;
        const rating = post.likes - post.dislikes;
        postRating.textContent = `Рейтинг: ${rating}`;
        likesCount.textContent = post.likes;
        dislikesCount.textContent = post.dislikes;

        post.comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.className = 'comment';
            commentDiv.innerHTML = `
                <div class="author">${comment.author}</div>
                <div class="content">${comment.content}</div>
            `;
            commentsContainer.appendChild(commentDiv);
        });

        likeBtn.addEventListener('click', () => {
            post.likes++;
            likesCount.textContent = post.likes;
            postRating.textContent = `Рейтинг: ${post.likes - post.dislikes}`;
        });
        
        dislikeBtn.addEventListener('click', () => {
            post.dislikes++;
            dislikesCount.textContent = post.dislikes;
            postRating.textContent = `Рейтинг: ${post.likes - post.dislikes}`;
        });

        submitCommentButton.addEventListener('click', () => {
            const newComment = {
                id: post.comments.length + 1,
                author: 'currentUser',
                content: commentContent.value.trim()
            };
            if (newComment.content) {
                post.comments.push(newComment);
                const commentDiv = document.createElement('div');
                commentDiv.className = 'comment';
                commentDiv.innerHTML = `
                    <div class="author">${newComment.author}</div>
                    <div class="content">${newComment.content}</div>
                `;
                commentsContainer.appendChild(commentDiv);
                commentContent.value = '';
            }
        });
    } else {
        postTitle.textContent = 'Пост не найден';
        postContent.textContent = '';
    }
});

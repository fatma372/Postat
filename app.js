
let postsContainer = document.querySelector('.posts');
let tagsContainer = document.querySelector(".main-tags")

let allPostsLink='https://dummyjson.com/posts';
function getPosts(url){
fetch(url)
.then((res) =>{  return res.json()})
.then((data)=>{
    let posts =data.posts;
    // console.log(posts)
    posts.map((post)=>{
        let postTags = post.tags;
        postsContainer.innerHTML += `
            <div class="post-card">
                <p class="post-content">${post.body}</p>
                <div class="post-tags">
                ${postTags.map((tag) => `<span class="tag">#${tag}</span>`).join(' ')}
                </div>
                <div class="data">
                    <div class="views">
                        <i class="fa-solid fa-eye"></i>
                        <span class="count">${post.views}</span>
                    </div>
                    <div class="likes">
                        <i class="fa-solid fa-heart"></i>
                        <span class="count">${post.reactions.likes}</span>
                    </div>
                    <div class="dislikes">
                        <i class="fa-solid fa-thumbs-down"></i>
                        <span class="count">${post.reactions.dislikes}</span>
                    </div>
                </div>
            </div>
        `;
})

});
}

getPosts(allPostsLink)

function getCategories(){
    fetch('https://dummyjson.com/posts/tags')
   .then((res) => { return res.json() })
   .then((data) => {
    data.map((tag) => {
        tagsContainer.innerHTML += `
            <span class="main-tag" onclick="getCategoryPosts('${tag.url}')">#${tag.slug}</span>
        `;
    })
 
   })
}
getCategories()

function getCategoryPosts(tagUrl){
     postsContainer.innerHTML = " "
    getPosts(tagUrl)
}

let search=document.querySelector(".search")
search.addEventListener("keyup",()=>{
    let searchValue = search.value.toLowerCase()
    postsContainer.innerHTML = " "
    let searchLink = `https://dummyjson.com/posts/search?q=${searchValue}`
    getPosts(searchLink)

})
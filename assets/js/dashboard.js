// ========== Utilities ==========
function getPosts() {
    return JSON.parse(localStorage.getItem("blogPosts")) || [];
  }
  
  function savePosts(posts) {
    localStorage.setItem("blogPosts", JSON.stringify(posts));
  }
  
  function resetForm() {
    document.getElementById("postId").value = "";
    document.getElementById("title").value = "";
    document.getElementById("date").value = "";
    document.getElementById("content").value = "";
  }
  
  // ========== Render Posts ==========
  function renderPosts() {
    const container = document.getElementById("postsContainer");
    container.innerHTML = "";
    const posts = getPosts();
  
    posts.forEach((post, index) => {
      const div = document.createElement("div");
      div.className = "post";
  
      div.innerHTML = `
        <h3>${post.title}</h3>
        <p class="date">${post.date}</p>
        <p class="content">${post.content}</p>
        <div class="actions">
          <button onclick="editPost(${index})">Edit</button>
          <button onclick="deletePost(${index})">Delete</button>
        </div>
      `;
  
      container.appendChild(div);
    });
  }
  
  // ========== Add / Edit Post ==========
  document.getElementById("blogForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const postId = document.getElementById("postId").value;
    const title = document.getElementById("title").value.trim();
    const date = document.getElementById("date").value;
    const content = document.getElementById("content").value.trim();
  
    if (!title || !date || !content) return;
  
    const posts = getPosts();
  
    const newPost = { title, date, content };
  
    if (postId === "") {
      posts.push(newPost);
    } else {
      posts[parseInt(postId)] = newPost;
    }
  
    savePosts(posts);
    renderPosts();
    resetForm();
  });
  
  // ========== Edit ==========
  function editPost(index) {
    const posts = getPosts();
    const post = posts[index];
  
    document.getElementById("postId").value = index;
    document.getElementById("title").value = post.title;
    document.getElementById("date").value = post.date;
    document.getElementById("content").value = post.content;
  }
  
  // ========== Delete ==========
  function deletePost(index) {
    const posts = getPosts();
    posts.splice(index, 1);
    savePosts(posts);
    renderPosts();
  }
  
  // ========== Initial Load ==========
  window.onload = renderPosts;
  
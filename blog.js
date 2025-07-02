window.onload = function () {
  let button = document.querySelector('#btn1');
  let formSection = document.querySelector('#blogFormSection');
  let form = document.querySelector('#blogForm');
  let blogArea = document.querySelector("#blog-posts");
  let searchBox = document.querySelector("#searchinput");

  // Toggle the form visibility
  button.onclick = function () {
    formSection.style.display = (formSection.style.display === "none") ? "block" : "none";
  };

  // Handle form submission to create a new blog post
  form.onsubmit = function (e) {
    e.preventDefault();

    let title = document.querySelector("#blogTitle").value;
    let category = document.querySelector("#blogCategory").value.toLowerCase();
    let image = document.querySelector("#blogImage").value;
    let content = document.querySelector("#blogContent").value;

    // Create the post section
    let post = document.createElement("section");
    post.className = "blog-post";
    post.setAttribute("data-category", category);

    post.innerHTML = `
      <h2>${title}</h2>
      <p class="date">Published on: ${new Date().toLocaleDateString()}</p>
      <img src="${image}" alt="">
      <p>${content}</p>
      <div class="comment-section">
        <h3>Leave a Comment</h3>
        <input type="text" class="comment-name" placeholder="Your Name">
        <textarea class="comment-message" placeholder="Your Comment"></textarea>
        <button class="comment-submit">Post Comment</button>
        <div class="comment-list"></div>
      </div>
    `;

    post.style.display = "block";
    blogArea.appendChild(post);
    form.reset();
    formSection.style.display = "none";

    // Enable comment functionality on the new post
    enableComment(post);
  };

  // Enable comment logic on all existing blog posts
  document.querySelectorAll(".blog-post").forEach(enableComment);

  // Category filter
  let categoryLinks = document.querySelectorAll("[data-category]");
  categoryLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      let selected = this.getAttribute("data-category");
      let posts = document.querySelectorAll(".blog-post");

      posts.forEach(function (post) {
        let postCategory = post.getAttribute("data-category");
        post.style.display = (selected === "all" || selected === postCategory) ? "block" : "none";
      });
    });
  });

  // Search bar filtering
  searchBox.addEventListener("input", function () {
    let keyword = searchBox.value.toLowerCase();
    let posts = document.querySelectorAll(".blog-post");

    posts.forEach(function (post) {
      let text = post.textContent.toLowerCase();
      post.style.display = text.includes(keyword) ? "block" : "none";
    });
  });

  // Enable comment posting for any blog post section
  function enableComment(post) {
    let nameInput = post.querySelector(".comment-name");
    let messageInput = post.querySelector(".comment-message");
    let submitBtn = post.querySelector(".comment-submit");
    let commentList = post.querySelector(".comment-list");

    if (submitBtn) {
      submitBtn.addEventListener("click", function () {
        let name = nameInput.value.trim();
        let message = messageInput.value.trim();

        if (name && message) {
          let comment = document.createElement("div");
          comment.className = "comment";
          comment.innerHTML = `<strong>${name}:</strong> ${message}`;
          commentList.appendChild(comment);

          nameInput.value = "";
          messageInput.value = "";
        } else {
          alert("Please enter your name and comment.");
        }
      });
    }
  }
};

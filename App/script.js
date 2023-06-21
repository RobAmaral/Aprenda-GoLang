document.addEventListener("DOMContentLoaded", function () {
  getPosts();

  var postForm = document.getElementById("post-form");
  var postInput = document.getElementById("post-input");
  var postList = document.getElementById("post-list");

  postForm.addEventListener("submit", function (event) {
    event.preventDefault();
    createPost(postInput.value);
    postInput.value = "";
  });

  function getPosts() {
    fetch("/posts")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        renderPosts(data);
      })
      .catch(function (error) {
        console.log("Error fetching posts:", error);
      });
  }

  function createPost(content) {
    var post = { content: content };

    fetch("/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then(function (response) {
        if (response.ok) {
          getPosts();
        } else {
          console.log("Error creating post");
        }
      })
      .catch(function (error) {
        console.log("Error creating post:", error);
      });
  }

  function renderPosts(posts) {
    postList.innerHTML = "";
    posts.forEach(function (post) {
      var postElement = document.createElement("div");
      postElement.classList.add("post");
      postElement.textContent = post.content;
      postList.appendChild(postElement);
    });
  }
});
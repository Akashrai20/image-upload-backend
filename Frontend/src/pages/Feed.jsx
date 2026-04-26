import React, { useState, useEffect } from "react";
import axios from "axios";

const Feed = () => {
  // 1. Initial state mein data rakha hai taaki agar API fail ho to purana dikhe
  const [posts, setPosts] = useState([
    {
      _id: 1, // MongoDB format mein _id hota hai
      image:
        "https://plus.unsplash.com/premium_photo-1673623135721-a0ea3caff642?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption: "Beautiful sunset! (Static Data)",
    },
  ]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/posts")
      .then((res) => {
        console.log("Backend Data:", res.data);

        // 2. Yahan logic: Agar backend se array aa raha hai to update karo
        // Agar aapke backend ka structure { post: [...] } hai, to res.data.post likho
        if (res.data.posts) {
          setPosts(res.data.posts);
        }
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
      });
  }, []);

  return (
    <section className="feed-section" style={{ padding: "20px" }}>
      <h1>Feed</h1>
      <div className="posts-container">
        {posts.length > 0 ? (
          posts.map((post) => (
            // 3. ID aur Caption dono yahan hain:
            <div
              key={post._id || post.id}
              className="post-card"
              style={{
                border: "1px solid #ddd",
                margin: "10px",
                padding: "10px",
              }}
            >
              {/* Image display */}
              <img
                src={post.image}
                alt={post.caption}
                style={{
                  width: "100%",
                  maxWidth: "400px",
                  borderRadius: "8px",
                }}
              />

              {/* Caption display - Ye raha aapka caption */}
              <h3 style={{ marginTop: "10px" }}>{post.caption}</h3>

              {/* ID display (sirf debugging ke liye) */}
              <small style={{ color: "gray" }}>
                Post ID: {post._id || post.id}
              </small>
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </section>
  );
};

export default Feed;

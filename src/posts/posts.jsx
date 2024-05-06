import React, { useEffect, useState } from "react";
import axios from "axios";
// import Post from "./post";
import "../App.css";
import Post1 from './post1';

function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setPosts(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
    <div className="main" style={{display:'flex' , justifyContent:'center' }}>
      <div className="container">
        <div className="posts" style={{display:'flex', flexDirection:'row' , flexWrap:'wrap', gap:'10px'}}>
          {isLoading && <div className="loader"></div>}
          {isError && <div className="error">Something went wrong!</div>}
          {!isLoading && !isError && posts.length === 0 && (
            <div className="no-posts">There are no posts.</div>
            )}
            {/* {<Post1 key={post.id} post={post}/>} */}
          {posts.map((post) => (
            <Post1 key={post.id} post={post}/>
          ))}
        </div>
      </div>
      </div>
    </>
  );
}

export default Home;

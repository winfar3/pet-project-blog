import "../../conponents/colors.scss";
import "./Blog.scss";

import React, { Component, useState, useEffect } from "react";
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

import { postCardData } from "../../Shared/projectData";
import { PostCard } from "./components/PostCard/PostCard";
import { AddPostForm } from "./components/AddPostForm/AddPostForm";
import { EditPostForm } from "./components/EditPostForm/EditPostForm";

const serverUrl = "https://61fc04453f1e34001792c787.mockapi.io/posts/";

let source;

export const Blog = () => {
  // state = {
  //   blogArr: JSON.parse(localStorage.getItem("blogPosts")) || postCardData,
  //   showAddForm: false,
  //   showEditForm: false,
  //   isPending: false,
  //   selectedPost: {},
  // };

  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [blogArr, setBlogArr] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});

  const getPosts = (props) => {
    if (!props) {
      // this.setState({
      //   isPending: true,
      // })
      setIsPending(true);
    }

    source = axios.CancelToken.source();
    let config = { cancelToken: source.token }

    axios.get(serverUrl, config)
    .then((response) => {
      // this.setState({
      //   blogArr: response.data,
      //   isPending: false,
      // })
      setBlogArr(response.data);
      setIsPending(false);
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const addNewBlogPost = (blogPost) => {
    /** old code */
    // const temp = [...this.state.blogArr];
    // temp.push(blogPost);

    // this.setState({
    //   blogArr: temp
    // });

    // this.setState({
    //   isPending: true,
    // });
    setIsPending(true);

    axios.post(serverUrl, blogPost)
      .then((response) => {
        console.log(`Post added ${response.data}`);
        getPosts();
      })
      .catch((err) => {
        console.log(err);
      });

    /** local code */
    // this.setState((state) => {
    //   const posts = [...state.blogArr];
    //   posts.push(blogPost);
    //   localStorage.setItem("blogPosts", JSON.stringify(posts));

    //   return {
    //     blogArr: posts
    //   }
    // });

  }

  const likePost = (postCardItem) => {
    /** old code */
    // const temp = [...this.state.blogArr];
    // temp[pos].liked = !temp[pos].liked;

    // this.setState({
    //   blogArr: temp
    // })

    // localStorage.setItem("blogPosts", JSON.stringify(temp))

    const temp = {...postCardItem};
    temp.liked = !temp.liked;
    let dontNeedReload = true;

    axios.put(`${serverUrl}${postCardItem.id}`, temp)
      .then((response) => {
        console.log(`Post changed ${response}`)
        getPosts(dontNeedReload);
      })
      .catch((err) => {
        console.log(err);
      })

    /** don't work */
    // this.setState((state) => {
    //   const temp = [...state.blogArr];
    //   temp[pos].liked = !temp[pos].liked;
    //   localStorage.setItem("blogPosts", JSON.stringify(temp));

    //   return {
    //     blogArr: temp,
    //   }
    // });
  }

  const editBlogPost = (editedPost) => {
    // this.setState({
    //   isPending: true,
    // });
    setIsPending(true);

    axios.put(`${serverUrl}${editedPost.id}`, editedPost)
      .then((response) => {
        console.log(`Post changed ${response}`)
        getPosts();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const deletePost = (blogPost) => {
    if (window.confirm(`Delete post ${blogPost.title}?`)) {

      // this.setState({
      //   isPending: true,
      // });
      setIsPending(true);
      
      axios.delete(`${serverUrl}${blogPost.id}`)
        .then((response) => {
          console.log("Delete", response.data);
          getPosts();
        })
        .catch((err) => {
          console.log(err);
        });
      
      /** local code */
      // const temp = [...this.state.blogArr];
      // temp.splice(pos, 1);

      // this.setState({
      //   blogArr: temp
      // });

      // localStorage.setItem("blogPosts", JSON.stringify(temp))
    }
  }

  const handleShowAddForm = () => {
    // this.setState({
    //   showAddForm: true,
    // });
    setShowAddForm(true);
  }

  const handleHideAddForm = () => {
    // this.setState({
    //   showAddForm: false,
    // });
    setShowAddForm(false);
  }
  
  const handleShowEditForm = () => {
    // this.setState({
    //   showEditForm: true,
    // });
    setShowEditForm(true);
  }

  const handleHideEditForm = () => {
    // this.setState({
    //   showEditForm: false,
    // });
    setShowEditForm(false);
  }

  const handleSelectPost = (blogPost) => {
    // this.setState({
    //   selectedPost: blogPost,
    // });
    setSelectedPost(blogPost);
  }

  const handleEscape = (e) => {
    if (e.key === "Escape" && setShowAddForm) {
      handleHideAddForm();
    } else if (e.key === "Escape" && setShowEditForm) {
      handleHideEditForm();
    }
  }

  // componentDidMount() {
  //   this.getPosts();
  //   window.addEventListener("keyup", this.handleEscape);
  // }

  // componentDidUpdate() {

  // }

  // componentWillUnmount() {
  //   window.removeEventListener("keyup", this.handleEscape);
    
  //   if (source) {
  //     source.cancel("Axios get canceled");
  //   }
  // }
  useEffect(() => {
    getPosts();
    window.addEventListener("keyup", handleEscape);

    return () => {
      window.removeEventListener("keyup", handleEscape);
      if (source) {
        source.cancel("Axios get canceled");
      }
    };
  }, []);

    const blogPosts = blogArr.map((postCardItem) => {
      return (
        <PostCard
          key={postCardItem.id}
          {...postCardItem}
          likePost={() => likePost(postCardItem)}
          editPost={() => editBlogPost(postCardItem)}
          handleShowEditForm={() => handleShowEditForm()}
          handleSelectPost={() => handleSelectPost(postCardItem)}
          deletePost={() => deletePost(postCardItem)}
        />
      );
    });

    return (
      <>
        <div className="addPostBtn">
          <button
            className="button"
            onClick={handleShowAddForm}
          >
            Add post
          </button>
        </div>
        {
          isPending && 
            <div className="overlay overlay_light">
              <CircularProgress 
                style={{'color': '#171717'}}
                className="CircularProgress"
              />
            </div>
        }
        {
          showAddForm &&
            <AddPostForm
              handleHideAddForm={handleHideAddForm}
              blogArr={setBlogArr}
              addNewBlogPost={addNewBlogPost}
            />
        }
        {
          showEditForm &&
            <EditPostForm 
              handleHideEditForm={handleHideEditForm}
              selectedPost={selectedPost}
              editBlogPost={editBlogPost}
            />
        }
        {blogPosts}
      </>
    );
}
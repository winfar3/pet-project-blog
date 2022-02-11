import "../../conponents/colors.scss";
import "./Blog.scss";

import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

import { postCardData } from "../../Shared/projectData";
import { PostCard } from "./components/PostCard/PostCard";
import { AddPostForm } from "./components/AddPostForm/AddPostForm";
import { EditPostForm } from "./components/EditPostForm/EditPostForm";
import { serverUrl } from "../../Shared/serverUrl";

let source;

export const Blog = (props) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [blogArr, setBlogArr] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});

  const getPosts = (props) => {
    if (!props) {
      setIsPending(true);
    }

    source = axios.CancelToken.source();
    let config = { cancelToken: source.token };

    axios
      .get(serverUrl, config)
      .then((response) => {
        setBlogArr(response.data);
        setIsPending(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addNewBlogPost = (blogPost) => {
    setIsPending(true);

    axios
      .post(serverUrl, blogPost)
      .then((response) => {
        console.log(`Post added ${response.data}`);
        getPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const likePost = (postCardItem) => {
    const temp = { ...postCardItem };
    temp.liked = !temp.liked;
    let dontNeedReload = true;

    axios
      .put(`${serverUrl}${postCardItem.id}`, temp)
      .then((response) => {
        console.log(`Post changed ${response}`);
        getPosts(dontNeedReload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editBlogPost = (editedPost) => {
    setIsPending(true);

    axios
      .put(`${serverUrl}${editedPost.id}`, editedPost)
      .then((response) => {
        console.log(`Post changed ${response}`);
        getPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePost = (blogPost) => {
    if (window.confirm(`Delete post ${blogPost.title}?`)) {
      setIsPending(true);

      axios
        .delete(`${serverUrl}${blogPost.id}`)
        .then((response) => {
          console.log("Delete", response.data);
          getPosts();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleShowAddForm = () => {
    setShowAddForm(true);
  };

  const handleHideAddForm = () => {
    setShowAddForm(false);
  };

  const handleShowEditForm = () => {
    setShowEditForm(true);
  };

  const handleHideEditForm = () => {
    setShowEditForm(false);
  };

  const handleSelectPost = (blogPost) => {
    setSelectedPost(blogPost);
  };

  const handleEscape = (e) => {
    if (e.key === "Escape" && setShowAddForm) {
      handleHideAddForm();
    } else if (e.key === "Escape" && setShowEditForm) {
      handleHideEditForm();
    }
  };

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
        isAdmin={props.isAdmin}
      />
    );
  });

  return (
    <>
      {props.isAdmin && (
        <div className="addPostBtn">
          <button className="button" onClick={handleShowAddForm}>
            Add post
          </button>
        </div>
      )}
      {isPending && (
        <div className="overlay overlay_light">
          <CircularProgress
            style={{ color: "#171717" }}
            className="CircularProgress"
          />
        </div>
      )}
      {showAddForm && (
        <AddPostForm
          handleHideAddForm={handleHideAddForm}
          blogArr={setBlogArr}
          addNewBlogPost={addNewBlogPost}
        />
      )}
      {showEditForm && (
        <EditPostForm
          handleHideEditForm={handleHideEditForm}
          selectedPost={selectedPost}
          editBlogPost={editBlogPost}
        />
      )}
      {blogPosts}
    </>
  );
};

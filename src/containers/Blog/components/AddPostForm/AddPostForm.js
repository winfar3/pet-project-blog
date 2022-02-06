import { useThemeWithoutDefault } from "@mui/system";
import React, { Component, useEffect, useState } from "react";
import "./AddPostForm.scss";

export const AddPostForm = (props) => {
  // state = {
  //     postTitle: '',
  //     postDescription: '',
  // }

  // const [postTitle, setPostTitle] = useState(props.selectedPost.title);
  // const [postTitle, setPostTitle] = useState(props.selectedPost.title);
  // const [postDescription, setPostDescription] = useState(
  //   props.selectedPost.description
  // );
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");

  useEffect(() => {
    const handleEnter = (e) => {
      if (e.key === "Enter") {
        createPost(e);
      }
    };

    window.addEventListener("keyup", handleEnter);

    return () => window.removeEventListener("keyup", handleEnter);
  });

  // componentDidMount() {
  //     window.addEventListener("keyup", this.handleEnter);
  // }

  // componentWillUnmount() {
  //     window.removeEventListener("keyup", this.handleEnter);
  // }

  const handlePostTitleChange = (e) => {
    // this.setState({
    //     postTitle: e.target.value
    // })
    setPostTitle(e.target.value);
  };

  const handlePostDescChange = (e) => {
    // this.setState({
    //     postDescription: e.target.value
    // })
    setPostDescription(e.target.value);
  };

  const createPost = (e) => {
    e.preventDefault();
    const post = {
      //   id: this.props.blogArr.length + 1,
      title: postTitle,
      description: postDescription,
      liked: false,
    };

    props.addNewBlogPost(post);
    props.handleHideAddForm();

    // console.log(post);
  };

  const handleHideAddForm = props.handleHideAddForm;
//   const createPost = this.createPost;

  return (
    <>
      <form action="" className="addPostForm" onSubmit={createPost}>
        <h2 className="uppercase">Create new post</h2>
        <div>
          <input
            type="text"
            name="postTitle"
            placeholder="Title"
            autoComplete="off"
            value={postTitle}
            onChange={handlePostTitleChange}
            required
          />
        </div>
        <div>
          <textarea
            name="postDescription"
            rows="15"
            cols="60"
            placeholder="Description"
            value={postDescription}
            onChange={handlePostDescChange}
            required
          />
        </div>
        <div className="addPostForm__buttons">
          <button type="submitt" className="button">
            Add post
          </button>
          <button type="button" className="button" onClick={handleHideAddForm}>
            Cancel
          </button>
        </div>
      </form>
      <div className="overlay" onClick={handleHideAddForm}></div>
    </>
  );
};

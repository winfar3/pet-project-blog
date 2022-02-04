import "../../conponents/colors.scss";
import "./Blog.scss";

import React, { Component } from "react";
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

import { postCardData } from "../../Shared/projectData";
import { PostCard } from "./components/PostCard/PostCard";
import { AddPostForm } from "./components/AddPostForm/AddPostForm";
import { EditPostForm } from "./components/EditPostForm/EditPostForm";

const serverUrl = "https://61fc04453f1e34001792c787.mockapi.io/posts/";

export class Blog extends Component {
  state = {
    blogArr: JSON.parse(localStorage.getItem("blogPosts")) || postCardData,
    showAddForm: false,
    showEditForm: false,
    isPending: false,
    selectedPost: {},
  };

  getPosts = () => {
    // this.setState({
    //   isPending: true,
    // })
    axios.get(serverUrl)
    .then((response) => {
      this.setState({
        blogArr: response.data,
        isPending: false,
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }

  addNewBlogPost = (blogPost) => {
    /** old code */
    // const temp = [...this.state.blogArr];
    // temp.push(blogPost);

    // this.setState({
    //   blogArr: temp
    // });

    this.setState({
      isPending: true,
    });

    axios.post(serverUrl, blogPost)
      .then((response) => {
        console.log(`Post added ${response.data}`);
        this.getPosts();
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

  likePost = postCardItem => {
    /** old code */
    // const temp = [...this.state.blogArr];
    // temp[pos].liked = !temp[pos].liked;

    // this.setState({
    //   blogArr: temp
    // })

    // localStorage.setItem("blogPosts", JSON.stringify(temp))

    const temp = {...postCardItem};
    temp.liked = !temp.liked;

    axios.put(`${serverUrl}${postCardItem.id}`, temp)
      .then((response) => {
        console.log(`Post changed ${response}`)
        this.getPosts();
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

  editBlogPost = (editedPost) => {
    this.setState({
      isPending: true,
    });

    axios.put(`${serverUrl}${editedPost.id}`, editedPost)
      .then((response) => {
        console.log(`Post changed ${response}`)
        this.getPosts();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  deletePost = (blogPost) => {
    if (window.confirm(`Delete post ${blogPost.title}?`)) {

      this.setState({
        isPending: true,
      });
      
      axios.delete(`${serverUrl}${blogPost.id}`)
        .then((response) => {
          console.log("Delete", response.data);
          this.getPosts();
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

  handleShowAddForm = () => {
    this.setState({
      showAddForm: true,
    });
  }

  handleHideAddForm = () => {
    this.setState({
      showAddForm: false,
    });
  }
  
  handleShowEditForm = () => {
    this.setState({
      showEditForm: true,
    });
  }

  handleHideEditForm = () => {
    this.setState({
      showEditForm: false,
    });
  }

  handleSelectPost = (blogPost) => {
    this.setState({
      selectedPost: blogPost,
    });
  }

  handleEscape = (e) => {
    if (e.key === "Escape" && this.state.showAddForm) {
      this.handleHideAddForm();
    } else if (e.key === "Escape" && this.state.showEditForm) {
      this.handleHideEditForm();
    }
  }

  componentDidMount() {
    this.getPosts();
    window.addEventListener("keyup", this.handleEscape);
  }

  componentDidUpdate() {

  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleEscape);
  }

  render() {
    const blogPosts = this.state.blogArr.map((postCardItem, pos) => {
      return (
        <PostCard
          key={postCardItem.id}
          {...postCardItem}
          likePost={() => this.likePost(postCardItem)}
          editPost={() => this.editPost(postCardItem)}
          handleShowEditForm={() => this.handleShowEditForm()}
          handleSelectPost={() => this.handleSelectPost(postCardItem)}
          deletePost={() => this.deletePost(postCardItem)}
        />
      );
    });
    return (
      <>
        <div className="addPostBtn">
          <button
            className="button"
            onClick={this.handleShowAddForm}
          >
            Add post
          </button>
        </div>
        {
          this.state.isPending && 
            <div className="overlay overlay_light">
              <CircularProgress 
                style={{'color': '#171717'}}
                className="CircularProgress"
              />
            </div>
        }
        {
          this.state.showAddForm &&
            <AddPostForm
              handleHideAddForm={this.handleHideAddForm}
              blogArr={this.state.blogArr}
              addNewBlogPost={this.addNewBlogPost}
            />
        }
        {
          this.state.showEditForm &&
            <EditPostForm 
              handleHideEditForm={this.handleHideEditForm}
              selectedPost={this.state.selectedPost}
              editBlogPost={this.editBlogPost}
            />
        }
        {blogPosts}
      </>
    );
  }
}
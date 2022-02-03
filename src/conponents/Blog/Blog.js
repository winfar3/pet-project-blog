import "./Blog.scss";

import React, { Component } from "react";
import axios from 'axios';

import { postCardData } from "../../Shared/projectData";
import { PostCard } from "./components/PostCard/PostCard";
import { AddPostForm } from "./components/AddPostForm/AddPostForm";

export class Blog extends Component {
  state = {
    blogArr: JSON.parse(localStorage.getItem("blogPosts")) || postCardData,
    showAddForm: false,
    isPending: false,
  };

  likePost = pos => {
    const temp = [...this.state.blogArr];
    temp[pos].liked = !temp[pos].liked;

    this.setState({
      blogArr: temp
    })

    localStorage.setItem("blogPosts", JSON.stringify(temp))

    // this.setState((state) => {
    //   const temp = [...state.blogArr];
    //   temp[pos].liked = !temp[pos].liked;
    //   localStorage.setItem("blogPosts", JSON.stringify(temp));

    //   return {
    //     blogArr: temp,
    //   }
    // });
  }

  deletePost = (blogPost) => {
    if (window.confirm(`Delete post ${blogPost.title}?`)) {
      
      axios.delete(`https://61fc04453f1e34001792c787.mockapi.io/posts/${blogPost.id}`)
        .then((response) => {
          console.log("Delete", response.data);
          this.getPosts();
        })
        .catch((err) => {
          console.log(err);
        })
      
      /*local code*/
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
    })
  }

  handleHideAddForm = () => {
    this.setState({
      showAddForm: false,
    })
  }

  handleEscape = (e) => {
    if (e.key === "Escape" && this.state.showAddForm) {
      this.handleHideAddForm();
    }
  }

  addNewBlogPost = (blogPost) => {
    // const temp = [...this.state.blogArr];
    // temp.push(blogPost);

    // this.setState({
    //   blogArr: temp
    // });

    this.setState((state) => {
      const posts = [...state.blogArr];
      posts.push(blogPost);
      localStorage.setItem("blogPosts", JSON.stringify(posts));

      return {
        blogArr: posts
      }
    });

  }

  getPosts = () => {
    this.setState({
      isPending: true,
    })
    axios.get("https://61fc04453f1e34001792c787.mockapi.io/posts")
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
          likePost={() => this.likePost(pos)}
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
          this.state.isPending && <h2>Wait please</h2>
        }
        {
          this.state.showAddForm ?
            <AddPostForm
              handleHideAddForm={this.handleHideAddForm}
              blogArr={this.state.blogArr}
              addNewBlogPost={this.addNewBlogPost}
            />
            : null
        }
        {blogPosts}
      </>
    );
  }
}
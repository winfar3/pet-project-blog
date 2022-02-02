import "./Blog.scss";

import React, { Component } from "react";

import { postCardData } from "../../Shared/projectData";
import { PostCard } from "./components/PostCard";

export class Blog extends Component {
  state = {
    blogArr: JSON.parse(localStorage.getItem("blogPosts")) || postCardData
  };

  likePost = pos => {
    const temp = [...this.state.blogArr];
    temp[pos].liked = !temp[pos].liked;
    
    this.setState({
      blogArr: temp
    })

    localStorage.setItem("blogPosts", JSON.stringify(temp))
  }

  deletePost = pos => {
    if(window.confirm(`Delete post ${this.state.blogArr[pos].title}?`)) {
      const temp = [...this.state.blogArr];
      temp.splice(pos, 1);
  
      this.setState({
        blogArr: temp
      });

      localStorage.setItem("blogPosts", JSON.stringify(temp))
    }
  }

  render() {
    const blogPosts = this.state.blogArr.map((postCardItem, pos) => {
      return (
          <PostCard 
            key={postCardItem.id}
            {...postCardItem} 
            likePost={() => this.likePost(pos)}
            deletePost={() => this.deletePost(pos)}
          />
      );
    });
    return (
      <>
        {blogPosts}
      </>
    );
  }
}

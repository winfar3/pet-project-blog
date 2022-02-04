import { useThemeWithoutDefault } from "@mui/system";
import React, { Component } from "react";
import "./AddPostForm.scss";

export class AddPostForm extends Component {
    state = {
        postTitle: '',
        postDescription: '',
    }

    componentDidMount() {
        window.addEventListener("keyup", this.handleEnter);
    }
    
    componentWillUnmount() {
        window.removeEventListener("keyup", this.handleEnter);
    }

    handlePostTitleChange = e => {
        this.setState({
            postTitle: e.target.value
        })
    }

    handlePostDescChange = e => {
        this.setState({
            postDescription: e.target.value
        })
    }

    handleEnter = (e) => {
        if (e.key === "Enter") {
            this.createPost(e);
        }
    }

    createPost = (e) => {
        e.preventDefault();
        const post = {
        //   id: this.props.blogArr.length + 1,
          title: this.state.postTitle,
          description: this.state.postDescription,
          liked: false,
        }
    
        this.props.addNewBlogPost(post);
        this.props.handleHideAddForm();

        console.log(post);
      }

    render() {
        const handleHideAddForm = this.props.handleHideAddForm;
        const createPost = this.createPost;

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
                            value={this.state.postTitle}
                            onChange={this.handlePostTitleChange}
                            required
                        />
                    </div>
                    <div>
                        <textarea
                            name="postDescription"
                            rows="15"
                            cols="60"
                            placeholder="Description"
                            value={this.state.postDescription}
                            onChange={this.handlePostDescChange}
                            required
                        />
                    </div>
                    <div className="addPostForm__buttons">
                        <button 
                            type="submitt" 
                            className="button"
                        >
                            Add post
                        </button>
                        <button 
                            type="button" 
                            className="button"
                            onClick={handleHideAddForm}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
                <div 
                    className="overlay"
                    onClick={handleHideAddForm}
                ></div>
            </>
        );
    }
}

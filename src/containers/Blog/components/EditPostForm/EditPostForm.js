import { useThemeWithoutDefault } from "@mui/system";
import React, { Component } from "react";
import "./EditPostForm.scss";

/** TODO refactor, use one form */

export class EditPostForm extends Component {
    state = {
        postTitle: this.props.selectedPost.title,
        postDescription: this.props.selectedPost.description,
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
            this.savePost(e);
        }
    }

    savePost = (e) => {
        e.preventDefault();
        const post = {
          id: this.props.selectedPost.id,
          title: this.state.postTitle,
          description: this.state.postDescription,
          liked: this.props.selectedPost.liked,
        }
    
        this.props.editBlogPost(post);
        this.props.handleHideEditForm();

        console.log(post);
      }

    render() {
        const handleHideEditForm = this.props.handleHideEditForm;
        const savePost = this.savePost;

        return (
            <>
                <form action="" className="editPostForm" onSubmit={this.savePost}>
                    <h2 className="uppercase">Edit post</h2>
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
                    <div className="editPostForm__buttons">
                        <button 
                            type="submitt" 
                            className="button"
                        >
                            Edit post
                        </button>
                        <button 
                            type="button" 
                            className="button"
                            onClick={handleHideEditForm}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
                <div 
                    className="overlay"
                    onClick={handleHideEditForm}
                ></div>
            </>
        );
    }
}

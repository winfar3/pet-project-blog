import { useThemeWithoutDefault } from "@mui/system";
import React, { Component, useEffect, useState } from "react";
import "./EditPostForm.scss";

/** TODO refactor, use one form */

export const EditPostForm = (props) => {

    const [postTitle, setPostTitle] = useState(props.selectedPost.title);
    const [postDescription, setPostDescription] = useState(props.selectedPost.description);

    useEffect(() => {
        const handleEnter = (e) => {
            if (e.key === "Enter") {
                savePost(e);
            }
        };

        window.addEventListener("keyup", handleEnter);

        return () => window.removeEventListener("keyup", handleEnter);
    }, [props]);

    // const componentDidMount = () => {
    //     window.addEventListener("keyup", this.handleEnter);
    // }

    // const componentWillUnmount = () => {
    //     window.removeEventListener("keyup", this.handleEnter);
    // }

    const handlePostTitleChange = (e) => {
        // this.setState({
        //     postTitle: e.target.value
        // })
        setPostTitle(e.target.value);
    }

    const handlePostDescChange = (e) => {
        // this.setState({
        //     postDescription: e.target.value
        // })
        setPostDescription(e.target.value);
    }

    const savePost = (e) => {
        e.preventDefault();
        const post = {
            id: props.selectedPost.id,
            title: postTitle,
            description: postDescription,
            liked: props.selectedPost.liked,
        }

        props.editBlogPost(post);
        props.handleHideEditForm();

        // console.log(post);
    }

    const handleHideEditForm = props.handleHideEditForm;
    // const savePost = savePost;

    return (
        <>
            <form action="" className="editPostForm" onSubmit={savePost}>
                <h2 className="uppercase">Edit post</h2>
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
            <div className="overlay" onClick={handleHideEditForm}></div>
        </>
    );
}

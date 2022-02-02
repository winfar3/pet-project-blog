import "./AddPostForm.scss";

export function AddPostForm(props) {
    return (
        <>
            <form action="" className="addPostForm">
                <h2 className="uppercase">Create new post</h2>
                <div>
                    <input type="text" name="postTitle" placeholder="Title" />
                </div>
                <div>
                    <textarea
                        name="postDescription"
                        rows="15"
                        cols="60"
                        placeholder="Description"
                    />
                </div>
                <div className="addPostForm__buttons">
                    <button 
                        type="button" 
                        className="button"
                        onClick={props.handleHideAddForm}
                    >
                        Add post
                    </button>
                    <button 
                        type="button" 
                        className="button"
                        onClick={props.handleHideAddForm}
                    >
                        Cancel
                    </button>
                </div>
            </form>
            <div 
                className="overlay"
                onClick={props.handleHideAddForm}
            ></div>
        </>
    );
}

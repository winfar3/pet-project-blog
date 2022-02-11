import "./PostPage.scss";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { serverUrl } from "../../../../Shared/serverUrl";

/** TODO refactor and redesing */
export function PostPage(props) {
  const { postId } = useParams();
  const [post, setPost] = useState({})
  const heartFill = 
    post.liked ? "crimson" : "black" 
  
  useEffect(() => {
    if (postId) {
      let source = axios.CancelToken.source();
      let config = { cancelToken: source.token };

      axios
        .get(serverUrl + postId, config)
        .then((response) => {
          setPost(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [postId, setPost]);

  const showEditForm = () => {
    props.handleSelectPost();
    props.handleShowEditForm();
  };

  return (
    // <article className={props.id % 7 === 0 ? "postPage postPage_big" : "postPage postPage_medium"} >
    <article className={"postPage postPage_big"}>
      <div className="postPage__image">
        <a href="#">
          <img
            src={post.imageUrl}
            className={
            //   props.isPositionTop
            //     ? "postPage__img postPage__img_top": 
            "postPage__img"
            }
          />
        </a>
      </div>
      <a href="#" className="postPage__category uppercase">
        {post.category}
      </a>
      <h2 className="postPage__title">
        <Link to={`/blog/${post.id}`}>{post.title}</Link>
      </h2>
      <div className="postPage__info">
        <p className="postPage__date">{post.date}</p>
        <a href="#" className="postPage__author">
          <span>By</span> {post.author}
        </a>
      </div>
      <div className="postPage__buttons">
        <button onClick={props.likePost}>
          <FavoriteIcon className="like-image" style={{ fill: heartFill }} />
        </button>
        {props.isAdmin && (
          <>
            <button onClick={() => showEditForm()}>
              <EditIcon />
            </button>
            <button onClick={post.deletePost}>
              <DeleteIcon />
            </button>
          </>
        )}
      </div>
        <p className="postPage__desc">{post.description}</p>
    </article>
  );
}

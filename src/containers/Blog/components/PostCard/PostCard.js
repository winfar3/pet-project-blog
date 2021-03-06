import "./PostCard.scss";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { serverUrl } from "../../../../Shared/serverUrl";

/** TODO refactor, use own component for single post */
export function PostCard(props) {
  
  const showEditForm = () => {
    props.handleSelectPost();
    props.handleShowEditForm();
  };

  const { postId } = useParams();
  const [post, setPost] = useState({})
  const heartFill = 
    postId ? 
      post.liked ? 
        "crimson" : "black" 
    : props.liked ? 
        "crimson" : "black";
  
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

  return (
    // <article className={props.id % 7 === 0 ? "postcard postcard_big" : "postcard postcard_medium"} >
    <article className={"postcard postcard_medium"}>
      <div className="postcard__image">
        <a href="#">
          <img
            src={postId ? post.imageUrl : props.imageUrl}
            className={
              props.isPositionTop
                ? "postcard__img postcard__img_top"
                : "postcard__img"
            }
          />
        </a>
      </div>
      <a href="#" className="postcard__category uppercase">
        {postId ? post.category : props.category}
      </a>
      <h2 className="postcard__title">
        <Link to={`/blog/${postId ? post.id : props.id}`}>{postId ? post.title : props.title}</Link>
      </h2>
      <div className="postcard__info">
        <p className="postcard__date">{postId ? post.date : props.date}</p>
        <a href="#" className="postcard__author">
          <span>By</span> {postId ? post.author : props.author}
        </a>
      </div>
      <div className="postcard__buttons">
        <button onClick={props.likePost}>
          <FavoriteIcon className="like-image" style={{ fill: heartFill }} />
        </button>
        {props.isAdmin && (
          <>
            <button onClick={() => showEditForm()}>
              <EditIcon />
            </button>
            <button onClick={props.deletePost}>
              <DeleteIcon />
            </button>
          </>
        )}
      </div>
      {props.cardSize === "big" && (
        <p className="postcard__desc">{props.description}</p>
      )}
    </article>
  );
}

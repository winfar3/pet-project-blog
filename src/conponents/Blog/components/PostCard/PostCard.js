import "./PostCard.scss";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';

export function PostCard(props) {
    const heartFill = props.liked ? "crimson" : "black";

    return (
        // <article className={props.id % 7 === 0 ? "postcard postcard_big" : "postcard postcard_medium"} >
        <article className={"postcard postcard_medium"} >
            <div className="postcard__image">
                <a href="#"><img src={props.imageUrl} className={props.isPositionTop ? "postcard__img postcard__img_top" : "postcard__img"} /></a>
            </div>
            <a href="#" className="postcard__category uppercase">{props.category}</a>
            <h2 className="postcard__title"><a href="#">{props.title}</a></h2>
            <div className="postcard__info">
                <p className="postcard__date">{props.date}</p>
                <a href="#" className="postcard__author"><span>By</span> {props.author}</a>
            </div>
            <div className="postcard__buttons">
                <button 
                    onClick={props.likePost}
                >
                    <FavoriteIcon 
                        className="like-image" 
                        style={{fill: heartFill}}
                    />
                    
                </button>
                <button
                    onClick={props.deletePost}
                >
                    <DeleteIcon />
                </button>
            </div>
            {props.cardSize === "big" && <p className="postcard__desc">{props.description}</p>}
        </article>
    );
}
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { likePost, commentPost, repostPost, savePost } from '../redux/actions';
import './Styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Post = ({ post }) => {
  const [isCommenting, setIsCommenting] = useState(false);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const handleLike = () => dispatch(likePost(post.hash));
  const handleComment = () => setIsCommenting((prev) => !prev);
  const handleRepost = () => dispatch(repostPost(post.hash));
  const handleSave = () => dispatch(savePost(post.hash));

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      dispatch(commentPost(post.hash, comment));
      setComment('');
      setIsCommenting(false);
    }
  };

  return (
    <div className="post">
      <div className="profile-container">
        <img src={post.author.pfp} alt="Profile" className="profile-pic" />
        <div className="username-container">
          <span className="username">@{post.author.username}</span>
        </div>
        <span className="time-ago">
          <i className="fa-solid fa-repeat"></i>{' '}
          {new Date(post.timestamp * 1000).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })}
        </span>
        <span className="more-options">•••</span>
      </div>
      <p className="question">{post.caption}</p>
      {post?.images?.map((img, index) => (
        <img
          key={index}
          src={img.url}
          alt={img.caption}
          className="post-image"
        />
      ))}
      <div className="engagement-container">
        <span className="engagement">
          <i
            className={`fa-solid fa-heart post-button-icon ${
              post.isLiked ? 'liked' : ''
            }`}
            onClick={handleLike}
          ></i>
          <span className="engagement-stats">{post.likes.count}</span>
        </span>

        <span className="comments-reposts">
          {post.comments.count} comments • {post.reposts} reposts
        </span>
      </div>
      <div className="post-interactions">
        <div className="post-button" onClick={handleLike}>
          <i className="fa-regular fa-heart post-button-icon"></i> Like
        </div>
        <div className="post-button" onClick={handleComment}>
          <i className="fa-regular fa-comment post-button-icon"></i> Comment
        </div>
        <div className="post-button" onClick={handleRepost}>
          <i className="fa-solid fa-repeat post-button-icon"></i> Repost
        </div>
        <div className="post-button" onClick={handleSave}>
          <i
            class={`${
              post.isSaved ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark'
            } post-button-icon`}
            onClick={handleSave}
          ></i>
          Save
        </div>
      </div>
      {isCommenting && (
        <div className="comment-input-container">
          <img src={post.author.pfp} alt="Profile" className="profile-pic" />
          <input
            type="text"
            placeholder="Add a comment..."
            className="comment-input"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="comment-submit-btn"
            onClick={handleCommentSubmit}
            disabled={!comment.trim()}
          >
            Comment
          </button>
        </div>
      )}
      <div className="user-comment">
        <img
          src={post.comments.comment.author.pfp}
          alt="Profile Picture"
          className="profile-pic"
        />
        <div className="comment-details">
          <span className="user-name">
            {post.comments.comment.author.display_name}
          </span>
          <span className="comment-time">
            {' '}
            {new Date(
              post.comments.comment.timestamp * 1000
            ).toLocaleDateString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })}
          </span>
          <p className="comment-text">{post.comments.comment.text}</p>
        </div>
      </div>
    </div>
  );
};

export default Post;

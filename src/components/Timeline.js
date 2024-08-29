import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Post from './Post';
import { fetchPosts } from '../redux/actions';
import './Styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Timeline = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    axios
      .get('https://api.socialcontinent.xyz/api/v1/post/suggested')
      .then((response) => dispatch(fetchPosts(response.data)))
      .catch((error) => console.error('Error fetching posts:', error));
  }, [dispatch]);

  return (
    <div className="timeline-container">
      <div className="header">
        <img src="public/images/logo.png" alt="SOCON" className="logo" />
        <div className="icons">
          <i className="fas fa-comment-dots"></i>
          <i className="fas fa-bell"></i>
        </div>
      </div>
      <div style={{ paddingTop: '30px' }}>
        {posts.map((post) => (
          <Post key={post.hash} post={post} />
        ))}
      </div>
      <div className="footer">
        <div className="footer-icons">
          <i className="fas fa-home"></i>
          <i className="fas fa-search"></i>
          <i className="fas fa-plus-circle"></i>
          <i className="fas fa-user"></i>
        </div>
      </div>
    </div>
  );
};

export default Timeline;

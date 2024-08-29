import {
  FETCH_POSTS,
  LIKE_POST,
  COMMENT_POST,
  REPOST_POST,
  SAVE_POST,
} from './actions';

const initialState = {
  posts: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return { ...state, posts: action.payload };
    case LIKE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.hash === action.payload
            ? { ...post, likes: { ...post.likes, count: post.likes.count + 1 } }
            : post
        ),
      };
    case COMMENT_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.hash === action.payload.postId
            ? {
                ...post,
                comments: { ...post.comments, count: post.comments.count + 1 },
              }
            : post
        ),
      };
    case REPOST_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.hash === action.payload
            ? { ...post, reposts: post.reposts + 1 }
            : post
        ),
      };
    case SAVE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.hash === action.payload
            ? { ...post, isSaved: !post.isSaved }
            : post
        ),
      };
    default:
      return state;
  }
};

export default rootReducer;

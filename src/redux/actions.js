export const FETCH_POSTS = 'FETCH_POSTS';
export const LIKE_POST = 'LIKE_POST';
export const COMMENT_POST = 'COMMENT_POST';
export const REPOST_POST = 'REPOST_POST';
export const SAVE_POST = 'SAVE_POST';

export const fetchPosts = (posts) => ({
  type: FETCH_POSTS,
  payload: posts,
});

export const likePost = (postId) => ({
  type: LIKE_POST,
  payload: postId,
});

export const commentPost = (postId, comment) => ({
  type: COMMENT_POST,
  payload: { postId, comment },
});

export const repostPost = (postId) => ({
  type: REPOST_POST,
  payload: postId,
});

export const savePost = (postId) => ({
  type: SAVE_POST,
  payload: postId,
});

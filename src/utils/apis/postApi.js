import request from './common';
import { API_METHOD } from 'utils/constants/apiMethods';
const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
const channelId = '62a04aa2703fdd3a82b4e66e';

/* 
  특정 채널의 포스트 목록을 모두 불러온다.
  Response: Post[]
*/
export const getPosts = () => {
  return request({
    method: API_METHOD.GET,
    url: `${PROXY}/posts/channel/${channelId}`,
  });
};

/* 
  특정 채널의 포스트 목록을 부분적으로 불러온다.
  Response: Post[]
*/
export const getPostsPart = ({ offset, limit }) => {
  return request({
    method: API_METHOD.GET,
    url: `${PROXY}/posts/channel/${channelId}`,
    params: {
      offset,
      limit,
    },
  });
};

/* 
  특정 사용자의 포스트 목록을 불러온다. 
  Response: Post[] 
*/
export const getUserPosts = (userId) => {
  return request({
    method: API_METHOD.GET,
    url: `${PROXY}/posts/author/${userId}`,
  });
};

/*
  특정 포스트의 정보를 불러온다. 
  Response: Post
*/
export const getPostData = (postId) => {
  return request({
    method: API_METHOD.GET,
    url: `${PROXY}/posts/${postId}`,
  });
};

/* 
  특정 채널에 포스트를 작성한다.
  : FormData를 전송하는 것이 필요. 아래와 같이 FormData로 변환 후 전송한다. (테스트 필요)
*/
export const addPost = (token, data) => {
  const submitData = { ...data, meta: JSON.stringify(data.meta) };
  const formData = new FormData();
  Object.keys(submitData).forEach((key) => formData.append(key, submitData[key]));
  formData.append('channelId', channelId);

  return request({
    method: API_METHOD.POST,
    url: `${PROXY}/posts/create`,
    headers: {
      'Content-Type': `multipart/form-data`, // 이미지 전송을 위함
      Authorization: `Bearer ${token}`,
    },
    data: formData,
  });
};

/*
  내가 작성한 포스트를 수정한다. 
  FormData를 전송하는 것이 필요. 아래와 같이 FormData로 변환 후 전송한다. (테스트 필요)
*/
export const updatePost = (token, data) => {
  const submitData = { ...data, meta: JSON.stringify(data.meta) };
  const formData = new FormData();
  Object.keys(submitData).forEach((key) => formData.append(key, submitData[key]));
  formData.append('channelId', channelId);

  return request({
    method: API_METHOD.PUT,
    url: `${PROXY}/posts/update`,
    headers: {
      'Content-Type': `multipart/form-data`,
      Authorization: `Bearer ${token}`,
    },
    data: formData,
  });
};

/* 
  내가 작성한 포스트를 삭제한다. 
*/
export const deletePost = (token, postId) => {
  return request({
    method: API_METHOD.DELETE,
    url: `${PROXY}/posts/delete`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      id: postId,
    },
  });
};

/* 
  특정 포스트에 좋아요한다. 
  Response: Like
*/
export const setLike = (token, postId) => {
  return request({
    method: API_METHOD.POST,
    url: `${PROXY}/likes/create`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      postId,
    },
  });
};

/* 
  특정 포스트에 좋아요한 것을 취소한다. 
  Response: Like
*/
export const setDislike = (token, postId) => {
  return request({
    method: API_METHOD.DELETE,
    url: `${PROXY}/likes/delete`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      id: postId,
    },
  });
};

/* 
  특정 포스트에 나의 댓글을 작성한다. 
  Response: Comment
*/
export const addComment = (token, postId, comment) => {
  return request({
    method: API_METHOD.POST,
    url: `${PROXY}/comments/create`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      comment,
      postId,
    },
  });
};

/* 
  특정 포스트에 작성한 나의 댓글을 삭제한다. 
  Response: Comment
*/
export const deleteComment = (token, postId) => {
  return request({
    method: API_METHOD.DELETE,
    url: `${PROXY}/comments/delete`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      id: postId,
    },
  });
};

/* 
  특정 포스트를 검색한다.
*/

export const searchTag = (keyword) => {
  return request({
    method: API_METHOD.GET,
    url: `${PROXY}/search/all/%23${keyword}`,
  });
};

export const searchUser = (keyword) => {
  return request({
    method: API_METHOD.GET,
    url: `${PROXY}/search/users/${keyword}`,
  });
};

import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 1000,
});

export const listLoader = async () => {
  const response = await api.get("/posts");
  return response.data;
};

export const postLoader = async (postId: string) => {
  const [content, comments] = await Promise.all([
    api.get(`/posts/${postId}`),
    api.get(`/posts/${postId}/comments`),
  ]);

  return {
    content: content.data,
    comments: comments.data,
  };
};

export const albumListLoader = async () => {
  const response = await api.get("/albums");
  return response.data;
};

export const albumLoader = async (userId: string) => {
  const response = await api.get(`/albums/${userId}/photos`);
  return response.data;
};

export const aboutLoader = async (userId: string) => {
  const [personalInfo, userPosts] = await Promise.all([
    api.get(`/users/${userId}`),
    api.get(`/users/${userId}/posts`),
  ]);

  return { personalInfo: personalInfo.data, userPosts: userPosts.data };
};

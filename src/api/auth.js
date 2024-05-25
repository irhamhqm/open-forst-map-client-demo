import axios from "axios";
import axiosAuthInstance from "../util/axios";

const baseUrl = import.meta.env.VITE_API_URL;

export const signIn = async (payload) => {
  console.log("payload: ", payload);
  const res = await axios.post(`${baseUrl}/api/auth/login`, payload);

  return res.data;
};

export const getIsMe = async () => {
  const response = await axiosAuthInstance().get(`${baseUrl}/api/auth/me`);

  return response.data;
};

export const signUp = async (payload) => {
  const res = await axios.post(`${baseUrl}/api/auth/register`, payload);

  return res.data;
};

export const forgotPassword = async (payload) => {
  const res = await axios.post(`${baseUrl}/api/auth/forgot_password`, payload);

  return res.data;
};

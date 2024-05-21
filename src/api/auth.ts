import { SignInPayload, SignInResponse, IsMeResponse, SignUpPayload, SignUpResponse} from "../types/auth";
import axios from "axios";
import axiosAuthInstance from "../util/axios";

const baseUrl = import.meta.env.VITE_API_URL;

export const signIn: (
    payload: SignInPayload
  ) => Promise<SignInResponse> = async (payload) => {
    console.log('payload: ', payload)
    const res = await axios.post(`${baseUrl}/api/auth/login`, payload);
  
    return res.data;
  };

export const getIsMe: () => Promise<IsMeResponse> = async () => {
const response = await axiosAuthInstance().get(`${baseUrl}/api/auth/me`);

return response.data;
};

export const signUp: (
  payload: SignUpPayload
) => Promise<SignUpResponse> = async (payload) => {
  const res = await axios.post(`${baseUrl}/api/auth/register`, payload);

  return res.data;
};
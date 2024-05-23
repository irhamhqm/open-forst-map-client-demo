import { 
  SignInPayload, 
  SignInResponse, 
  IsMeResponse, 
  SignUpPayload, 
  SignUpResponse,
  ForgotPasswordPayload,
  ForgotPasswordResponse
} from "../types/auth";
import axios from "axios";
import axiosAuthInstance from "../util/axios";

const baseUrl = import.meta.env.VITE_API_URL;

export const signIn: (
    payload: SignInPayload
  ) => Promise<SignInResponse> = async (payload) => {
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

export const forgotPassword: (
  payload: ForgotPasswordPayload
) => Promise<ForgotPasswordResponse> = async (payload) => {
  const res = await axios.post(`${baseUrl}/api/auth/forgot_password`, payload);

  return res.data;
};
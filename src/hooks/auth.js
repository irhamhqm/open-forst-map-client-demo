import { useMutation, useQuery } from "@tanstack/react-query";
import { signIn, getIsMe, signUp, forgotPassword } from "../api/auth";

export const useSignIn = () => {
    return useMutation({
      mutationFn: (payload) => signIn(payload),
    });
  };

  export const useGetIsMe = (isSignInSuccess, token) => {
    const now = new Date();
    const currentTime = now.toLocaleTimeString();
    
    return useQuery({
      queryKey: ["useGetIsMe", token, currentTime],
      queryFn: () => getIsMe(),
      select: (response) => response,
      enabled: isSignInSuccess,
    });
  };

  export const useSignUp = () => {
    return useMutation({
      mutationKey: ["signup"],
      mutationFn: (payload) => signUp(payload),
    });
  };

  export const useForgotPassword = () => {
    return useMutation({
      mutationFn: (payload) => forgotPassword(payload),
    });
  };
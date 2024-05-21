import { useMutation, useQuery } from "@tanstack/react-query";
import { signIn, getIsMe } from "../api/auth";

export const useSignIn = () => {
    return useMutation({
      mutationFn: (payload) => signIn(payload),
    });
  };

  export const useGetIsMe = (isSignInSuccess, token) => {
    return useQuery({
      queryKey: ["useGetIsMe" + token],
      queryFn: () => getIsMe(),
      select: (response) => response,
      enabled: isSignInSuccess,
    });
  };
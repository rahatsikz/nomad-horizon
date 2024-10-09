import { useGetUserQuery } from "@/redux/api/userApi";
import { jwtDecode } from "jwt-decode";

export const useLoggedUserInfo = (accessToken: string | null) => {
  let decodeToken: any;

  if (accessToken) {
    decodeToken = jwtDecode(accessToken as string);
  }

  const { data: user } = useGetUserQuery(decodeToken?.userId, {
    skip: !decodeToken?.userId,
  });

  const username = user?.data.username;

  return { user, username };
};

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useLoggedUserInfo } from "@/hooks/useLoggedUser";
import { editCart } from "@/redux/slice/cart/cartSlice";

const roleBasedPrivateRoutes = {
  customer: [/^\/dashboard\/customer/],
  admin: [/^\/dashboard\/admin/],
  superadmin: [/^\/dashboard\/superadmin/],
};
const commonAccessibleRoutes = [/^\/booking\/[a-zA-Z0-9-]+$/];

const authRoutes = [/^\/login/, /^\/register/];

type Role = keyof typeof roleBasedPrivateRoutes;

// A Higher Order Component to protect routes
export default function withAuth<T extends object>(
  WrappedComponent: React.ComponentType<T>
) {
  const Auth = (props: T) => {
    const router = useRouter();
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAppSelector((state) => state.user);
    const { cart } = useAppSelector((state) => state.cart);
    const { accessToken } = user;
    const { role, user: loggedUser } = useLoggedUserInfo(accessToken);

    const dispatch = useAppDispatch();

    //checking if user in login and register routes
    const isPathInAuthRoutes = authRoutes.some((route) => route.test(pathname));

    useEffect(() => {
      if (!accessToken) {
        if (!isPathInAuthRoutes) {
          localStorage.setItem("redirectAfterLogin", pathname);
          router.replace("/login");
        }
      } else {
        setIsLoading(false);
      }
    }, [router, accessToken, pathname, isPathInAuthRoutes]);

    useEffect(() => {
      // if there is no logged user
      if (isLoading) return;

      //checking if user in booking routes
      const isPathInCommonAccessibleRoutes = commonAccessibleRoutes.some(
        (route) => route.test(pathname)
      );

      //getting redirect private route from local storage
      const redirectRoute = localStorage.getItem("redirectAfterLogin");

      //getting booking id from url
      const bookingId = redirectRoute?.split("/")[2];

      // checking if same user came from booking page again
      const hasSameUserLoggedInAgain = cart
        .filter((item) => item.user === loggedUser?.data?.id)
        .find((item) => item.service === bookingId);

      //check if new user came from cart page
      const hasComeFromCart = cart.filter((item) => !item.user);

      // checking if user came from booking page
      if (isPathInCommonAccessibleRoutes) {
        // if yes or user come from cart page, then going there
        if (!redirectRoute || hasSameUserLoggedInAgain) {
          //removing redirect url from local storage
          localStorage.removeItem("redirectAfterLogin");
          return;
        }
        // if user added product from cart as guest
        else if (hasComeFromCart) {
          const lastData = hasComeFromCart[hasComeFromCart.length - 1];
          if (!lastData) {
            router.replace("/");
            localStorage.removeItem("redirectAfterLogin");
            return;
          }
          // editing cart.. adding logged user to the cart product
          dispatch(
            editCart({ user: loggedUser?.data?.id, service: lastData.service })
          );
          router.replace(redirectRoute);
          return;
        }
        //if not... like other user logged in.. will be redirected to home
        else {
          localStorage.removeItem("redirectAfterLogin");
          router.replace("/");
        }
      }

      //checking if user just logged in
      if (isPathInAuthRoutes && role) {
        // if yes, and came from private route then going back to that private route
        if (redirectRoute) {
          router.replace(redirectRoute);
        }
        //if  it came from normal route(not private) then going to last route
        else {
          router.back();
        }
        return;
      }
      //if there is no logged user and user is in login or register page
      else if (isPathInAuthRoutes && !role) {
        return;
      }

      // checking if user is valid for going to specific role based route
      const permittedToVisit = roleBasedPrivateRoutes[role as Role]?.some((r) =>
        r.test(pathname)
      );

      // checking if user role is valid
      if (roleBasedPrivateRoutes[role as Role]) {
        // if user role is not valid, redirecting to home
        if (!permittedToVisit) {
          router.replace("/");
        }
        // deleting redirect url from local storage
        localStorage.removeItem("redirectAfterLogin");
      }
    }, [
      router,
      pathname,
      role,
      isLoading,
      cart,
      loggedUser,
      isPathInAuthRoutes,
      dispatch,
    ]);

    //if there is no logged in user and user in login or register page
    if (!isLoading && !accessToken) return null;

    // if user is logged in or user is in login or register page then showing component
    if (accessToken || isPathInAuthRoutes) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };

  return Auth;
}

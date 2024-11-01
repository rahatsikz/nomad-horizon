import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { useLoggedUserInfo } from "@/hooks/useLoggedUser";

const roleBasedPrivateRoutes = {
  customer: [/^\/dashboard\/customer/],
  admin: [/^\/dashboard\/admin/],
  superadmin: [/^\/dashboard\/superadmin/],
};
const commonAccessibleRoutes = [/^\/booking\/[a-zA-Z0-9-]+$/];

const authRoutes = [/^\/login/, /^\/register/];

type Role = keyof typeof roleBasedPrivateRoutes;

export default function withAuth<T extends object>(
  WrappedComponent: React.ComponentType<T>
) {
  const Auth = (props: T) => {
    const router = useRouter();
    const pathname = usePathname();
    const { user } = useAppSelector((state) => state.user);
    const { accessToken } = user;
    const { role } = useLoggedUserInfo(accessToken);

    useEffect(() => {
      if (!accessToken) {
        router.replace("/login");
      }
    }, [router, accessToken]);

    useEffect(() => {
      if (commonAccessibleRoutes.some((route) => route.test(pathname))) {
        return;
      }
      if (authRoutes.some((route) => route.test(pathname)) && role) {
        router.back();
        return;
      } else if (authRoutes.some((route) => route.test(pathname)) && !role) {
        return;
      }
      if (roleBasedPrivateRoutes[role as Role]) {
        if (
          !roleBasedPrivateRoutes[role as Role].some((r) => r.test(pathname))
        ) {
          router.replace("/");
        }
      }
    }, [router, pathname, role]);

    // return accessToken ? <WrappedComponent {...props} /> : null;
    if (accessToken) {
      return <WrappedComponent {...props} />;
    } else if (authRoutes.some((route) => route.test(pathname))) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };

  return Auth;
}

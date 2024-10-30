import { redirect } from "next/navigation";
import { ComponentType, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

function withAuth<P>(Component: ComponentType) {
  const AuthenticatedComponent = (props: any) => {
    const { auth, isLoading } = useAuth();

    useEffect(() => {
      if (!isLoading && !auth) {
        redirect("/");
      }
    }, [auth, isLoading]);

    if (isLoading) return null;
    if (!auth) return null;

    return <Component {...props} />;
  };

  AuthenticatedComponent.displayName = `withAuth(${
    Component.displayName || Component.name || "Component"
  })`;

  return AuthenticatedComponent;
}

export default withAuth;

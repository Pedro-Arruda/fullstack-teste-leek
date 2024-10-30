import { redirect } from "next/navigation";
import { ComponentType, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

function withAuth<P>(Component: ComponentType) {
  const AuthenticatedComponent = (props: any) => {
    const { auth } = useAuth();

    useEffect(() => {
      if (!auth) {
        redirect("/");
      }
    }, [auth]);

    if (!auth) return null;

    return <Component {...props} />;
  };

  AuthenticatedComponent.displayName = `withAuth(${
    Component.displayName || Component.name || "Component"
  })`;

  return AuthenticatedComponent;
}

export default withAuth;

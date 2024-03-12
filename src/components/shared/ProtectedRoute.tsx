import { checkLoginUser } from "../../utils.ts";
import { Navigate, Outlet } from "react-router-dom";
import React from "react";

type Props = {
  children?: React.ReactNode;
};
const ProtectedRoute = ({ children }: Props) => {
  const isLogged = checkLoginUser();

  if ( !isLogged )
  {
    localStorage.clear()
    return <Navigate to="/" />;
  }

  return children ? <> {children} </> : <Outlet />;
};

export default ProtectedRoute;

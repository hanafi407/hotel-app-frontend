import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface RequireAuthProp {
  children: JSX.Element;

}

const RequireAuth: React.FC<RequireAuthProp> = ({children}) => {
  const location = useLocation();
  const user = localStorage.getItem("userId");
  if(!user){
    return <Navigate to={'/login'} state={{path: location.pathname}} />
  }
  return (
    <div>{children}</div>
  );
};

export default RequireAuth;
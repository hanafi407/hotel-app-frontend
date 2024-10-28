import React from 'react';
import { isAdmin } from '../utils/IsAdmin';
import UnAuthorized from './UnAuthorized';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProp {
  children: JSX.Element;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProp> = ({children,allowedRoles}) => {

if(!isAdmin()){
  return <Navigate to={'/not-authorized'} />
}
  return (
    <div>{children}</div>
  );
};

export default ProtectedRoute;
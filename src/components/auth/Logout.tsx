import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Link, useNavigate } from "react-router-dom";

interface LogoutProp {}

const Logout: React.FC<LogoutProp> = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.handleLogout();
    navigate("/", { state: { message: "You have been log out." } });
    // window.location.reload();
  };

  const isLogedIn = auth.user !== null;
  return isLogedIn ? (
    <>
      <li>
        <Link to={"/profile"} className='dropdown-item'>
          Profile
        </Link>
      </li>
      <li>
        <hr className='dropdown-divider' />
      </li>
      <li>
        <button className='dropdown-item' onClick={handleLogout}>
          Logout
        </button>
      </li>
    </>
  ) : null;
};

export default Logout;

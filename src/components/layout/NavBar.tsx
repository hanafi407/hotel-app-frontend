import { Link, NavLink } from "react-router-dom";
import Logout from "../auth/Logout";
import { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { isAdmin } from "../utils/IsAdmin";

const NavBar: React.FC = () => {
  const [showAccount, setShowAccount] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  const handleAccountClick = () => {
    setShowAccount(!showAccount);
  };

  const isLogin = user !== null;
  const userRole = localStorage.getItem("userRoles");

  return (
    <>
      <nav className='navbar navbar-expand-lg bg-body-tertiary '>
        <div className='container'>
          <Link className='navbar-brand' to='/'>
            Hanafi Hotel
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNavDropdown'
            aria-controls='navbarNavDropdown'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNavDropdown'>
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <NavLink
                  className='nav-link '
                  aria-current='page'
                  to={"/browse-all-room"}
                >
                  Browse all room
                </NavLink>
              </li>
              {/* <li className='nav-item'>
                <NavLink
                  className='nav-link '
                  aria-current='page'
                  to={"/existing-room"}
                >
                  Existing Room
                </NavLink>
              </li> */}
              {isLogin && isAdmin() && (
                <li className='nav-item'>
                  <NavLink className='nav-link' to={"/admin"}>
                    Admin
                  </NavLink>
                </li>
              )}

              {/* <li className='nav-item dropdown ms-auto'>
                <Link
                  className='nav-link dropdown-toggle'
                  to='#'
                  role='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  Rooms
                </Link>
                <ul className='dropdown-menu'>
                  <li>
                    <Link className='dropdown-item' to={"/existing-room"}>
                      Existing Room
                    </Link>
                  </li>
                  <li>
                    <Link className='dropdown-item' to={"/add-room"}>
                      Adding Room
                    </Link>
                  </li>
                </ul>
              </li> */}
            </ul>

            <ul className='navbar-nav ms-auto'>
              <li className='nav-item'>
                <NavLink className={"nav-link"} to={"/find-booking"}>
                  Find my booking
                </NavLink>
              </li>
              <li className='nav-item dropdown '>
                <Link
                  className='nav-link dropdown-toggle'
                  to='#'
                  role='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  Account
                </Link>
                <ul className='dropdown-menu'>
                  {isLogin ? (
                    <Logout />
                  ) : (
                    <li>
                      <Link className='dropdown-item' to={"/login"}>
                        Login
                      </Link>
                    </li>
                  )}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;

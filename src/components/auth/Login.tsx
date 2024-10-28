import React, { ChangeEvent, useContext, useState } from "react";
import { LoginInterface } from "../utils/types";
import { loginUser } from "../utils/ApiFunctions";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./AuthProvider";

interface LoginProp {}

const Login: React.FC<LoginProp> = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [login, setLogin] = useState<LoginInterface>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const {handleLogin} = useContext(AuthContext);
  const location = useLocation();
  const {path} = location.state || {path:'/'};

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const success = await loginUser(login);
    if (success) {
      const token = success.token;
      handleLogin(token);
      const decodedToken = jwtDecode<any>(token);
      localStorage.setItem("token", token);
      localStorage.setItem("userId", decodedToken.sub);
      localStorage.setItem("userRoles", decodedToken.roles.join(","));
      navigate(path);
      // window.location.reload();
    } else {
      setErrorMessage("Invalid username or password. Please try again.");
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);
    }
  };
  return (
    <section className='container my-5 col-4 border rounded'>
      {errorMessage && <p className='alert alert-danger'>{errorMessage}</p>}
      <h2 className='text-center'>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className='row mb-3'>
          <label htmlFor='email' className='col-sm-2 col-form-label'>
            Email
          </label>
          <div>
            <input
              type='email'
              id='email'
              name='email'
              className='form-control'
              value={login.email}
              onChange={handleInput}
            />
          </div>
          <label htmlFor='password' className='col-sm-2 col-form-label'>
            Email
          </label>
          <div>
            <input
              type='password'
              id='password'
              name='password'
              className='form-control'
              value={login.password}
              onChange={handleInput}
            />
          </div>
          <div className='my-3 d-flex justify-content-center align-items-center'>
            <button
              className='btn btn-hotel '
              type='submit'
              style={{ marginRight: "10px" }}
            >
              Login
            </button>
          </div>
          <p className='text-center'>
            Don't have account yet? <Link to={"/register"}>Register</Link>
          </p>
        </div>
      </form>
    </section>
  );
};

export default Login;

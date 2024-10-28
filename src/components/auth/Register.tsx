import React, { ChangeEvent, useState } from "react";
import { UserInterface } from "../utils/types";
import { registerUser } from "../utils/ApiFunctions";
import { Link } from "react-router-dom";

interface RegisterProp {}

const Register: React.FC<RegisterProp> = () => {
  const userEmpty = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    roles: undefined,
  };
  const [register, setRegister] = useState<UserInterface>(userEmpty);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await registerUser(register);
      setSuccessMessage(result);
      setErrorMessage("");
      setRegister(userEmpty);
    } catch (error: any) {
      setErrorMessage(error.message);
    }

    setTimeout(() => {
      setErrorMessage("");
      setSuccessMessage("");
    }, 3000);
  };
  return (
    <section className='container my-5 col-6'>
      {errorMessage && <p className='alert alert-danger'>{errorMessage}</p>}
      {successMessage && (
        <p className='alert alert-success'>{successMessage}</p>
      )}
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <label htmlFor='firstName' className='col-sm-2 col-form-label'>
          First Name
        </label>
        <div>
          <input
            type='firstName'
            id='firstName'
            name='firstName'
            className='form-control'
            value={register.firstName}
            onChange={handleInputChange}
          />
        </div>
        <label htmlFor='lastName' className='col-sm-2 col-form-label'>
          Last Name
        </label>
        <div>
          <input
            type='lastName'
            id='lastName'
            name='lastName'
            className='form-control'
            value={register.lastName}
            onChange={handleInputChange}
          />
        </div>
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
              value={register.email}
              onChange={handleInputChange}
            />
          </div>
          <label htmlFor='password' className='col-sm-2 col-form-label'>
            Password
          </label>
          <div>
            <input
              type='password'
              id='password'
              name='password'
              className='form-control'
              value={register.password}
              onChange={handleInputChange}
            />
          </div>
          <div className='mb-3'>
            <button
              className='btn btn-hotel'
              type='submit'
              style={{ marginRight: "10px" }}
            >
              Register
            </button>
            <span style={{ marginLeft: "10px" }}>
              Have account? <Link to={"/login"}>Login</Link>
            </span>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Register;

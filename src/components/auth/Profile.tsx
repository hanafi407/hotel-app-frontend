import React, { useEffect, useState } from "react";
import { Booking, UserInterface } from "../utils/types";
import { deleteUser, getAllBookings, getBookingByEmail, getUser } from "../utils/ApiFunctions";
import { useNavigate, useParams } from "react-router-dom";
import Table from "../booking/Table";

interface ProfileProp {}

const Profile: React.FC<ProfileProp> = () => {
 
  const userEmpty = {
    id:"",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    roles: undefined,
  };
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<UserInterface>(userEmpty);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const dataUser = await getUser(userId!);
        const dataBooking:Booking[] = await getBookingByEmail(userId!);
        setUser(dataUser);
        setBookings(dataBooking);
      } catch (error: any) {
        setErrorMessage(error.message);
        setLoading(false);
      }
    };
    fetchUser();
    setTimeout(()=>{
      setErrorMessage('');
    },3000);
  }, [userId]);
  const handleDeleteAccount = async () => {
    const confirmed = window.confirm("Are you sure want delete your account?");
    if (confirmed) {
      await deleteUser(userId!)
        .then((response) => {
          setMessage(response.data);

          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          localStorage.removeItem("userRoles");

          navigate("/");
          // window.location.reload();
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }
  };
  return (
    <div className="">
      {errorMessage && <p className='alert alert-danger'>{errorMessage}</p>}
      {message && <p className='text-danger'>{message}</p>}
      {user && (
        <div className='card' style={{ backgroundColor: "whitesmoke" }}>
          <div className='card-body'>
            <h4 className='card-title text-center'>User Information</h4>
            <div className='row'>
              <div className='col-md-10 mx-auto'>
                <div className='card mb-3 shadow'>
                  <div className='card-body d-flex align-items-center '>
                    <div className=' col-md-4 d-flex justify-content-center'>
                      <img
                        alt='photo-user'
                        src='https://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
                        className='rounded-circle border '
                        style={{
                          width: "150px",
                          height: "150px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div className='col-md-8 '>
                      <div className='mb-2 form-group row'>
                        <label className='col-form-label col-md-4 fw-bold'>
                          ID:
                        </label>
                        <div className='col-md-8'>
                          <p className='form-control-plaintext'>{user.id}</p>
                        </div>
                      </div>
                      <div className='mb-2 form-group row'>
                        <label className='col-form-label col-md-4 fw-bold'>
                          First Name:
                        </label>
                        <div className='col-md-8'>
                          <p className='form-control-plaintext'>
                            {user.firstName}
                          </p>
                        </div>
                      </div>
                      <div className='mb-2 form-group row'>
                        <label className='col-form-label col-md-4 fw-bold'>
                          Last Name:
                        </label>
                        <div className='col-md-8'>
                          <p className='form-control-plaintext'>
                            {user.lastName}
                          </p>
                        </div>
                      </div>

                      <div className='mb-2 form-group row'>
                        <label className='col-form-label col-md-4 fw-bold'>
                          Email:
                        </label>
                        <div className='col-md-8'>
                          <p className='form-control-plaintext'>{user.email}</p>
                        </div>
                      </div>

                      <div className='mb-2 form-group row'>
                        <label className='col-form-label col-md-4 fw-bold'>
                          Roles:
                        </label>
                        <div className='col-md-8'>
                          {user.roles?.map((role) => (
                            <p className='form-control-plaintext' key={role.id}>
                              {role.name}
                            </p>
                          ))}
                        </div>
                      </div>

                      <button
                        className='btn btn-danger'
                        onClick={handleDeleteAccount}
                      >
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-5">

          <Table  bookings={bookings} handleBookingCancellation={null} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

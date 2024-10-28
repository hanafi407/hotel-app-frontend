import React, { ChangeEvent, useState } from "react";
import { Booking } from "../utils/types";
import {
  cancelBooking,
  getBookingByConfirmationCode,
} from "../utils/ApiFunctions";
import SpinnerLoading from "../common/SpinnerLoading";

interface FindBookingProp {}

const FindBooking: React.FC<FindBookingProp> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [bookingInfo, setBookingInfo] = useState<Booking>();
  const [confirmationCode, setConfirmationCode] = useState<string>("");
  const [error, setError] = useState<any>("");
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const currentUser = localStorage.getItem("userId");
  

  const clearBookingInfo: Booking = {
    bookingId: "",
    bookingConfirmationCode: "",
    checkInDate: "",
    checkOutDate: "",
    guestEmail: currentUser!,
    guestFullName: "",
    numOfAdult: 0,
    numOfChildren: 0,
    roomResponse: null,
    totalNumOfGuest: 0,
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmationCode(e.target.value);
  };

  const handleFormSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
setError('')
    try {
      const data = await getBookingByConfirmationCode(confirmationCode);
      setBookingInfo(data);
    } catch (error: any) {
      setBookingInfo(clearBookingInfo);
      setError(error.message)
      //  if (error.response && error.response.status === 404) {
      //    setError(error.response.data.message);
      //  } else {
      //    setError(error.response);
      //  }
      
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookingCancellation = async (bookingId: number) => {
    try {
      await cancelBooking(bookingId);
      setIsDelete(true);
      setBookingInfo(clearBookingInfo);
      setConfirmationCode("");
      setError("");
      setTimeout(()=>{
        setIsDelete(false)
      },3000)
    } catch (error: any) {
      setError(error.message);
    }
  };

 
  return (
    <div className='container mt-3 d-flex justify-content-center align-items-center flex-column'>
      <h2>Find My Booking</h2>
      <form onSubmit={handleFormSubmit} className='col-md-6'>
        <div className='input-group mb-3'>
          <input
            type='text'
            className='form-control'
            id='confirmationCode'
            name='confirmationCode'
            value={confirmationCode}
            onChange={handleInputChange}
            placeholder='Enter booking confirmation code'
          />

          <button className='btn btn-hotel input-group-text'>
            Find Booking
          </button>
        </div>
      </form>
      {isLoading && <SpinnerLoading />}
      {error && <div className='text-danger'>{error}</div>}
      {bookingInfo?.bookingConfirmationCode && (
        <div
          className='col-md-6 my-3 p-5 rounded'
          style={{ backgroundColor: "#f0f0f0" }}
        >
          <h3>Booking Confirmation</h3>
          <p>
            Booking Confirmation Code: {bookingInfo.bookingConfirmationCode}{" "}
          </p>
          <p>Booking ID: {bookingInfo.bookingId} </p>
          <p>Room Number: {bookingInfo.roomResponse?.id} </p>
          <p>Check-in Date: {bookingInfo.checkInDate} </p>
          <p>Check-out Date: {bookingInfo.checkOutDate} </p>
          <p>Full Name: {bookingInfo.guestFullName}</p>
          <p>Full Email: {bookingInfo.guestEmail}</p>
          <p>Adults: {bookingInfo.numOfAdult}</p>
          <p>Children: {bookingInfo.numOfChildren}</p>
          <p>Total Guest: {bookingInfo.totalNumOfGuest}</p>

          {!isDelete && (
            <button
              className='btn btn-danger'
              onClick={() =>
                handleBookingCancellation(bookingInfo.bookingId as number)
              }
            >
              Cancel Booking
            </button>
          )}
        </div>
      )}

      {isDelete && (
        <div role='alert' className='alert alert-success mt-3'>
          Booking has been canceling
        </div>
      )}

      {/* {isLoading ? (
        <SpinnerLoading />
      ) : error ? (
        <div className='text-danger'>{error}</div>
      ) : bookingInfo?.bookingConfirmationCode ? (
        <div></div>
      ) : (
        <div></div>
      )} */}
    </div>
  );
};

export default FindBooking;

import React, { useEffect, useState } from "react";
import { Booking, Room } from "../utils/types";
import { useParams } from "react-router-dom";
import { getBookingById } from "../utils/ApiFunctions";
import SpinnerLoading from "./SpinnerLoading";
import moment from "moment";

const TableInfo = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState<Booking>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    // setIsLoading(true);
    getBookingById(bookingId!)
      .then((booking) => {
        setBooking(booking);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
    <h2 className="text-center">Details</h2>
      {isLoading && !booking && <SpinnerLoading />}
      {error && <p className='text-danger text-center '>{error}</p>}
      {booking && (
        <div className='d-flex justify-content-center align-items-center'>
          <table
            className='table table-bordered table-auto table-hover my-3'
            style={{ width: "50%" }}
          >
            <tbody>
              <tr>
                <th>ID Room</th>
                <td>{booking?.roomResponse?.id} </td>
              </tr>
              <tr>
                <th>ID Booking</th>
                <td>{booking?.bookingId} </td>
              </tr>
              <tr>
                <th>Booking Confirmation</th>
                <td>{booking?.bookingConfirmationCode} </td>
              </tr>
              <tr>
                <th>Guest Name</th>
                <td>{booking?.guestFullName} </td>
              </tr>
              <tr>
                <th>Check-in Date</th>
                <td>{moment(booking.checkInDate).format("DD MMMM YYYY")} </td>
              </tr>
              <tr>
                <th>Check-out Date</th>
                <td>{moment(booking.checkOutDate).format("DD MMMM YYYY")} </td>
              </tr>

              <tr>
                <th>Room Type</th>
                <td>{booking?.roomResponse?.roomType} </td>
              </tr>
              <tr>
                <th>Room Price</th>
                <td>${booking?.roomResponse?.roomPrice} </td>
              </tr>

              <tr>
                <th>Guest Email</th>
                <td>{booking?.guestEmail} </td>
              </tr>
              <tr>
                <th>Number of Adult</th>
                <td>{booking.numOfAdult} </td>
              </tr>
              <tr>
                <th>Number of Child</th>
                <td>{booking?.numOfChildren} </td>
              </tr>
              <tr>
                <th>Total Number of Guest</th>
                <td>{booking?.totalNumOfGuest} </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default TableInfo;

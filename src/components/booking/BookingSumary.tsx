import React, { useEffect, useState } from "react";
import { Booking } from "../utils/types";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

interface BookingSumaryProp {
  booking: Booking;
  payment: any;
  isFormValid: boolean;
  onConfirm: () => void;
}

const BookingSumary: React.FC<BookingSumaryProp> = ({
  booking,
  isFormValid,
  onConfirm,
  payment,
}) => {
  const navigate = useNavigate();
  const checkInDate = moment(booking.checkInDate);
  const checkOutDate = moment(booking.checkOutDate);
  const numOfDays = checkOutDate.diff(checkInDate,"days");
  const [isBookingConfirmed, setIsBookingConfirmed] = useState<boolean>(false);
  const [isProcessingPayment, setIsProcessingPayment] =
    useState<boolean>(false);

  const handleConfirmBooking = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setIsBookingConfirmed(true);
      onConfirm();
    }, 3000);
  };

  useEffect(() => {
    if (isBookingConfirmed) {
      navigate("/booking-success");
    }
  }, [navigate, isBookingConfirmed]);
  return (
    <div className='card card-body '>
      <h4>Reservation Sumary</h4>
      <p>
        Full Name: <strong>{booking.guestFullName}</strong>
      </p>
      <p>
        Email: <strong>{booking.guestEmail}</strong>
      </p>
      <p>
        Check in date:{" "}
        <strong>{moment(booking.checkInDate).format("DD MMMM YYYY")}</strong>
      </p>

      <p>
        Check out date:{" "}
        <strong>{moment(booking.checkOutDate).format("DD MMMM YYYY")}</strong>
      </p>
      <p>Number of days: {numOfDays}</p>
      <div>
        <h5>Number of guest</h5>
        <p>
          <strong>
            Adult{(booking.numOfAdult as number) > 1 ? "s" : ""} :{" "}
            {booking.numOfAdult}
          </strong>
        </p>
        <p>
          <strong className='ml-3'>
            Children{(booking.numOfChildren as number) > 1 ? "s" : ""} :{" "}
            {booking.numOfChildren}
          </strong>
        </p>
        <p>
          <strong className='ml-3'>
            Total of Guest{(booking.totalNumOfGuest as number) > 1 ? "s" : ""} :{" "}
            {booking.totalNumOfGuest}
          </strong>
        </p>
      </div>
      {payment() > 0 ? (
        <>
          <p>
            Total Payment: <strong>{payment()}</strong>
          </p>
          {isFormValid && !isBookingConfirmed ? (
            <Button variant='success' onClick={handleConfirmBooking}>
              {isProcessingPayment ? (
                <>
                  <span
                    role='status'
                    aria-hidden='true'
                    className='spinner-border spinner-border-sm mr-2'
                  ></span>
                  Booking Confirmed, redirectiong to payment...
                </>
              ) : (
                "Confirm booking and proceed to payment"
              )}
            </Button>
          ) : isBookingConfirmed ? (
            <div className='d-flex justify-content-center align-items-center'>
              <div role='status' className='spinner-border text-primary'>
                <span className='sr-only'></span>
              </div>
            </div>
          ) : null}
        </>
      ) : (
        <>
          <p className='text-danger'>
            Check out date must be afer check in date.
          </p>
        </>
      )}
    </div>
  );
};

export default BookingSumary;

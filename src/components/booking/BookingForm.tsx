import React, { ChangeEvent, useEffect, useState } from "react";
import { Booking } from "../utils/types";
import { bookedRoom, getRoomById } from "../utils/ApiFunctions";
import { useNavigate, useParams } from "react-router-dom";
import axios, { Axios, AxiosError } from "axios";
import moment from "moment";
import { Form } from "react-bootstrap";
import BookingSumary from "./BookingSumary";

interface BookingFormProp {}

const BookingForm: React.FC<BookingFormProp> = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [isValidated, setIsValidated] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [roomPrice, setRoomPrice] = useState<number>(0);
  const currentUser = localStorage.getItem("userId");
  const [booking, setBooking] = useState<Booking>({
    bookingId: "",
    guestFullName: "",
    guestEmail: currentUser!,
    bookingConfirmationCode: "",
    checkInDate: "",
    checkOutDate: "",
    numOfAdult: 0,
    numOfChildren: 0,
    totalNumOfGuest:0,
    roomResponse: null
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
     const name = e.target.name;
     let value: string | number = e.target.value;

     // Convert to a number if it's for numOfAdult or numOfChildren
     if (name === "numOfAdult" || name === "numOfChildren") {
       value = Number(value);
     }

     // Recalculate the total number of guests if either numOfAdult or numOfChildren is updated
     const totalNumOfGuest =
       name === "numOfAdult"
         ? Number(value) + Number(booking.numOfChildren)
         : Number(booking.numOfAdult) + Number(value);

     setBooking({ ...booking, [name]: value, totalNumOfGuest });
  };

  const getRoomPriceById = async (roomId: string) => {
    try {
      const response = await getRoomById(roomId);
      setRoomPrice(Number(response.roomPrice));
      
    } catch (error: any) {
      throw new Error(error);
    }
  };


  const calculatePayment: any = () => {
    const checkInDate = moment(booking.checkInDate);
    const checkOutDate = moment(booking.checkOutDate);
    const diffInDay: any = moment(checkOutDate.diff(checkInDate,'days'));
    const price = roomPrice ? roomPrice : 0;
    return diffInDay * price;
  };

  const isGuestCountValid = () => {
    const numAdult = Number(booking.numOfAdult) ;
    const numChild = Number(booking.numOfChildren) ;
    const totalCount = numAdult + numChild;
    setBooking({...booking, totalNumOfGuest:totalCount})
    return totalCount >= 1 && numAdult >= 1;
  };

  const isCheckOutDateValid = () => {
    if (
      !moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))
    ) {
      setErrorMessage("Check out date must come before check in date,");
      return false;
    } else {
      setErrorMessage("");
      return true;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (
      form.checkValidity() === false ||
      !isGuestCountValid() ||
      !isCheckOutDateValid()
    ) {
      e.stopPropagation();
    } else {
      setIsSubmitted(true);
    }
    setIsValidated(true);
  };

  const handleBooking = async () => {
    
    try {
      const confirmationCode = await bookedRoom(roomId!, booking);
      setIsSubmitted(true);
      navigate("/booking-success", { state: { message: confirmationCode } });
    } catch (error: any) {
         const errorMessage = error.message;
         navigate("/booking-success", { state: { error: errorMessage } });
    }
  };
  useEffect(() => {
    getRoomPriceById(roomId!);
  }, [roomId]);
  return (
    <div className='my-3'>
      <div className=' row'>
        <div className='col-md-6'>
          <div className='card card-body '>
            <h4 className=' card-title'>Reserve Room</h4>
            <Form validated={isValidated} onSubmit={handleSubmit} noValidate>
              <Form.Group>
                <Form.Label htmlFor='guestFullName'>Full Name:</Form.Label>
                <Form.Control
                  required
                  type='text'
                  id='guestFullName'
                  name='guestFullName'
                  value={booking.guestFullName}
                  placeholder='Enter your name'
                  onChange={handleInputChange}
                />

                <Form.Control.Feedback type='invalid'>
                  Please enter your fullname.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label htmlFor='email'>Email:</Form.Label>
                <Form.Control
                  required
                  type='email'
                  id='guestEmail'
                  name='guestEmail'
                  value={booking.guestEmail}
                  placeholder='Enter your email'
                  onChange={handleInputChange}
                />

                <Form.Control.Feedback type='invalid'>
                  Please enter your email.
                </Form.Control.Feedback>
              </Form.Group>

              <fieldset style={{ border: "2px" }}>
                <legend>Lodgin period</legend>
                <div className='row'>
                  <div className='col-6'>
                    <Form.Group>
                      <Form.Label htmlFor='checkInDate'>
                        Check-in Date:
                      </Form.Label>
                      <Form.Control
                        required
                        type='date'
                        id='checkInDate'
                        name='checkInDate'
                        value={booking.checkInDate}
                        placeholder='Enter your check-in date'
                        onChange={handleInputChange}
                      />

                      <Form.Control.Feedback type='invalid'>
                        Please enter your check-in date.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>

                  <div className='col-6'>
                    <Form.Group>
                      <Form.Label htmlFor='checkOutDate'>
                        Check-out Date:
                      </Form.Label>
                      <Form.Control
                        required
                        type='date'
                        id='checkOutDate'
                        name='checkOutDate'
                        value={booking.checkOutDate}
                        placeholder='Enter your check-out date'
                        onChange={handleInputChange}
                      />

                      <Form.Control.Feedback type='invalid'>
                        Please enter your check-out date.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  {errorMessage && (
                    <p className='text-danger error-message'>{errorMessage}</p>
                  )}
                </div>
              </fieldset>
              <fieldset>
                <legend>Number of guest</legend>
                <div className='row'>
                  <div className='col-6'>
                    <Form.Group>
                      <Form.Label htmlFor='numOfAdult'>Adults:</Form.Label>
                      <Form.Control
                        required
                        type='number'
                        id='numOfAdult'
                        name='numOfAdult'
                        value={booking.numOfAdult?.toString()}
                        min={1}
                        placeholder='sum of adult'
                        onChange={handleInputChange}
                      />
                      <Form.Control.Feedback type='invalid'>
                        Please enter at least 1 adult.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>

                  <div className='col-6'>
                    <Form.Group>
                      <Form.Label htmlFor='numOfChildren'>Children:</Form.Label>
                      <Form.Control
                        required
                        type='number'
                        id='numOfChildren'
                        name='numOfChildren'
                        value={booking.numOfChildren?.toString()}
                        min={0}
                        placeholder='sum of children'
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </div>
                </div>
              </fieldset>
              <div className='form-group my-2'>
                <button type='submit' className='btn btn-hotel'>
                  Continue
                </button>
              </div>
            </Form>
          </div>
        </div>
        <div className='col-md-6'>
          {isSubmitted && (
            <BookingSumary
              isFormValid={isValidated}
              onConfirm={handleBooking}
              payment={calculatePayment}
              booking={booking}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingForm;

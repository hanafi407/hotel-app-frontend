import React, { useEffect, useState } from 'react';
import { Booking } from '../utils/types';
import { cancelBooking, getAllBookings } from '../utils/ApiFunctions';
import Header from '../common/Header';
import SpinnerLoading from '../common/SpinnerLoading';
import BookingTable from './BookingTable';

interface BookingsProp {
  
}

const Bookings: React.FC<BookingsProp> = () => {
const [bookingInfo, setBookingInfo] = useState<Booking[]>([]);
const [isLoading, setIsLoading] = useState<boolean>(false);
const [error, setError] = useState<string>('');
const token = localStorage.getItem("token");

useEffect(()=>{
  setIsLoading(true);
  getAllBookings(token!).then(data=>{
    setBookingInfo(data)
    setIsLoading(false)
  }).catch(error=>{
    setError(error.message);
    setIsLoading(false);
  })
},[])

const handleBookingCancellation = async (bookingId:number)=>{
  try {
    await cancelBooking(bookingId)
    const data= await getAllBookings(token!);
    setBookingInfo(data);
  } catch (error:any) {
    setError(error.message)
  }
}

  return (
    <section className='container' style={{ backgroundColor: "whitesmoke" }}>
      <Header title='Existing Booking' />
      {error && <div className='text-danger'>{error}</div>}
      {isLoading ? (
        <SpinnerLoading />
      ) : (
        <BookingTable
          bookingInfo={bookingInfo}
          handleCancellation={handleBookingCancellation}
        />
      )}
    </section>
  );
};

export default Bookings;
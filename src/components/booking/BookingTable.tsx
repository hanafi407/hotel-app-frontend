import React, { useEffect, useState } from "react";
import { Booking } from "../utils/types";
import { parseISO } from "date-fns";
import DateSlider from "../common/DateSlider";
import Table from "./Table";

interface BookingTableProp {
  bookingInfo: Booking[];
  handleCancellation: any;
}

const BookingTable: React.FC<BookingTableProp> = ({
  bookingInfo,
  handleCancellation,
}) => {
  const [filteredBookings, setFilteredBooking] =
    useState<Booking[]>(bookingInfo);
  

  const filterBooking = (startDate: any, endDate: any) => {
    let filtered = bookingInfo;
    if (startDate && endDate) {
      filtered = bookingInfo.filter((booking) => {
        const bookingStartDate = parseISO(booking.checkInDate);
        const bookingEndDate = parseISO(booking.checkOutDate);

        return (
          bookingStartDate >= startDate &&
          bookingEndDate <= endDate &&
          bookingEndDate > startDate
        );
      });
    }
    setFilteredBooking(filtered);
  };

  useEffect(() => {
    setFilteredBooking(bookingInfo);
  }, [bookingInfo]);
  return (
    <div className='p-4'>
      <DateSlider onDateChange={filterBooking} onFilterChange={filterBooking} />
      <Table
        bookings={filteredBookings}
        handleBookingCancellation={handleCancellation}
      />
    </div>
  );
};

export default BookingTable;

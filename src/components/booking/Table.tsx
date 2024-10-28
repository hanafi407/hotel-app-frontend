import React from "react";
import { Booking } from "../utils/types";
import moment from "moment";
import { Link, useLocation } from "react-router-dom";
import { FaEye } from "react-icons/fa";

interface TableProp {
  bookings: Booking[];
  handleBookingCancellation: any;
}

const Table: React.FC<TableProp> = ({
  bookings,
  handleBookingCancellation,
}) => {
  const location = useLocation();
  const roles = localStorage.getItem("userRoles");
  const pathname = location.pathname;

  return (
    <div>
      <table className='table table-bordered table-hover shadow'>
        <thead>
          <tr className='text-center'>
            <th>S/N</th>
            <th>Guest Email</th>
            <th>Check-in Date</th>
            <th>Check-out Date</th>
            <th>Total Guest</th>
            <th>Confirmation Code</th>
            <th>Status</th>
            {roles?.includes("ROLE_ADMIN") &&
                  pathname === "/existing-booking" && (
            <th>Actions</th>)}
          </tr>
        </thead>
        <tbody className='text-center'>
          {bookings.map((booking, index) => {
            const isGoing = moment(booking.checkOutDate).isAfter(moment());
            return (
              <tr key={booking.bookingId}>
                <td>{index + 1}</td>
                <td>{booking.guestEmail}</td>
                <td>{moment(booking.checkInDate).format("D MMMM YYYY")}</td>
                <td>{moment(booking.checkOutDate).format("D MMMM YYYY")}</td>
                <td>{booking.totalNumOfGuest}</td>
                <td>{booking.bookingConfirmationCode}</td>
                <td>
                  {" "}
                  <div className='d-inline-flex align-items-center '>
                    <span className='position-relative me-4'>
                      <span
                        className={`${
                          isGoing ? "bg-success" : "bg-danger"
                        } position-absolute p-2  border border-light rounded-circle`}
                        style={{ top: "50%", transform: "translateY(-50%)" }}
                      ></span>
                      <span className='visually-hidden'>New alerts</span>
                    </span>
                    {isGoing ? (
                      <span className='text-success'>On-going</span>
                    ) : (
                      <span className='text-danger'>Off-going</span>
                    )}
                  </div>
                </td>
                {roles?.includes("ROLE_ADMIN") &&
                  pathname === "/existing-booking" && (
                    <td>
                      <div>
                        <Link
                          to={`/info/${booking.bookingId}`}
                          data-toggle='tooltip'
                          data-placement='top'
                          title='View more details'
                        >
                          <span className='btn btn-primary me-1'>
                            <FaEye />
                          </span>
                        </Link>
                        <button
                          className='btn btn-danger'
                          onClick={() =>
                            handleBookingCancellation(booking.bookingId)
                          }
                        >
                          Cancel
                        </button>
                      </div>
                    </td>
                  )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

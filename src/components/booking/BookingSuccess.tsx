import { useLocation } from "react-router-dom";
import Header from "../common/Header";

const BookingSuccess: React.FC = () => {
const location = useLocation();
const message = location.state?.message;
const error = location.state?.error;

console.log("message: " +message)
console.log("error: "+error)

  return (
    <div className='container'>
      <Header title='Header Success' />
      <div className='mt-5'>
        {message ? (
          <div className=''>
            <h3 className='text-success'>Booking Success.</h3>
            <p className='text-success'>{message}</p>
          </div>
        ) : (
          <div className=''>
            <h3 className='text-danger'>Error Booking Room..</h3>
            <p className='text-danger'>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingSuccess;
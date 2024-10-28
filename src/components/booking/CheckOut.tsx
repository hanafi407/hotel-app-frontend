import { useEffect, useState } from "react";
import BookingForm from "./BookingForm";
import { useParams } from "react-router-dom";
import { getRoomById } from "../utils/ApiFunctions";
import { Room } from "../utils/types";
import SpinnerLoading from "../common/SpinnerLoading";
import { FaCar, FaTshirt, FaTv, FaUtensils, FaWifi, FaWineGlassAlt } from "react-icons/fa";
import RoomCarousel from "../common/RoomCarousel";

const CheckOut: React.FC = () => {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [roomInfo, setRoomInfo] = useState<Room>();

  const { roomId } = useParams();
 

  useEffect(() => {
    window.scrollTo(0, 0);
      getRoomById(roomId!)
        .then((room) => {
          setRoomInfo(room);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
  }, [roomId]);
  return (
    <div>
      <section className='container'>
        <div className='row flex-column flex-md-row align-self-center'>
          <div className='col-md-4 mt-3'>
            {isLoading ? (
              <SpinnerLoading />
            ) : error ? (
              <p>{error}</p>
            ) : (
              <div className=''>
                <img
                  src={`data:image/png;base64,${roomInfo?.photo}`}
                  alt='Room Photo'
                  style={{ width: "100%", height: "200px" }}
                />
                <table className='table table-bordered table-hover'>
                  <tbody>
                    <tr>
                      <th>Room Type</th>
                      <td>{roomInfo?.roomType} </td>
                    </tr>
                    <tr>
                      <th>Room Price</th>
                      <td>${roomInfo?.roomPrice} / Night</td>
                    </tr>
                    <tr>
                      <th>Service</th>
                      <td>
                        <ul className='list-unstyled'>
                          <li className='d-flex juscent align-items-center gap-2'>
                            <FaWifi />
                            WiFi
                          </li>
                          <li className='d-flex juscent align-items-center gap-2'>
                            <FaTv />
                            Netflix Premium
                          </li>
                          <li className='d-flex juscent align-items-center gap-2'>
                            <FaUtensils />
                            Break Fast
                          </li>
                          <li className='d-flex juscent align-items-center gap-2'>
                            <FaWineGlassAlt />
                            Mini Bar Refreshment
                          </li>
                          <li className='d-flex juscent align-items-center gap-2'>
                            <FaTshirt />
                            Laundry
                          </li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className='col-md-8'>
            <BookingForm />
          </div>
        </div>
        <div>
          <RoomCarousel />
        </div>
      </section>
    </div>
  );
};

export default CheckOut;

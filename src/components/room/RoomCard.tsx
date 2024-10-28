import { Link } from "react-router-dom";
import { Room } from "../utils/types";

interface RoomCardProp {
  room: Room;
}
const RoomCard: React.FC<RoomCardProp> = ({ room }) => {
  return (
    <div className='col-md-12 mb-3'>
      <div className='card shadow'>
        <div className='card-body d-flex flex-wrap align-items-center'>
          <div className='flex-shrink-0 mr-3 mb-3 mb-md-3'>
            <Link  to={`/book-room/${room.id}`}>
              <img
                className='card-img-top '
                src={`data:img/png;base64, ${room.photo}`}
                alt='Room Photo'
                style={{ width: "100%", maxWidth: "200px", height: "auto" }}
              />
            </Link>
          </div>
          <div className='flex-grow-1 me-3 px-5'>
            <div className='card-title hotel-color'>{room.roomType}</div>
            <div className='card-title room-price'>
              {room.roomPrice} / night
            </div>
            <div className='card-text'>
              Some room information goes here for the guest to read throgh
            </div>
          </div>
          <div className='flex-shrink-0 mt-3'>
            <Link className='btn btn-hotel' to={`/book-room/${room.id}`}
            >
              Book now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;

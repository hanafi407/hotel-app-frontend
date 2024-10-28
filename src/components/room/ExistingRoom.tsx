import React, { useEffect, useState } from "react";
import { Room } from "../utils/types";
import { deleteRoom, getAllRooms, getRoomById } from "../utils/ApiFunctions";
import RoomFilter from "../common/RoomFilter";
import RoomPaginator from "../common/RoomPaginator";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import SpinnerLoading from "../common/SpinnerLoading";

interface ExistingRoomProp {
  // state: any;
}

const ExistingRoom: React.FC<ExistingRoomProp> = () => {
  
  const [rooms, setRooms] = useState<Room[] | []>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [roomsPerPage] = useState<number>(8);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filteredRooms, setFilteredRooms] = useState<Room[] | []>([]);
  const [selectedRoomType, setSelectedRoomType] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    fetchRoom();
    
  }, []);

  const fetchRoom = async () => {
    setIsLoading(true)
    try {
      const result = await getAllRooms();
      setIsLoading(false)
      setRooms(result);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    if (selectedRoomType === "") {
      setFilteredRooms(rooms);
    } else {
      const filtered = rooms.filter(
        (room) => room.roomType === selectedRoomType
      );
      setFilteredRooms(filtered);
    }
    setCurrentPage(1);
  }, [rooms, selectedRoomType]);

  const handleDeleteRoom = async (roomId:number)=>{
    try {
      const room = await getRoomById(roomId.toString());
      const roomType = room.roomType;
      const result = await deleteRoom(roomId);
      if(result===''){
        
        setSuccessMessage(`Room ${roomType} is deleted`)
        fetchRoom();
      }else{
        console.log("Error deleting room.")
      }
    } catch (error: any) {
      setErrorMessage(error.message)
    }

    setTimeout(()=>{
      setSuccessMessage('');
      setErrorMessage('')
    },3000)

  }

  const calculateTotalPage = (
    filteredRooms: Room[],
    roomPerPage: number,
    rooms: Room[]
  ) => {
    const totalRooms =
      filteredRooms.length > 0 ? filteredRooms.length : rooms.length;
      return Math.ceil(totalRooms/roomPerPage);
  };

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  const handlePageChange = (pageNumber:number)=>{
    setCurrentPage(pageNumber)
  }

  return (
    <>
      {isLoading ? (
        <SpinnerLoading />
      ) : (
        <section className=' container'>
          {successMessage && (
            <div className='alert alert-success fade show'>
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className='alert alert-success fade show'>{errorMessage}</div>
          )}
          <div className='d-flex justify-content-center mb-3 '>
            <h2>Existing Room</h2>
          </div>
          <div className='row'>
            <div className='col-md-6'>
              <RoomFilter data={rooms} setFilteredData={setFilteredRooms} />
            </div>
            <div className="col-md-6 text-end">
              <Link to={'/add-room'} className="btn btn-outline-dark">Add Room</Link>
            </div>
          </div>

          <table className='table table-bordered table-hover'>
            <thead>
              <tr className='text-center'>
                <th>ID</th>
                <th>Room Type</th>
                <th>Room Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRooms.map((room, index) => (
                <tr key={room.id} className="text-center">
                  <td>{room.id}</td>
                  <td>{room.roomType}</td>
                  <td>{room.roomPrice}</td>
                  <td className='gap-2'>
                    <Link to={`/edit-room/${room.id}`}>
                      <span className='btn btn-primary me-1'>
                        <FaEye />
                      </span>
                      <span className='btn btn-success me-1'>
                        <FaEdit />
                      </span>
                    </Link>
                    <button
                      className='btn btn-danger '
                      onClick={() => handleDeleteRoom(room.id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <RoomPaginator
            currentPage={currentPage}
            totalPages={calculateTotalPage(filteredRooms, roomsPerPage, rooms)}
            onPageChange={handlePageChange}
          />
        </section>
      )}
    </>
  );
};

export default ExistingRoom;

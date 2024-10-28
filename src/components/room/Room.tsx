import React, { useEffect, useState } from "react";
import { getAllRooms } from "../utils/ApiFunctions";
import { Room as TheRoom } from "../utils/types";
import RoomCard from "./RoomCard";
import RoomFilter from "../common/RoomFilter";
import RoomPaginator from "../common/RoomPaginator";

interface RoomProp {}

const Room: React.FC<RoomProp> = () => {
  const [data, setData] = useState<[] | TheRoom[]>([]);
  const [error, setError] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [roomsPerPage, setRoomsPerPage] = useState<number>(5);
  const [filteredData, setFilteredData] = useState<[] | TheRoom[]>([]);

  useEffect(() => {
    setIsLoading(false);
    getAllRooms()
      .then((data) => {
        setData(data);
        setFilteredData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  },[]);

  if(isLoading) {
    return <div>Loading...</div>
  }

  if(error){
    return <div className="text-danger">Error: {error}</div>
  }

  const handlePageChange = (page:number)=>{
    setCurrentPage(page);
  }

  const totalPages = Math.ceil(filteredData.length/roomsPerPage);

  const renderRooms = ()=>{
    const starIndex = (currentPage - 1) * roomsPerPage;
    const endIndex = starIndex + roomsPerPage;

    return filteredData.slice(starIndex,endIndex).map(room=> <RoomCard room={room} key={room.id}/>)
  }
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 mt-3 mb-md-0'>
          <RoomFilter data={data} setFilteredData={setFilteredData} />
        </div>
        <div className='col-md-6 d-flex justify-content-end align-items-end'>
          <RoomPaginator
            currentPage={currentPage}
            onPageChange={handlePageChange}
            totalPages={totalPages}
          />
        </div>
      </div>
      <div className='row'>{renderRooms()} </div>
      <div className='row mt-3 d-flex justify-content-center  align-items-center'>
        <div className='col-md-6 '>
          <RoomPaginator
            currentPage={currentPage}
            onPageChange={handlePageChange}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
};

export default Room;

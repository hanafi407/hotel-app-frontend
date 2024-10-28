import { ChangeEvent, useState } from "react";
import { Room } from "../utils/types";
interface RoomFilterProp {
  data: Room[] | [];
  setFilteredData: (filtered: Room[]) => void;
}
const RoomFilter: React.FC<RoomFilterProp> = ({
  data,
  setFilteredData,
}: RoomFilterProp) => {
  const [filter, setFilter] = useState<string>("");
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedRoom = e.target.value;
    setFilter(selectedRoom);
    const filteredRoom = data.filter((room) =>
      room.roomType.toLowerCase().includes(selectedRoom.toLowerCase())
    );

    setFilteredData(filteredRoom);
  };

  const clearFilter = () => {
    setFilter("");
    setFilteredData(data);
  };

  const roomTypes = ["", ...new Set(data.map((room) => room.roomType))];

  return (
    <div className='input-group mb-3'>
      <span className='input-group-text' id='room-type-filter'>
        Filter rooms by type:
      </span>
      <select
        name=''
        className='form-select'
        value={filter}
        onChange={handleSelectChange}
        id=''
      >
        {roomTypes.map((type, index) => (
          <option value={type} key={index}>
            {type}
          </option>
        ))}
      </select>
      <button className='btn btn-hotel' type='button' onClick={clearFilter}>
        Clear filter
      </button>
    </div>
  );
};

export default RoomFilter;

import React from "react";
import { ChangeEvent, useEffect, useState } from "react";
import { getRoomTypes } from "../utils/ApiFunctions";
import { Room } from "../utils/types";

interface roomTypesSelectorProp {
  handleRoomInputChange: (e: any) => void;
  room: Room;
}

const RoomTypeSelector: React.FC<roomTypesSelectorProp> = (
  prop: roomTypesSelectorProp
) => {
  const [roomTypes, setroomTypes] = useState<string[]>([]);
  const [showNewroomTypesInput, setShowroomTypesInput] = useState<boolean>(false);
  const [newroomTypes, setNewroomTypes] = useState("");

  useEffect(() => {
    getRoomTypes().then((data: any) => {
      setroomTypes(data);
    });
  }, []);

  const handleNewRoomTypeInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewroomTypes(e.target.value);
  };

  const handleAddNewroomTypes = () => {
    if (newroomTypes !== "") {
      setroomTypes([...roomTypes, newroomTypes]);
      setNewroomTypes("");
      setShowroomTypesInput(false);
    }
  };
  function handleCancelButton(event: any): void {
    setShowroomTypesInput(false)
  }

  return (
    <div>
      <select
        required
        className='form-select'
        name='roomType'
        id='roomTypes'
        value={prop.room.roomType}
        onChange={(e) => {
          if (e.target.value === "Add New") {
            setShowroomTypesInput(true);
          } else {
            setShowroomTypesInput(false);
            prop.handleRoomInputChange(e);
          }
        }}
      >
        <option value={""}>Select a room type</option>
        <option value={"Add New"}>Add New</option>
        {roomTypes.map((type, index) => (
          <option value={type} key={index}>
            {type}
          </option>
        ))}
      </select>
      {showNewroomTypesInput && (
        
        <div className='input-group mt-3'>
          <input
            type='text'
            className='form-control me-2'
            placeholder='Enter a new room type'
            onChange={handleNewRoomTypeInputChange}
            required
          />

          <button
            type='button'
            className='btn btn-primary me-2'
            onClick={handleAddNewroomTypes}
          >
            Add
          </button>
          <button
            type='button'
            className='btn btn-danger'
            onClick={handleCancelButton}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default RoomTypeSelector;

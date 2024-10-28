import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { addRoom, getAllRooms } from "../utils/ApiFunctions";
import RoomTypeSelector from "../common/RoomTypeSelector";
import { Room } from "../utils/types";
import ExistingRoom from "./ExistingRoom";

const AddRoom: React.FC = () => {
 
  const [newRoom, setNewRoom] = useState<Room>({
    id: 0,
    photo: "",
    roomType: "",
    roomPrice: "",
    booked:false,
    bookings: null
  });
  const [myState,setMyState] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRoomInputChange = (e: any) => {
    const name = e.target.name;
    let value: any = e.target.value;
    if (name === "roomPrice") {
      if (value !== "") {
        value = Number(value);
      } else {
        value = "";
      }
    }

    setNewRoom({ ...newRoom, [name]: value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedImage = e.target.files[0];
      setNewRoom({ ...newRoom, photo: selectedImage });
      setImagePreview(URL.createObjectURL(selectedImage));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(newRoom.roomType);

    try {
      const success = await addRoom({
        photo: newRoom.photo,
        roomPrice: newRoom.roomPrice.toString(),
        roomType: newRoom.roomType,
      });
      if (success !== undefined) {
        setMyState(!myState);
        setSuccessMessage("A new room added to database");
        setNewRoom({id: 0, photo: "", roomPrice: "", roomType: "", booked: false,  bookings:null, });
        setImagePreview("");
        setErrorMessage("");
      } else {
        setErrorMessage("Error adding room");
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    }

    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

  return (
    <div
      className='bg-light p-4 rounded shadow mx-auto mt-3'
      style={{ width: "35rem" }}
    >
      <h2 className='d-flex justify-content-center mb-3'>Adding Room</h2>
      {successMessage && (
        <div className='alert alert-success fade show'>{successMessage}</div>
      )}
      {errorMessage && (
        <div className='alert alert-success fade show'>{errorMessage}</div>
      )}
      <form onSubmit={handleSubmit} action='' className=''>
        <div className='row mb-3'>
          <label className='col-lg-3 col-form-label' htmlFor='room-type'>
            Room Type
          </label>
          <div className='col-lg-9'>
            <RoomTypeSelector
              handleRoomInputChange={handleRoomInputChange}
              room={newRoom}
            />
          </div>
        </div>

        <div className='row mb-3'>
          <label className='col-lg-3 col-form-label' htmlFor='room-type'>
            Room Price
          </label>
          <div className='col-lg-9'>
            <input
              name='roomPrice'
              type='number'
              id='room-price'
              value={newRoom.roomPrice}
              onChange={handleRoomInputChange}
              className='form-control'
              required
            />
          </div>
        </div>

        <div className='row mb-3'>
          <label className='col-lg-3 col-form-label' htmlFor='room-type'>
            Room Photo
          </label>
          <div className='col-lg-9'>
            <input
              name='roomPhoto'
              type='file'
              id='room-photo'
              onChange={handleImageChange}
              className='form-control'
              required
            />
          </div>
        </div>
        <div className='d-flex justify-content-center mb-3'>
          {imagePreview && (
            <img
              src={imagePreview}
              alt='Preview room photo'
              style={{ maxWidth: "400px" }}
            />
          )}
        </div>
        <div className='d-flex justify-content-center'>
          <button type='submit' className='btn btn-primary'>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRoom;

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Room } from "../utils/types";
import {getRoomById, updateRoom } from "../utils/ApiFunctions";
import { Link, useParams } from "react-router-dom";
import RoomTypeSelector from "../common/RoomTypeSelector";

interface EditRoomProp {}

const EditRoom: React.FC<EditRoomProp> = () => {
  const [room, setRoom] = useState<Room>({
    id: 0,
    photo: "",
    roomType: "",
    roomPrice: "",
    booked: false,
    bookings: null,
  });
  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const {roomId} = useParams();
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

    setRoom({ ...room, [name]: value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedImage = e.target.files[0];
      setRoom({ ...room, photo: selectedImage });
      setImagePreview(URL.createObjectURL(selectedImage));
    }
  };

  useEffect(()=>{
    const fetchRoom = async ()=>{
      try {
        const roomData = await getRoomById(roomId as string);
        setRoom(roomData);
        setImagePreview(roomData.photo.toString())
      } catch (error:any) {
        console.log("error fetching getRoomById")
        throw new Error(`Can not fetch ${error.message}`)
      }
    }
    fetchRoom()
  },[roomId])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(room.roomType);

    try {
      const response = await updateRoom(
        Number(roomId), room
      );
      if (response.status === 200) {
        setSuccessMessage("A room updated");
        const updatedRoom = await getRoomById(roomId!)
        setRoom(updatedRoom);
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
        className='bg-light p-4 rounded  shadow mx-auto'
        style={{ width: "35rem" }}
      >
        <h2 className=''>Edit Room</h2>
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
                room={room}
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
                value={room.roomPrice}
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
              />
            </div>
          </div>{" "}
          <div className='row'>
            <div className='col-md-3'></div>
            <div className='col-md-6 '>
              {imagePreview && (
                <img
                  className='mb-3 '
                  src={`data:image/jpeg;base64,${imagePreview}`}
                  alt='Preview room photo'
                  style={{ maxWidth: "400px" }}
                />
              )}
            </div>
          </div>
          <div className='d-flex justify-content-center gap-2'>
            <Link
              to={"/existing-room"}
              type='button'
              className='btn btn-outline-dark'
            >
              Back
            </Link>
            <button type='submit' className='btn btn-primary'>
              Edit
            </button>
          </div>
        </form>
      </div>
  );
};

export default EditRoom;

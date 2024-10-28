import axios, { AxiosError, AxiosResponse } from "axios";
import { Booking, LoginInterface, UserInterface, Room } from "./types";

export const api = axios.create({
  baseURL: "http://localhost:9192"
})

export const getHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  }
}
interface addRoomIn {
  photo: any;
  roomType: string;
  roomPrice: string
}
export const addRoom = async ({ roomPrice, roomType, photo }: addRoomIn) => {
  const formData = new FormData();
  formData.append("photo", photo)
  formData.append("roomType", roomType)
  formData.append("roomPrice", roomPrice)

  const response = await api.post("/rooms/add/new-room", formData)
  if (response.status === 201) {
    return true;
  } else {
    return false;
  }
}

export const getRoomTypes = async () => {
  try {
    const response = await api.get("/rooms/types");
    return response.data;
  } catch (error) {
    console.log('error bro')
    throw new Error("Error fetching room types")

  }
}

export const getAllRooms = async () => {
  try {
    const response = await api.get('/rooms/all-rooms');
    return response.data;
  } catch (error) {
    throw new Error("Error fetching all rooms")
  }
}

export const deleteRoom = async (roomid: number) => {
  try {
    const result = await api.delete(`rooms/${roomid}`);
    return result.data;
  } catch (error: any) {
    throw new Error(`Error deleting room ${error.message}`)

  }
}

export const updateRoom = async (roomId: number, room: Room) => {
  const formData = new FormData();
  formData.append('roomPrice', room.roomPrice);
  formData.append('roomType', room.roomType);
  formData.append('photo', room.photo);
  const response = await api.put(`/rooms/update/${roomId}`, formData);

  return response;
}

export const getRoomById = async (roomId: string) => {
  try {
    const result: AxiosResponse<Room> = await api.get(`rooms/${roomId}`);
    return result.data;
  } catch (error: any) {
    throw new Error(`Error fetching room by id. ${error.message}`)

  }
}

export const bookedRoom = async (roomId: string, booking: Booking) => {
  try {
    const response = await api.post(`/bookings/room/${roomId}/booking`, booking, { headers: getHeader()});
    return response.data;
  } catch (e: any) {

    if (e.response && e.response.data) {

      throw new Error(e.response.data);
    } else {
      throw new Error(`Error booking room: ${e.message}`)
    }
  }
}

export const getAllBookings = async (token:string) => {
  try {
    const response = await api.get(`/bookings/all-bookings`, {
      headers: getHeader()
    });
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error fetching bookings: ${error.message}`)
    }
  }
}

export const getBookingById = async (bookingId: string) => {
  try {
    const response = await api.get(`/bookings/${bookingId}`, {
      headers: getHeader()
    })
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error fetching booking by id: ${error.message}`);
    }
  }
}

export const getBookingByEmail = async (email: string) => {
  try {
    const response = await api.get(`/bookings/email/${email}`, {
      headers: getHeader()
    })
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error fetching booking by id: ${error.message}`);
    }
  }
}


export const getBookingByConfirmationCode = async (confirmationCode: string) => {
  try {
    const response: AxiosResponse = await api.get(`/bookings/confirmation/${confirmationCode}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error: ${error.response?.data}`)
    }

  }
}

export const cancelBooking = async (roomId: number) => {
  try {
    const response: AxiosResponse = await api.delete(`/bookings/${roomId}/delete`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error: ${error.message}`)
    }

  }
}

export const getAvailableRoom = async (checkInDate: string, checkOutDate: string, roomType: string) => {
  const response = await api.get(`/rooms/available-room?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`)
  return response;
}

export const registerUser = async (user: UserInterface) => {
  try {
    const response = await api.post(`/auth/register`, user);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error register: ${error.message}`);
    }
  }
}

export const loginUser = async (login: LoginInterface) => {
  try {
    const response = await api.post(`/auth/login`, login);

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error)
    if (axios.isAxiosError(error)) {
      throw new Error(`Error login: ${error.message}`);
    }
  }
}

export const getUserProfile = async (userId: number, token: string) => {
  try {
    const response = await api.get(`/users/profile`, {
      headers: getHeader()
    })
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error get user profile: ${error.message}`);
    }
  }
}

export const deleteUser = async (userId: string) => {
  try {
    const response = await api.delete(`/users/delete/${userId}`, {
      headers: getHeader()
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error get user profile: ${error.message}`);
    }
  }
}

export const getUser = async (userId: string)=>{
  try {
    const response = await api.get(`/users/${userId}`, {
      headers: getHeader()
    });
    return response.data;
  }catch (error: any) { 
    throw error;
  }
}
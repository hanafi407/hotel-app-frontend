export interface Room {
  id: number;
  photo: File | '';
  roomType: string;
  roomPrice: string;
  bookings: Booking | null;
  booked: boolean;
}

export interface Booking {
  bookingId: number | '';
  checkInDate: '';
  checkOutDate: '';
  guestFullName: string | '';
  guestEmail: string | '';
  numOfChildren: number;
  numOfAdult: number;
  totalNumOfGuest: number;
  bookingConfirmationCode: string | '';
  roomResponse: Room | null;
}

export interface UserInterface {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles: RoleInterface[] | undefined;
}
export interface RoleInterface{
  id: number;
  name: string;
}

export interface LoginInterface {
  email: string;
  password: string;
}

export interface Role {
  id: number;
  name: string;
}

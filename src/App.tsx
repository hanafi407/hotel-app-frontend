import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import AddRoom from "./components/room/AddRoom";
import "./index.css";
import EditRoom from "./components/room/EditRoom";
import ExistingRoom from "./components/room/ExistingRoom";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import RoomListing from "./components/room/RoomListing";
import Admin from "./components/admin/Admin";
import Home from "./components/home/Home";
import CheckOut from "./components/booking/CheckOut";
import BookingSuccess from "./components/booking/BookingSuccess";
import Bookings from "./components/booking/Bookings";
import FindBooking from "./components/booking/FindBooking";
import TableInfo from "./components/common/TableInfo";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Profile from "./components/auth/Profile";
import AuthProvider from "./components/auth/AuthProvider";
import ProtectedRoute from "./components/protected/ProtectedRoute";
import UnAuthorized from "./components/protected/UnAuthorized";
import RequireAuth from "./components/auth/RequireAuth";

function App() {
  return (
    <AuthProvider>
      <div className='d-flex flex-column min-vh-100 '>
        <Router>
          <NavBar />
          <main className='flex-grow-1'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/not-authorized' element={<UnAuthorized />} />
              <Route path='/add-room' element={<AddRoom />} />
              <Route
                path='/book-room/:roomId'
                element={
                  <RequireAuth>
                    <CheckOut />
                  </RequireAuth>
                }
              />
              <Route path='/edit-room/:roomId' element={<EditRoom />} />
              <Route
                path='/existing-room'
                element={
                  <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
                    <ExistingRoom />
                  </ProtectedRoute>
                }
              />
              <Route path='/browse-all-room' element={<RoomListing />} />
              <Route
                path='/admin'
                element={
                  <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
                    <Admin />
                  </ProtectedRoute>
                }
              />
              <Route path='/booking-success' element={<BookingSuccess />} />
              <Route
                path='/existing-booking'
                element={
                  <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
                    <Bookings />
                  </ProtectedRoute>
                }
              />
              <Route path='/find-booking' element={<FindBooking />} />
              <Route path='/info/:bookingId' element={<TableInfo />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/profile/' element={<Profile />} />
              <Route path='/logout' element={<FindBooking />} />{" "}
            </Routes>
          </main>
          <Footer />
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;

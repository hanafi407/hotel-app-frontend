import React from "react";
import { Link } from "react-router-dom";

interface AdminProp {}

const Admin: React.FC<AdminProp> = () => {
  return (
    <div className="container">
      <h1 className="text-center">Admin Pannel</h1>
      <hr />
      <div>
        <Link to={"/existing-room"}>Existing Room</Link>
      </div>
      <div>
        <Link to={"/existing-booking"}>Existing Booking</Link>
      </div>
    </div>
  );
};

export default Admin;

import React, { useEffect, useState } from 'react';
import MainHeader from '../layout/MainHeader';
import Parallax from '../common/Parallax';
import HotelService from '../common/HotelService';
import RoomCarousel from '../common/RoomCarousel';
import RoomSearch from '../common/RoomSearch';
import { useLocation } from 'react-router-dom';

interface HomeProp {
  
}

const Home: React.FC<HomeProp> = () => {
  const [message, setMessage] = useState<string|null>(null);
  const [currentUser, setCurrentUser] = useState<string|null>(null);
  const location = useLocation();

  useEffect(()=>{
    const userId = localStorage.getItem("userId");
    setMessage(location.state && location.state.message);
    setCurrentUser(userId!);

    setTimeout(() => {
      setMessage(null);
      setCurrentUser(null);
    }, 3000);
  },[])
  
  
  return (
    <section>
      {message && (<p className='text-warning text-center'>{message}</p>)}
      {currentUser && (<h6 className='text-success text-center'>You're login as {currentUser}</h6>)}

      <MainHeader />

      <section className='container'>
        <RoomSearch />
        <RoomCarousel />
        <Parallax />
        <HotelService />
        <Parallax />
      </section>
    </section>
  );
};

export default Home;
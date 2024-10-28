import React from 'react';
import Room from './Room';

interface RoomListingProp {
  
}

const RoomListing: React.FC<RoomListingProp> = () => {
  
  return (
    <div className='bg-light'>
      <Room  />
    </div>
  );
};

export default RoomListing;
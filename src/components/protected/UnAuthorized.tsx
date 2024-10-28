import React from 'react';

interface UnAuthorizedProp {
  
}

const UnAuthorized: React.FC<UnAuthorizedProp> = () => {

  return (
    
      <div className='text-center my-3'>
        <h2 className=''>Unauthorized</h2>
        <p className=''>
          You are not authorized to access this route.
        </p>
      </div>
  );
};

export default UnAuthorized;
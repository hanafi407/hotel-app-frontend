
const MyComponent: React.FC = () => {

  return (
    <div>
      <div className='vh-100'></div>
      <button onClick={()=>scrollTo(0,0)}>To the tops</button>
    </div>
  );
};

export default MyComponent;
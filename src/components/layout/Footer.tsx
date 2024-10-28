const Footer: React.FC = () => {
  const date = new Date();
  return (
    <footer className='bg-dark text-light py-3 '>
      <p className='text-center'>&copy; {date.getFullYear()} Hanafi Hotel</p>
    </footer>
  );
};

export default Footer;

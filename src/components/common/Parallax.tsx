import { Container } from "react-bootstrap";

const Parallax: React.FC = () => {
  return (
    <header className="parallax mb-3">
      <Container className="p-5 text-center justify-content-center">
        <h1>Welcome to <span className="hotel-color">Hanafi Hotel</span></h1>
        <h3>We Offer the best services for all you needs</h3>
        
      </Container>
    </header>
  );
};

export default Parallax;
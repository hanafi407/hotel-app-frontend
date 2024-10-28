import { Card, Col, Container, Row } from "react-bootstrap";
import Header from "./Header";
import { FaClock, FaCocktail, FaParking, FaSnowflake, FaTshirt, FaUtensils, FaWifi } from "react-icons/fa";

const HotelService: React.FC = () => {
  return (
    <>
      <Container className='mb-2'>
        <Header title={"Our Services"} />
        <Row>
          <h4 className='text-center'>
            Services at <span className='hotel-color'>Hanafi</span> Hotel{" "}
            <span className='gap-2'>
              <FaClock /> - 24-Hour front desk
            </span>
          </h4>
          <hr />
          <Row xs={1} md={2} lg={3}>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title className='hotel-color'>
                    <FaWifi /> WiFi
                  </Card.Title>
                  <Card.Text>
                    Stay connected with high-speed internet access
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col>
              <Card>
                <Card.Body>
                  <Card.Title className='hotel-color'>
                    <FaUtensils /> Breakfast
                  </Card.Title>
                  <Card.Text>You can get free breakfast</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col>
              <Card>
                <Card.Body>
                  <Card.Title className='hotel-color'>
                    <FaTshirt /> Laundry
                  </Card.Title>
                  <Card.Text>
                    Keep your clothes is clean and fresh with our laundry
                    servcie
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col>
              <Card>
                <Card.Body>
                  <Card.Title className='hotel-color'>
                    <FaCocktail /> Bar
                  </Card.Title>
                  <Card.Text>
                    Enjoy drink and snack on our in-room bar.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col>
              <Card>
                <Card.Body>
                  <Card.Title className='hotel-color'>
                    <FaParking /> Parking
                  </Card.Title>
                  <Card.Text>
                    Park your car conveniently in our on-site parking lot
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col>
              <Card>
                <Card.Body>
                  <Card.Title className='hotel-color'>
                    <FaSnowflake /> Air Conditioning
                  </Card.Title>
                  <Card.Text>
                    Stay cool and confortable with our air conditioning system
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Row>
      </Container>
    </>
  );
};

export default HotelService;

import { useEffect, useState } from "react";
import { Room } from "../utils/types";
import { getAllRooms } from "../utils/ApiFunctions";
import SpinnerLoading from "./SpinnerLoading";
import { Link, useLocation } from "react-router-dom";
import { Card, Carousel, Col, Container, Row } from "react-bootstrap";

const RoomCarousel: React.FC = () => {
  const [rooms, setRooms] = useState<Room[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  useEffect(() => {
    
    setIsLoading(true);
    getAllRooms()
      .then((data) => {
        setRooms(data);
        setIsLoading(false);
        setSuccessMessage("Success load.");
      })
      .catch((e: any) => {
        setIsLoading(false);
        setErrorMessage(e.message);
      });
      
      
  }, []);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (errorMessage) {
    return <div className='text-danger my-5'>{errorMessage}</div>;
  }
  return (
    <section className='bg-light shadow my-5 p-3'>
      <Link to={"/browse-all-room"} className=' hotel-color text-center'>
        Browse All Room
      </Link>

      <Container>
        <Carousel className="border" indicators={false} >
          {[...Array(Math.ceil(rooms.length / 4))].map((_, index) => (
            <Carousel.Item key={index}>
              <Row className="">
                {rooms.slice(index * 4, index * 4 + 4).map((room) => (
                  <Col key={room.id} sm={12} md={6} lg={3}>
                    <Card>
                      <Link to={`/book-room/${room.id}`}>
                        <Card.Img
                          variant='top'
                          src={`data:image/png;base64, ${room.photo}`}
                          alt='Room Photo'
                          className='w-100'
                          style={{ height: "200px" }}
                        ></Card.Img>
                      </Link>
                      <Card.Body>
                        <Card.Title className='hotel-color'>
                          {room.roomType}
                        </Card.Title>
                        <Card.Title className='room-price'>
                          {room.roomPrice}/night
                        </Card.Title>

                        <div className='flex-shrink-0'>
                          <Link
                            to={`/book-room/${room.id}`}
                            className='btn btn-sm btn-hotel'
                          >
                            View/Book Now
                          </Link>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </section>
  );
};

export default RoomCarousel;

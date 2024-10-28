import React, { ChangeEvent, useState } from "react";
import { Room } from "../utils/types";
import moment from "moment";
import { getAvailableRoom } from "../utils/ApiFunctions";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import RoomTypeSelector from "./RoomTypeSelector";
import SpinnerLoading from "./SpinnerLoading";
import RoomSearchResult from "./RoomSearchResult";

interface RoomSearchProp {}

const RoomSearch: React.FC<RoomSearchProp> = () => {
  const [searchQuery, setSearchQuery] = useState<any>({
    roomType: "",
    checkInDate: "",
    checkOutDate: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [availableRoom, setAvailableRoom] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const checkIn = moment(searchQuery.checkInDate);
    const checkOut = moment(searchQuery.checkOutDate);
    if (!checkIn.isValid() || !checkOut.isValid()) {
      setErrorMessage("Please enter valid date range");
      return;
    }
    if (checkIn.isSameOrAfter(checkOut)) {
      setErrorMessage("Check in date must come first than check out date.");
    }
    setIsLoading(true);
    getAvailableRoom(
      searchQuery.checkInDate,
      searchQuery.checkOutDate,
      searchQuery.roomType
    )
      .then((response) => {
        setAvailableRoom(response!.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    const checkIn = moment(searchQuery.checkInDate);
    const checkOut = moment(searchQuery.checkOutDate);
    if (checkIn.isValid() && checkOut.isValid()) {
      setErrorMessage("");
    }
    setSearchQuery({ ...searchQuery, [name]: value });
  };

  const clearSearchQuery = () => {
    setSearchQuery({
      checkInDate: "",
      checkOutDate: "",
      roomType: "",
    });
    setAvailableRoom([]);
  };
  return (
    <>
      <Container className='my-5 py-5 shadow'>
        <Form onSubmit={handleSearch}>
          <Row className='justify-content-center'>
            <Col xs={12} md={3}>
              <Form.Group controlId='checkInDate'>
                <Form.Label>Check-in date</Form.Label>
                <Form.Control
                  type='date'
                  name='checkInDate'
                  value={searchQuery.checkInDate}
                  onChange={handleInputChange}
                  min={moment().format("YYYY-MM-DD")}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group controlId='checkOutDate'>
                <Form.Label>Check-out date</Form.Label>
                <Form.Control
                  type='date'
                  name='checkOutDate'
                  value={searchQuery.checkOutDate}
                  onChange={handleInputChange}
                  min={moment().format("YYYY-MM-DD")}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group controlId='roomType'>
                <Form.Label>Room Type</Form.Label>
                <div className='d-flex'>
                  <RoomTypeSelector
                    handleRoomInputChange={handleInputChange}
                    room={searchQuery}
                  />
                  <Button variant='secondary' type='submit'>
                    Search
                  </Button>
                </div>
              </Form.Group>
            </Col>
          </Row>
        </Form>
        {isLoading ? (
          <SpinnerLoading />
        ) : availableRoom ? (
          <RoomSearchResult
            onClearSearch={clearSearchQuery}
            results={availableRoom}
          />
        ) : (
          <p>No room available for the selected dates and room types.</p>
        )}
        {errorMessage && <p className='text-danger'>{errorMessage}</p>}
      </Container>
    </>
  );
};

export default RoomSearch;

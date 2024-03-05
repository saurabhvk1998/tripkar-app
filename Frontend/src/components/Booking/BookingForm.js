import React, { useState, useEffect } from "react";
import { Form, FormControl } from "react-bootstrap";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./BookingFormStyles.css";
import Navbar from "../Navbar";
import Footer from "../Footer";

import { useSelector } from "react-redux";

const BookingForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const userId = useSelector(state => state.id.value)//for managing userId

  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [booking, setBooking] = useState({
    guestFullName: "",
    guestEmail: "",
    checkInDate: "",
    checkOutDate: "",
    numOfGuests: "",
    heading: "",
    price: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/trips/${id}`);
        const { heading, price, description, image } = response.data;
        setBooking((prevBooking) => ({
          ...prevBooking,
          heading,
          price,
          description,
          image,
        }));
      } catch (error) {
        console.error("Error fetching trip details:", error);
        setErrorMessage(
          "Failed to fetch trip details. Please try again later."
        );
      }
    };

    fetchTripDetails();
  }, [id]);

  useEffect(() => {
    // Redirect to booking page without unwanted query parameters
    navigate(`/booking/${id}`);
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: value });
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (
      form.checkValidity() === false ||
      !isCheckInDateValid() ||
      !isCheckOutDateValid() ||
      !isNumOfGuestsValid()
    ) {
      setValidated(true); // Set validated to true to trigger feedback
      e.stopPropagation();
    } else {
      try {
        const dataToSend = {
          guestFullName: booking.guestFullName,
          guestEmail: booking.guestEmail,
          checkInDate: booking.checkInDate,
          checkOutDate: booking.checkOutDate,
          numOfGuests: booking.numOfGuests,
          heading: booking.heading,
          price: calculateTotalPrice(),
          userId: userId,
        };
        console.log(dataToSend)
        const response = await axios.post(
          "http://localhost:8080/booking",
          dataToSend
        );
        if (response.status >= 200 && response.status < 300) {
          const { bookingId } = response.data;
          navigate(`/booking-details`, { state: { booking: dataToSend } });
        } else {
          throw new Error("Failed to save booking details");
        }
      } catch (error) {
        console.error("Error saving booking details:", error);
        setErrorMessage(
          "Failed to save booking details. Please try again later."
        );
      }
    }
  };

  const isCheckInDateValid = () => {
    if (
      !booking.checkInDate ||
      !moment(booking.checkInDate, "YYYY-MM-DD").isValid()
    ) {
      console.log("Check-in date is invalid");
      setErrorMessage("Please select a valid check-in date.");
      return false;
    } else {
      console.log("Check-in date is valid");
      setErrorMessage("");
      return true;
    }
  };

  const isCheckOutDateValid = () => {
    if (
      !booking.checkOutDate ||
      !moment(booking.checkOutDate, "YYYY-MM-DD").isValid() ||
      !moment(booking.checkOutDate, "YYYY-MM-DD").isAfter(
        moment(booking.checkInDate, "YYYY-MM-DD")
      )
    ) {
      console.log("Check-out date is invalid");
      setErrorMessage("Please select a valid check-out date.");
      return false;
    } else {
      console.log("Check-out date is valid");
      setErrorMessage("");
      return true;
    }
  };

  const isNumOfGuestsValid = () => {
    if (
      !booking.numOfGuests ||
      parseInt(booking.numOfGuests) < 1 ||
      parseInt(booking.numOfGuests) > 5
    ) {
      console.log("Number of guests is invalid");
      setErrorMessage("Please enter a number of guests between 1 and 5.");
      return false;
    } else {
      console.log("Number of guests is valid");
      setErrorMessage("");
      return true;
    }
  };

  const calculateTotalPrice = () => {
    const { price, checkInDate, checkOutDate } = booking;
    const numberOfDays = moment(checkOutDate, "YYYY-MM-DD").diff(
      moment(checkInDate, "YYYY-MM-DD"),
      "days"
    );
    const totalPrice = price * numberOfDays;
    return isNaN(totalPrice) ? 0 : totalPrice;
  };

  return (
    <div>
      <Navbar />

      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="bd">
              <h2>Reservation Details</h2>
              <p>
                <strong></strong> {booking.heading}
              </p>
              <p>
                <strong></strong> ₹{booking.price} per night
              </p>
              <p>
                <strong></strong> {booking.description}
              </p>
              <p>
              <img src={booking.image} alt="Trip" />
              </p>
            </div>
            <div class="additional-details">
              <h3>What this place offers</h3>
              <ul class="offer-list">
                <li>
                  <i class="fas fa-utensils"></i> Kitchen
                </li>
                <li>
                  <i class="fas fa-parking"></i> Free parking on premises
                </li>
                <li>
                  <i class="fas fa-swimming-pool"></i> Private pool
                </li>
                <li>
                  <i class="fas fa-snowflake"></i> Air conditioning
                </li>
                <li>
                  <i class="fas fa-tree"></i> Garden
                </li>
                <li>
                  <i class="fas fa-smoking-ban"></i> No smoking allowed
                </li>
                <li>
                  <i class="fas fa-bell"></i> Carbon monoxide alarm
                </li>
                <li>
                  <i class="fas fa-fire"></i> Smoke alarm
                </li>
                <li>
                  <i className="fas fa-bed"></i> Double Room
                </li>
                <li>
                  <i className="fas fa-bed"></i> Family Room
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-6">
            <div className="booking-form-container">
              <h2>Reservation Form</h2>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId="guestFullName">
                  <Form.Label className="label">Full Name</Form.Label>
                  <FormControl
                    required
                    type="text"
                    name="guestFullName"
                    value={booking.guestFullName}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="guestEmail">
                  <Form.Label className="label">Email</Form.Label>
                  <FormControl
                    required
                    type="email"
                    name="guestEmail"
                    value={booking.guestEmail}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="checkInDate">
                  <Form.Label className="label">Check-in Date</Form.Label>
                  <FormControl
                    required
                    type="date"
                    name="checkInDate"
                    value={booking.checkInDate}
                    onChange={handleInputChange}
                    min={moment().format("YYYY-MM-DD")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errorMessage}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="checkOutDate">
                  <Form.Label className="label">Check-out Date</Form.Label>
                  <FormControl
                    required
                    type="date"
                    name="checkOutDate"
                    value={booking.checkOutDate}
                    onChange={handleInputChange}
                    min={moment(booking.checkInDate)
                      .add(1, "day")
                      .format("YYYY-MM-DD")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errorMessage}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="numOfGuests">
                  <Form.Label className="label">Number of Guests (Max:5)</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    name="numOfGuests"
                    value={booking.numOfGuests}
                    onChange={handleInputChange}
                    min={1}
                    max={5}
                  />
                  {errorMessage &&
                    errorMessage.includes("Number of guests") && (
                      <Form.Control.Feedback type="invalid">
                        {errorMessage}
                      </Form.Control.Feedback>
                    )}
                </Form.Group>
                <div className="form-group mt-4 mb-2">
                  <p>Total Price: ₹{calculateTotalPrice()}</p>
                  <br />
                  <button type="submit" className="continue">
                    Continue
                  </button>
                </div>
              </Form>

              {errorMessage && <p className="text-danger">{errorMessage}</p>}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default BookingForm;

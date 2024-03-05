import React from "react";
import { useLocation } from "react-router-dom";
import "./BookingDetailsStyles.css";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Hero from "../Hero";
import AboutImg from "../../assets/reservationbg.jpg"


const BookingDetails = () => {
  const location = useLocation();
  const booking = location.state?.booking; // Access booking details from location state

  return (
    <div>
      <Navbar />
      <Hero cName="hero-mid" heroImg={AboutImg} title="Reservation Details" btnClass="hide"/>
      <div className="booking-details-container">
        {/* <h1>Reservation Details</h1> */}
        <div className="booking-details">
          <p>
            <strong>Destination:</strong> {booking?.heading}
          </p>
          <p>
            <strong>Full Name:</strong> {booking?.guestFullName}
          </p>
          <p>
            <strong>Email:</strong> {booking?.guestEmail}
          </p>
          <p>
            <strong>Check-in Date:</strong> {booking?.checkInDate}
          </p>
          <p>
            <strong>Check-out Date:</strong> {booking?.checkOutDate}
          </p>
          <p>
            <strong>Number of Guests:</strong> {booking?.numOfGuests}
          </p>
          <p>
            <strong>Total Price:</strong> {booking?.price}
          </p>
        </div>
        <h2 className="booking-confirmed">Booking Confirmed...!</h2>
      </div>
      <Footer />
    </div>
  );
};

export default BookingDetails;

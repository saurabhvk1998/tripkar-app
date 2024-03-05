import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import "./CreateTours.css"; // Updated CSS file
import Footer from "../Footer";
import AboutImg from '../../assets/admin-page.jpg';
import Hero from "../Hero";

const Tours = () => {
  const [newTour, setNewTour] = useState({
    heading: "",
    description: "",
    price: "",
    image: "", // Change to hold image URL
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const addTour = async () => {
    try {
      // Validate fields
      if (
        !newTour.heading ||
        !newTour.description ||
        !newTour.price ||
        !newTour.image
      ) {
        throw new Error("Please fill in all fields and provide an image URL.");
      }

      // Validate price (accept only numbers)
      if (isNaN(newTour.price)) {
        throw new Error("Price must be a number.");
      }

      console.log(newTour);

      // Send data to the server
      await axios.post("http://localhost:8080/trips", newTour, {
        headers: {
          // "Content-Type": "multipart/form-data",
          "Content-Type": "application/json",
        },
      });

      setSuccessMessage("Tour added successfully");
      setNewTour({
        heading: "",
        description: "",
        price: "",
        image: "",
      });
    } catch (error) {
      setErrorMessage(error.message || "Error adding tour");
    } finally {
      // Clear success and error messages after 5 seconds
      setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 5000);
    }
  };

  return (
    <div className="mainPage">
      <Navbar />
      <Hero cName="hero-mid" heroImg={AboutImg} title="Admin" btnClass="hide"/>
      <div className="center-container-admin">
        <h1>Tours</h1>
        <h2>Add New Tour</h2>
        {successMessage && (
          <p className="success-message-admin-createTour">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="error-message-admin-createTour">{errorMessage}</p>
        )}
        <div className="createTours-container-heading">
          <input
            type="text"
            placeholder="Heading"
            value={newTour.heading}
            onChange={(e) =>
              setNewTour({ ...newTour, heading: e.target.value })
            }
          />
        </div>
        <div className="createTour-container-price">
          <input
            type="text"
            placeholder="Price"
            value={newTour.price}
            onChange={(e) => setNewTour({ ...newTour, price: e.target.value })}
          />
        </div>
        <div className="createTours-container-description">
          <textarea
            placeholder="Description"
            value={newTour.description}
            onChange={(e) =>
              setNewTour({ ...newTour, description: e.target.value })
            }
          ></textarea>
        </div>
        <div className="imageInput-container-admin">
          <input
            type="text"
            placeholder="Image URL"
            value={newTour.image}
            onChange={(e) => setNewTour({ ...newTour, image: e.target.value })}
          />
          {/* Render image preview */}
          {newTour.image && (
            <img
              src={newTour.image}
              alt="Preview"
              className="image-preview-admin"
            />
          )}
        </div>
        <button onClick={addTour} className="addTour-button">
          Add Tour
        </button>
        {/* Container for buttons */}
        <div>
          <Link to="/alltours" className="addTour-button">
            All Tours
          </Link>
          <Link to="/allusers" className="addTour-button">
            All Users
          </Link>
          <Link to="/enquiry" className="addTour-button">
            Enquiry
          </Link>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Tours;

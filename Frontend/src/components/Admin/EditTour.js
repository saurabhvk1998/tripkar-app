// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import Navbar from "../Navbar";
// import "./EditTour.css";
// import Footer from "../Footer";
// import AboutImg from "../../assets/admin-page.jpg";
// import Hero from "../Hero";

// function EditTour() {
//   const { tourId } = useParams();
//   const [tour, setTour] = useState(null);
//   const [editedTour, setEditedTour] = useState({
//     id: "",
//     heading: "",
//     description: "",
//     price: "",
//     image: "",
//     newImage: "", // New image URL
//   });
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [imagePreview, setImagePreview] = useState(null); // State to hold image preview

//   useEffect(() => {
//     // Fetch tour data by ID
//     const fetchTourById = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8080/trips/${tourId}`
//         );
//         setTour(response.data);
//         // Initialize editedTour state with fetched data
//         setEditedTour(response.data);
//         // Set image preview
//         setImagePreview(response.data.image);
//       } catch (error) {
//         console.error("Error fetching tour:", error);
//       }
//     };

//     // Call the fetch function
//     fetchTourById();

//     // Cleanup function (optional)
//     return () => {
//       // Any cleanup code can go here
//     };
//   }, [tourId]); // Fetch data when tourId changes

//   // Handle changes in the input fields
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     // If the changed input is for the image URL
//     if (name === "newImage") {
//       // Set the image preview
//       setImagePreview(value);
//     }

//     // Update the editedTour state
//     setEditedTour((prevTour) => ({
//       ...prevTour,
//       [name]: value,
//     }));
//   };

//   // Handle update click
//   const handleUpdateClick = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("id", editedTour.id);
//       formData.append("heading", editedTour.heading);
//       formData.append("description", editedTour.description);
//       formData.append("price", editedTour.price);
//       // Append the image URL
//       formData.append("image", editedTour.newImage); // Use newImage

//       console.log("FormData:", formData); // Log FormData object

//       await axios.put(`http://localhost:8080/trips/${tourId}`, formData, {
//         headers: {
//           // "Content-Type": "multipart/form-data",
//           "Content-Type": "application/json",
//         },
//       });

//       // Optionally, you can re-fetch the updated data
//       const response = await axios.get(`http://localhost:8080/trips/${tourId}`);
//       setTour(response.data);
//       setSuccessMessage("Updated successfully");
//       // Hide success message after 5 seconds
//       setTimeout(() => {
//         setSuccessMessage("");
//       }, 5000);
//     } catch (error) {
//       console.error("Error updating tour:", error);
//       setErrorMessage("Error updating tour. Please try again."); // Set error message
//       // Hide error message after 5 seconds
//       setTimeout(() => {
//         setErrorMessage("");
//       }, 5000);
//     }
//   };

//   // Render loading state if tour data is being fetched
//   if (!tour) {
//     return <div>Loading...</div>;
//   }

//   // Render tour details once data is fetched
//   return (
//     <div>
//       <Navbar />
//       <Hero cName="hero-mid" heroImg={AboutImg} title="Admin" btnClass="hide" />
//       <div className="editTour-mainContainer-admin">
//         <h1>Edit Tour With Id: {tourId}</h1>
//         <div>
//           <label htmlFor="id">ID:</label>
//           <input
//             type="text"
//             id="editTour-id"
//             name="id"
//             value={editedTour.id}
//             readOnly // This makes the input read-only
//           />
//         </div>
//         <div>
//           <label htmlFor="heading">Heading:</label>
//           <input
//             type="text"
//             id="editTour-heading"
//             name="heading"
//             value={editedTour.heading}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="description">Description:</label>
//           <textarea
//             id="editTour-description"
//             name="description"
//             value={editedTour.description}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="price">Price:</label>
//           <input
//             type="text"
//             id="editTour-price"
//             name="price"
//             value={editedTour.price}
//             onChange={handleInputChange}
//           />
//         </div>
//         {/* Image preview */}
//         {imagePreview && (
//           <div>
//             <h2>Image Preview</h2>
//             <img
//               src={imagePreview}
//               alt="Image Preview"
//               className="editTour-preview-image-admin"
//             />
//           </div>
//         )}
//         {/* Input field for entering the image URL */}
//         <div>
//           <label htmlFor="newImage">Image URL:</label>
//           <input
//             type="text"
//             id="editTour-newImage"
//             name="newImage"
//             value={editedTour.newImage}
//             onChange={handleInputChange}
//           />
//         </div>

//         {/* Add a link to trigger the update */}
//         <div className="editTour-button-container-admin">
//           <a
//             href="#"
//             className="editTour-button-like-link-admin"
//             onClick={handleUpdateClick}
//           >
//             Update
//           </a>
//         </div>
//         {/* Render success message if update is successful */}
//         {successMessage && (
//           <p className="success-Message-editTour">{successMessage}</p>
//         )}
//         {/* Render error message if there's an error */}
//         {errorMessage && (
//           <p className="error-Message-editTour">{errorMessage}</p>
//         )}
//         <div className="editTour-button-container-admin">
//           {/* Button to navigate to AllUsers page */}
//           <Link to="/allusers" className="editTour-button-like-link-admin">
//             All Users
//           </Link>

//           {/* Button to navigate to CreateTour page */}
//           <Link to="/createtour" className="editTour-button-like-link-admin">
//             Create Tours
//           </Link>

//           <Link to="/alltours" className="editTour-button-like-link-admin">
//             All Tours
//           </Link>

//           <Link to="/enquiry" className="editTour-button-like-link-admin">
//             Enquiry
//           </Link>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default EditTour;








import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";
import "./EditTour.css";
import Footer from "../Footer";
import AboutImg from "../../assets/admin-page.jpg";
import Hero from "../Hero";

function EditTour() {
  const { tourId } = useParams();
  const [tour, setTour] = useState(null);
  const [editedTour, setEditedTour] = useState({
    id: "",
    heading: "",
    description: "",
    price: "",
    image: "" // New field for image
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchTourById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/trips/${tourId}`
        );
        setTour(response.data);
        setEditedTour(response.data);
      } catch (error) {
        console.error("Error fetching tour:", error);
      }
    };

    fetchTourById();

    return () => {
      // Cleanup code if needed
    };
  }, [tourId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setEditedTour((prevTour) => ({
      ...prevTour,
      [name]: value
    }));
  };

  const handleUpdateClick = async () => {
    try {
      await axios.put(`http://localhost:8080/trips/${tourId}`, editedTour, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      const response = await axios.get(`http://localhost:8080/trips/${tourId}`);
      setTour(response.data);
      setSuccessMessage("Updated successfully");
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    } catch (error) {
      console.error("Error updating tour:", error);
      setErrorMessage("Error updating tour. Please try again.");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  if (!tour) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <Hero cName="hero-mid" heroImg={AboutImg} title="Admin" btnClass="hide" />
      <div className="editTour-mainContainer-admin">
        <h1>Edit Tour With Id: {tourId}</h1>
        <div>
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            id="editTour-id"
            name="id"
            value={editedTour.id}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="heading">Heading:</label>
          <input
            type="text"
            id="editTour-heading"
            name="heading"
            value={editedTour.heading}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="editTour-description"
            name="description"
            value={editedTour.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="editTour-price"
            name="price"
            value={editedTour.price}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="image">image:</label>
          <input
            type="text"
            id="editTour-image"
            name="image"
            value={editedTour.image}
            onChange={handleInputChange}
          />
        </div>

        <div className="editTour-button-container-admin">
          <a
            href="#"
            className="editTour-button-like-link-admin"
            onClick={handleUpdateClick}
          >
            Update
          </a>
        </div>

        {successMessage && (
          <p className="success-Message-editTour">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="error-Message-editTour">{errorMessage}</p>
        )}
        <div className="editTour-button-container-admin">
          <Link to="/allusers" className="editTour-button-like-link-admin">
            All Users
          </Link>

          <Link to="/createtour" className="editTour-button-like-link-admin">
            Create Tours
          </Link>

          <Link to="/alltours" className="editTour-button-like-link-admin">
            All Tours
          </Link>

          <Link to="/enquiry" className="editTour-button-like-link-admin">
            Enquiry
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EditTour;

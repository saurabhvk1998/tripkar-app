import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Hero from "../Hero";
import AllUsersImg from '../../assets/admin-page.jpg';
import "./Enquiry.css"; // Import the CSS file

const Enquiry = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [userNames, setUserNames] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const allUserNames = [...new Set(users.map((user) => user.name))];
    setUserNames(allUserNames);
  }, [users]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/enquiry");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching enquiry:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/enquiry/${id}`);
      fetchUsers();
      setSuccessMessage("enquiry deleted successfully");
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    } catch (error) {
      console.error("Error deleting enquiry:", error);
      setErrorMessage("Error deleting enquiry. Please try again.");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  const handleDropdownChange = (e) => {
    setSelectedUser(e.target.value);
  };

  const filteredUsers = selectedUser
    ? users.filter((user) => user.name === selectedUser)
    : users;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <Navbar />
      <Hero cName="hero-mid" heroImg={AllUsersImg} title="Admin" btnClass="hide"/>
      <div className="enquiry-container-admin">
        <h1 className="enquiry-heading-admin">Enquiry</h1>
        <div className="enquiry-button-container-admin">
        <Link to="/allusers" className="enquiry-button-like-link-admin">
            All Users
          </Link>
          <Link to="/alltours" className="enquiry-button-like-link-admin">
            All Tours
          </Link>
          <Link to="/createtour" className="enquiry-button-like-link-admin">
            Create Tours
          </Link>
        </div>
        <div className="enquiry-dropdown-container-admin">
          <select value={selectedUser} onChange={handleDropdownChange}>
            <option value="">All Users</option>
            {userNames.map((userName) => (
              <option key={userName} value={userName}>
                {userName}
              </option>
            ))}
          </select>
        </div>
        <div className="enquiry-table-container-admin">
          <table className="enquiry-table-admin">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.subject}</td>
                  <td>{user.message}</td>
                  <td>
                    <a
                      href="#"
                      className="deleteButton-enquiry"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {successMessage && (
        <p className="success-message-enquiry">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="error-message-enquiry">{errorMessage}</p>
      )}
      <a href="#" className="enquiry-scroll-to-top-link-admin" onClick={scrollToTop}>
        Scroll to Top
      </a>
      <Footer/>
    </div>
  );
};

export default Enquiry;

import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './routes/Home';
import About from './routes/About';
import Service from './routes/Service';
import Contact from './routes/Contact';
import Login from './routes/Login';
import Register from './routes/Register';
import Trip from './components/Trip';
import BookingForm from './components/Booking/BookingForm';
import BookingDetails from './components/Booking/BookingDetails';
import Tours from './components/Admin/CreateTours';
import AllTours from './components/Admin/AllTours';
import AllUsers from './components/Admin/AllUsers';
import EditTour from './components/Admin/EditTour';
import Enquiry from './components/Admin/Enquiry';
import MyBooking from './components/MyBooking';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/service" element={<Service />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/trip" element={<Trip />} />
      <Route path="/booking/:id" element={<BookingForm />} />
      <Route path="/booking-details/:id" element={<BookingDetails />} />
      <Route path="/booking-details" element={<BookingDetails />} />
      <Route path="/createtour" element={<Tours/>} />
      <Route path="/alltours" element={<AllTours/>} />
      <Route path="/allusers" element={<AllUsers/>} />
      <Route path="/edittour/:tourId" element={<EditTour />} />
      <Route path="/MyBooking" element={<MyBooking/>} />
      <Route path="/enquiry" element={<Enquiry/>} />
      </Routes>
    </div>
  );
}

export default App;

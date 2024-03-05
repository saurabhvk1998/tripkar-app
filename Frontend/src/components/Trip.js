import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import TripDataComponent from './TripData'; 
import './TripStyles.css';

function Trip() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get('http://localhost:8080/trips'); 
        setTrips(response.data);
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    };

    fetchTrips();
  }, []);

  return (
    <div className="trip">
      <h1>Recent Trips</h1>
      <p>You can discover unique destinations</p>
      <div className="tripcard">
        {trips.map(trip => (
          <TripDataComponent
            key={trip.id}
            image={trip.image} 
            heading={trip.heading}
            text={trip.description}
            id={trip.id}
            price={trip.price}
          />
        ))}
      </div>
    </div>
  );
}

export default Trip;

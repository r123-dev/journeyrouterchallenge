import React from "react";
import { useLocation } from "react-router-dom";
import "./adhar.css";

const Adhar = () => {
  const location = useLocation();
  const { userDetails, uid } = location.state;

  return (
    <div className="aadhar-card-container">
      <div className="aadhar-card">
        <div className="aadhar-header">
          <h2>Aadhar Card</h2>
          <div className="aadhar-uid">
            <p><strong>UID:</strong> {uid}</p>
          </div>
        </div>
        <div className="aadhar-details">
          <p><strong>Name:</strong> {userDetails.fullName}</p>
          <p><strong>Date of Birth:</strong> {userDetails.dob}</p>
          <p><strong>Address:</strong> {userDetails.address}</p>
          <p><strong>Contact Information:</strong> {userDetails.contact}</p>
        </div>
      </div>
    </div>
  );
};

export default Adhar;

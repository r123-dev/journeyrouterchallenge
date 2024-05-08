import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./User.css";

const User = ({ onUIDReceived }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    address: "",
    contact: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      // if (!response.ok) {
      // mbmm  throw new Error("Failed to register user");
      // }
      const data = await response.json();
      navigate("/aadhar", { state: { userDetails: formData, uid: data.uid } });
   
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="user-container">
      <h2>Enter User Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="contact">Contact Information:</label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleInputChange}
            required
          />
        </div>
        <button className="submit-btn" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default User;

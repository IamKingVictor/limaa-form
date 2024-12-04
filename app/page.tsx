"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import Select from "react-select";
import countries from "world-countries";
import { zones } from "./zones"; // Import the zones
import Header from "./Header"; 


interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  kingschat_username: string;
  country: { label: string; value: string } | null;
  zone: { label: string; value: string } | null; // Added zone to the interface
}

const UserRegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    kingschat_username: "",
    country: null,
    zone: null, // Initialize zone
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const countryOptions = countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
  }));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCountryChange = (selectedOption: { label: string; value: string } | null) => {
    setFormData((prevState) => ({
      ...prevState,
      country: selectedOption,
    }));
  };

  const handleZoneChange = (selectedOption: { label: string; value: string } | null) => {
    setFormData((prevState) => ({
      ...prevState,
      zone: selectedOption,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || 
        !formData.kingschat_username || !formData.country || !formData.zone) {
      alert("Please fill in all required fields");
      return;
    }
  
    // Prevent multiple submissions
    if (isSubmitting) return;
  
    try {
      setIsSubmitting(true);
  
      // Construct the data payload
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber || "", // Ensure phoneNumber is always a string
        kingschat_username: formData.kingschat_username,
        country: formData.country?.label || "",
        zone: formData.zone?.label || "", // Add zone to payload
      };
  
      // Make the API request
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      // Log the raw response for debugging
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
  
      // Try to parse response body
      let responseData;
      try {
        responseData = await response.json();
        console.log('Response body:', responseData);
      } catch (parseError) {
        console.error('Failed to parse response:', parseError);
        alert('Failed to parse server response');
        return;
      }
  
      if (response.ok) {
        // Reset the form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          kingschat_username: "",
          country: null,
          zone: null, // Reset zone
        });
        
        alert("Registration successful!");
      } else {
        // Handle error responses
        console.error("Registration failed:", responseData);
        alert(`Registration failed: ${responseData?.error || responseData?.message || "Please try again"}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      
      // More detailed error handling
      if (error instanceof TypeError) {
        alert("Network error. Please check your internet connection.");
      } else if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      } else {
        alert("An unexpected error occurred during registration.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen p-4 flex flex-col items-center justify-center">
      <Header />

      {/* Background Gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: -2,
          background: "linear-gradient(135deg, #BF9B30 0%, #800080 100%)", // Gold to Purple gradient
        }}
      />

      <div className="bg-white/20 backdrop-blur-lg rounded-xl p-8 w-full max-w-md shadow-2xl mt-12 md:mt-20">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-white mb-2">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-white mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-white mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-white mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div>
            <label htmlFor="kingschat_username" className="block text-white mb-2">
              Kings Chat Username
            </label>
            <input
              type="text"
              id="kingschat_username"
              name="kingschat_username"
              value={formData.kingschat_username}
              onChange={handleChange}
              placeholder="Enter KingsChat handle"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div>
            <label htmlFor="country" className="block text-white mb-2">
              Country
            </label>
            <Select
              id="country"
              instanceId="country-select"
              options={countryOptions}
              value={formData.country}
              onChange={handleCountryChange}
              placeholder="Select your country"
              className="text-black"
            />
          </div>
          <div>
            <label htmlFor="zone" className="block text-white mb-2">
              Zone
            </label>
            <Select
              id="zone"
              instanceId="zone-select"
              options={zones}
              value={formData.zone}
              onChange={handleZoneChange}
              placeholder="Select your zone"
              className="text-black"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 mt-4 bg-yellow-600 text-black font-bold rounded-md hover:bg-yellow-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserRegistrationForm;
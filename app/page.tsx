"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import Select from "react-select";
import countries from "world-countries";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  kingschat_username: string;
  country: { label: string; value: string } | null;
}

const UserRegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    kingschat_username: "",
    country: null,
  });

  // Generate country options
  const countryOptions = countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
  }));

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle country selection changes
  const handleCountryChange = (selectedOption: { label: string; value: string } | null) => {
    setFormData((prevState) => ({
      ...prevState,
      country: selectedOption,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          kingschat_username: formData.kingschat_username,
          country: formData.country?.label || "",
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Registration successful:", result);
        alert("Registration successful!");

        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          kingschat_username: "",
          country: null,
        });
      } else {
        const errorResult = await response.json();
        console.error("Registration failed:", errorResult);
        alert(`Registration failed: ${errorResult.message}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred during registration");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(135deg, black 0%, #BF9B30 100%)",
      }}
    >
      <div className="bg-white/20 backdrop-blur-lg rounded-xl p-8 w-full max-w-md shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-white text-center">
          User Registration
        </h2>
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md 
                         bg-white/10 text-white placeholder-gray-300 
                         focus:outline-none focus:ring-2 focus:ring-gold-500"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md 
                         bg-white/10 text-white placeholder-gray-300 
                         focus:outline-none focus:ring-2 focus:ring-gold-500"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md 
                         bg-white/10 text-white placeholder-gray-300 
                         focus:outline-none focus:ring-2 focus:ring-gold-500"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md 
                         bg-white/10 text-white placeholder-gray-300 
                         focus:outline-none focus:ring-2 focus:ring-gold-500"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md 
                         bg-white/10 text-white placeholder-gray-300 
                         focus:outline-none focus:ring-2 focus:ring-gold-500"
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
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-yellow-600 text-black 
                       font-bold rounded-md hover:bg-yellow-700 
                       transition-colors duration-300 
                       focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserRegistrationForm;

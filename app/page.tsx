"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import Select from "react-select";
import countries from "world-countries";
import Header from "./Header"; 
import Image from "next/image";

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // ... API submission logic here
  };

  return (
    <div className="relative min-h-screen p-4 flex flex-col items-center justify-center">
     
      <Header />

      {/* Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: -1,
          mixBlendMode: "overlay",
        }}
      >
        <Image
          src="/LIMA 2.jpg"
          alt="Background"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          priority
        />
      </div>

    
      <div
        style={{
          background: "linear-gradient(135deg, black 0%, #BF9B30 100%)",
          position: "absolute",
          inset: 0,
          zIndex: -2,
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
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-yellow-600 text-black font-bold rounded-md hover:bg-yellow-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserRegistrationForm;
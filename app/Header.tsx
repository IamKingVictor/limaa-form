"use client";

import React from "react";
import Image from "next/image";

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 w-full flex flex-col rounded-3xl shadow-2xl md:flex-row items-center justify-between p-4 md:py-6 md:px-8 bg-white/20 backdrop-blur-lg z-10">
      <div className="flex items-center md:justify-start w-full">
        
        <div className="relative mr-4">
          <Image
            src="/BLW.png"
            alt="Logo"
            width={80}
            height={80}
            className="rounded-full w-full shadow-md object-cover"
          />
        </div>

       
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center md:text-center px-4 md:px-0 w-full md:w-auto font-sans tracking-tight">
          LOVEWORLD INTERNATIONAL MUSIC AND ARTS AWARDS REGISTRATION
        </h2>
      </div>
    </header>
  );
};

export default Header;
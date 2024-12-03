import React from 'react';

interface Success {
  isOpen: boolean;
  isSuccess: boolean;
  onClose: () => void;
}

const Success: React.FC<Success> = ({ isOpen, isSuccess, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">
            {isSuccess ? 'Registration Successful' : 'Error'}
          </h3>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <p className="text-gray-700">
          {isSuccess
            ? 'Thank you for registering. We will get in touch with you soon.'
            : 'Please make sure all required fields are filled out correctly.'}
        </p>
      </div>
    </div>
  );
};

export default Success;
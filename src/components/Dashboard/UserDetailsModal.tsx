import React from 'react';

interface UserDetailsModalProps {
  user: any;
  onClose: () => void;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out translate-y-5 opacity-0 scale-95 animate-modal space-y-4">
        <h3 className="text-2xl font-bold ">User Details</h3>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Status:</strong> {user.status}  {/* Blinking symbol for active users */}
        {user.status === 'active' && (
          <div className="blink-symbol">●</div>
        )}</p>
        
       
        
        <button
          onClick={onClose} 
          className="bg-red-500 text-white py-2 px-4 rounded mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UserDetailsModal;

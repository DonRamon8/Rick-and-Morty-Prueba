import React from 'react';
import './UserProfile.css'; 

const UserProfile = ({ user }) => {
  return (
    <div className="user-profile">
      <img src={user.avatar} alt="User Avatar" className="avatar" />
      <span className="user-name">{user.name}</span>
    </div>
  );
};

export default UserProfile;

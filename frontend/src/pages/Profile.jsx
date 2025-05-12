import { useState } from 'react';
import { useAppContext } from "../context/AppContext";
import Footer from '../components/Footer';
import "../styles/Profile.css";

const Profile = () => {

const { userId, userEmail, userRole} = useAppContext();

return(
    <div className = "profile-wrapper">
        <h2>Your Profile</h2>
        <h3>View your account details below</h3>
        <div className="profile-info">
        <p>Member ID: {userId}</p>
        <p>Email: {userEmail}</p>
        <p>Role: {userRole || 'Guest'}</p>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;

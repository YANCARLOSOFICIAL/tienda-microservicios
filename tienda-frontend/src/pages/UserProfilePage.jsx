import React, { useState, useEffect } from 'react';
import axiosInstance from '../config/axiosConfig';

const UserProfile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    axiosInstance.get('/users/profile', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
      });
  }, []);

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserProfile;

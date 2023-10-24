// import React from 'react';
// import {Link} from 'react-router-dom'
import React, { useEffect, useState } from 'react';
// import { UseUserAuth } from './context/UserAuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import './welcomepage.css';

function WelcomePage(){
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
        navigate('/'); // Redirect to login if not logged in
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  const handleLogout = () => {
    // Implement your logout logic here
    signOut(auth) // Sign the user out
      .then(() => {
        // Redirect to the login page after logging out
        navigate('/');
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  };
  return (
    <div className="welcome-page">
      
      <h1>Welcome to the - devDeakin</h1>
     
      <h2>I hope this site will be helpful for you</h2>
      <h3>To know more about our site please expore and stay tuned!!</h3>

     
      <button onClick={handleLogout}  >
      LogOut 
      
      </button>
    </div>
  );
};

export default WelcomePage;

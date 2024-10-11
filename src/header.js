import React from 'react';
import Vinayaka from "./vinayaka.svg";
import initialUsers from './Data'; // Adjust the import based on your file structure

const Header = ({isLoggedIn}) => {
  // Calculate total collections
  const totalCollections = initialUsers.reduce((total, user) => {
    return total + user.payment_history.reduce((sum, payment) => sum + payment.paid_amount, 0);
  }, 0);

  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid d-flex justify-content-between">
        {/* Logo */}
        <a className="navbar-brand" href="#">
          <img
            src={Vinayaka} // Replace with your logo URL
            alt="Logo"
            width="50"
            height="40"
          />
        </a>
        {isLoggedIn && (
          <div className="navbar-text">
            <strong>Total Collections: Rs {totalCollections}</strong>
          </div>
        )}

      </div>
    </header>
  );
};

export default Header;

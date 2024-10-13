import React, { useState } from "react";
import initialUsers from "./Data";

const handleClick = (phoneNumber) => {
  const whatsappUrl = `https://wa.me/${phoneNumber}`;
  window.open(whatsappUrl, "_blank");
};

const handleGooglePayClick = () => {
  const googlePayUrl = `intent://#Intent;scheme=upi;package=com.google.android.apps.nbu.paisa.user;end`;

  window.location.href = googlePayUrl;
};

const monthOrder = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

const AdminList = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState({ userId: null, month: null, field: null });
  const [newAmount, setNewAmount] = useState("");

  // Filter users based on search term
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (userId, field, month = null) => {
    setIsEditing({ userId, field, month });
  };
  const handleDeleteUser = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  const handleSaveClick = (userId, field, month = null) => {
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        if (field === "borrowed_amount") {
          return { ...user, borrowed_amount: parseInt(newAmount, 10) };
        } else if (field === "paid_amount" && month) {
          const updatedPaymentHistory = user.payment_history.map((payment) => {
            if (payment.month === month) {
              return { ...payment, paid_amount: parseInt(newAmount, 10) };
            }
            return payment;
          });
          return { ...user, payment_history: updatedPaymentHistory };
        }
      }
      return user;
    });
    setUsers(updatedUsers);
    setIsEditing({ userId: null, month: null, field: null });
    setNewAmount("");
  };

  return (
    <>
      {/* Search Input */}
      <div className="mb-3 mt-2">
        <input
          type="text"
          placeholder="Search by name"
          className="form-control"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredUsers.map((user) => {
        // Get the last contributed month and total amount paid
        const lastContribution = user.payment_history.reduce((latest, current) => {
          if (current.paid_amount > 0) {
            const currentMonthValue = monthOrder[current.month];
            const latestMonthValue = latest ? monthOrder[latest.month] : 0;
            return currentMonthValue > latestMonthValue ? current : latest;
          }
          return latest;
        }, null);

        const totalContributed = user.payment_history.reduce(
          (total, current) => total + current.paid_amount,
          0
        );

        return (
          <div className="case-container p-3 rounded-3" key={user.id}>
            <div className="d-flex flex-row justify-content-between w-100 gap-2">
              <div className="d-flex flex-row align-items-center gap-1">
                <div className="text-primary text-wrap ml-2 fs-14 fw-bold cursor-p">
                  {user.name}
                </div>
                <div>
                  {!lastContribution && (
                    <span className="d-flex">
                      <span className="text-danger ms-2">
                        Please Make a Payment
                        <img src="https://fonts.gstatic.com/s/e/notoemoji/15.1/1f603/512.png=s24" />
                      </span>
                      <span>
                        <i
                          className="fa-brands fa-google-pay ms-2 "
                          onClick={handleGooglePayClick}
                          style={{
                            cursor: "pointer",
                            fontSize: "32px",
                            color: "#4285F4",
                          }}
                          aria-hidden="true"
                        ></i>
                      </span>
                    </span>
                  )}
                </div>
              </div>
              <div className="d-flex flex-row justify-content-end">
                <div className="d-flex align-items-center fs-12">
                  <i
                    className="fa-brands fa-whatsapp"
                    onClick={() => handleClick(user.mobile)}
                    style={{
                      cursor: "pointer",
                      fontSize: "24px",
                      color: "green",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="row py-2">
              <div className="col-12 fs-17">
                Total Contributed Rs {totalContributed}
              </div>
            </div>

            {/* Borrowed Amount Section */}
            <div className="row py-2">
              <div className="col-12 fs-17">
                Borrowed Amount: Rs{" "}
                {isEditing.userId === user.id && isEditing.field === "borrowed_amount" ? (
                  <>
                    <input
                      type="number"
                      value={newAmount}
                      onChange={(e) => setNewAmount(e.target.value)}
                      style={{ width: "80px" }}
                    />
                    <button onClick={() => handleSaveClick(user.id, "borrowed_amount")}>
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    {user.borrowed_amount}
                    <i
                      className="fa fa-edit ms-2"
                      onClick={() => handleEditClick(user.id, "borrowed_amount")}
                      style={{ cursor: "pointer", color: "blue" }}
                    />
                  </>
                )}
              </div>
            </div>

            {/* Payment History Section */}
            <div className="payment-history">
              {user.payment_history.map((payment) => (
                <div
                  key={payment.month}
                  className="d-flex align-items-center justify-content-between"
                >
                  <span>{payment.month} - Rs {payment.paid_amount}</span>
                  {isEditing.userId === user.id && isEditing.month === payment.month && isEditing.field === "paid_amount" ? (
                    <>
                      <input
                        type="number"
                        value={newAmount}
                        onChange={(e) => setNewAmount(e.target.value)}
                        style={{ width: "60px" }}
                      />
                      <button onClick={() => handleSaveClick(user.id, "paid_amount", payment.month)}>
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <i
                        className="fa fa-edit"
                        onClick={() => handleEditClick(user.id, "paid_amount", payment.month)}
                        style={{ cursor: "pointer", color: "blue" }}
                      />
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="row py-2">
              <div className="col-12">
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete User
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default AdminList;

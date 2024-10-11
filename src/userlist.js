import React,{useState} from "react";
import initialUsers from "./Data";

const handleClick = (phoneNumber) => {
  const whatsappUrl = `https://wa.me/${phoneNumber}`;
  window.open(whatsappUrl, "_blank"); // Opens in a new tab
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

  const UserList = () => {
    const [searchTerm, setSearchTerm] = useState("");
  
    // Filter users based on search term
    const filteredUsers = initialUsers.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
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
          const lastContribution = user.payment_history.reduce(
            (latest, current) => {
              if (current.paid_amount > 0) {
                // Get month values for comparison
                const currentMonthValue = monthOrder[current.month];
                const latestMonthValue = latest ? monthOrder[latest.month] : 0;
  
                // Return the current if it's more recent
                return currentMonthValue > latestMonthValue ? current : latest;
              }
              return latest; // If no payment made, return latest found so far
            },
            null
          );
  
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
              <div className="d-none d-md-block">
                <div className="d-flex flex-row w-100 gap-2 ">
                  <div className="d-flex flex-row align-items-center gap-1">
                    <span className="text-nowrap text-muted">
                      Last Contributed:{" "}
                      {lastContribution
                        ? `${lastContribution.month}`
                        : "Not contributed"}
                    </span>
                  </div>
                  <div className="gap-1"></div>
                  <div className="d-flex flex-row align-items-center gap-1">
                    <div className="fw-bold text-capitalize fs-12 high">
                      Borrowed Amount: {user.borrowed_amount}
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-block d-md-none">
                <div className="d-flex flex-row align-items-center gap-1 mb-2">
                  <span className="text-muted text-nowrap">
                    Last Contributed:{" "}
                    {lastContribution
                      ? `${lastContribution.month}`
                      : "Not contributed"}
                  </span>
                </div>
              </div>
              <div className="d-block d-md-none">
                <div className="fw-bold text-capitalize fs-12 high">
                  Borrowed Amount: {user.borrowed_amount}
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };
  
  export default UserList;

// const UserList = () => (
//     <>
//       {initialUsers.map((user) => {
//         // Get the last contributed month and total amount paid
//         const lastContribution = user.payment_history.reduce(
//           (latest, current) => {
//             if (current.paid_amount > 0) {
//               // Get month values for comparison
//               const currentMonthValue = monthOrder[current.month];
//               const latestMonthValue = latest ? monthOrder[latest.month] : 0;
  
//               // Return the current if it's more recent
//               return currentMonthValue > latestMonthValue ? current : latest;
//             }
//             return latest; // If no payment made, return latest found so far
//           },
//           null
//         );
  
//         const totalContributed = user.payment_history.reduce(
//           (total, current) => total + current.paid_amount,
//           0
//         );
  
//         return (
//           <div className="case-container p-3 rounded-3" key={user.id}>
//             <div className="d-flex flex-row justify-content-between w-100 gap-2">
//               <div className="d-flex flex-row align-items-center gap-1">
//                 <div className="text-primary text-wrap ml-2 fs-14 fw-bold cursor-p">
//                   {user.name}
//                 </div>
//                 <div>
//                   {!lastContribution && (
//                     <span className="d-flex">
//                       <span className="text-danger ms-2">
//                         Please Make a Payment
//                         <img src="https://fonts.gstatic.com/s/e/notoemoji/15.1/1f603/512.png=s24" />
//                       </span>
//                       <span>
//                         <i
//                           className="fa-brands fa-google-pay ms-2 "
//                           onClick={handleGooglePayClick}
//                           style={{
//                             cursor: "pointer",
//                             fontSize: "32px",
//                             color: "#4285F4",
//                           }}
//                           aria-hidden="true"
//                         ></i>
//                       </span>
//                     </span>
//                   )}
//                 </div>
//               </div>
//               <div className="d-flex flex-row justify-content-end">
//                 <div className="d-flex align-items-center fs-12">
//                   <i
//                     className="fa-brands fa-whatsapp"
//                     onClick={() => handleClick(user.mobile)}
//                     style={{
//                       cursor: "pointer",
//                       fontSize: "24px",
//                       color: "green",
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="row py-2">
//               <div className="col-12 fs-17">
//                 Total Contributed Rs {totalContributed}
//               </div>
//             </div>
//             <div className="d-none d-md-block">
//               <div className="d-flex flex-row w-100 gap-2 ">
//                 <div className="d-flex flex-row align-items-center gap-1">
//                   <span className="text-nowrap text-muted">
//                     Last Contributed:{" "}
//                     {lastContribution
//                       ? `${lastContribution.month}`
//                       : "Not contributed"}
//                   </span>
//                 </div>
//                 <div className="gap-1"></div>
//                 <div className="d-flex flex-row align-items-center gap-1">
//                   <div className="fw-bold text-capitalize fs-12 high">
//                     Borrowed Amount: {user.borrowed_amount}
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="d-block d-md-none">
//               <div className="d-flex flex-row align-items-center gap-1 mb-2">
//                 <span className="text-muted text-nowrap">
//                   Last Contributed:{" "}
//                   {lastContribution
//                     ? `${lastContribution.month}`
//                     : "Not contributed"}
//                 </span>
//               </div>
//             </div>
//             <div className="d-block d-md-none">
//               <div className="fw-bold text-capitalize fs-12 high">
//                 Borrowed Amount: {user.borrowed_amount}
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </>
//   );
// export default UserList;

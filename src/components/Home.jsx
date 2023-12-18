// react import 
import React, { useState, useEffect } from "react";

const Home = () => {
  // Initialize userData state with null
  const [userData, setUserData] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("logInToken");

      if (token) {
        const apiUrl = "https://test.directaff.com/api/me";
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        try {
          const response = await fetch(apiUrl, {
            method: "GET",
            headers: headers,
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          // Set the data in the state
          setUserData(data); 
          console.log("API response:", data);
        } catch (error) {
          // Handle errors during the API request
          console.error("Error fetching data:", error);
        }
      } else {
        console.error("Token not found in localStorage");
      }
    };

    fetchData(); 
  }, []); 

  return (
    <div className="my-10">
      <div className="container">
        <div className="flex items-center justify-center lg:my-20 my-10">
          <div
            className="bg-[#FFF] lg:w-[444px] border border-gray-150 rounded-lg lg:p-[50px] p-5"
            style={{
              boxShadow:
                "0px 8px 8px -4px rgba(16, 24, 40, 0.03), 0px 20px 24px -4px rgba(16, 24, 40, 0.08)",
            }}
          >
            {userData?.role === "user" ? (
              <h2 className="text-3xl font-bold text-[#101828] mb-3">
                User Dashboard
              </h2>
            ) : (
              <h2 className="text-3xl font-bold text-[#101828] mb-3">
                {" "}
                Admin Dashboard
              </h2>
            )}
            {userData && (
              <div>
                {/* Render content based on the userData state */}
                <p>
                  {" "}
                  <span className="text-lg text-[#676767] font-medium">
                    Name:
                  </span>{" "}
                  {userData.name}
                </p>
                <p>
                  <span className="text-lg text-[#676767] font-medium">
                    Email:
                  </span>{" "}
                  {userData.email}
                </p>
                <p>
                  <span className="text-lg text-[#676767] font-medium">
                    Role:
                  </span>{" "}
                  {userData.role}
                </p>               
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

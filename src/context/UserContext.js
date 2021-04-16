import React, { createContext, useState } from "react";

export const UserContext = createContext();

// This context provider is passed to any component requiring the context
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    "id": 1,
    "fullName": "Joshan Pradhanjdjjdjsjs",
    "email": "iamjoshan@gmail.com",
    "mobileNo": "9817922222",
    "walletBalance": "75",
    "verified": true,
    "isActive": true,
    "vehicleNumber": "qweqw1",
    "vehicleColor": "red",
    "vehicleType": "bike",
    "vehicleBrand": "h6ybybybbt",
    "licenseNumber": "qweqw1",
    "licenseExpiryDate": "2021-04-05",
    "blueBookExpiryDate": "2021-04-03",
    "citizenshipNumber": "ExponentPushToken[zO7tEVD7gOt2mp_9dy2mbm]",
    "riderLatitudeCoordinate": 27.6713058,
    "riderLongitudeCoordinate": 85.3517643,
    "rideCompleted": null,
    "rideCancelled": null,
    "published_at": "2021-04-06T06:18:06.635Z",
    "created_at": "2021-04-06T06:17:47.796Z",
    "updated_at": "2021-04-15T03:15:58.395Z",
    });
  const [jwt, setJwt] = useState();
  const [rideHistory, setRideHistory] = useState();

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        jwt,
        setJwt,
        rideHistory,
        setRideHistory,
        
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

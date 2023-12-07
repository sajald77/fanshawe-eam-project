import React, { useEffect, useState } from "react";

import { TitleBanner } from "../../components/TitleBanner";
import { BookingList } from "./BookingList";
import { api } from "../../config";

export const Dashboard = () => {
  const [bookings, setBookings] = useState([]);

  const getBookings = async () => {
      try {
        const response = await api.get(`/bookings/1`);
        const bookings = response.data.map((booking) => {
          return {
            ...booking,
            ...booking.vendor,
            ...booking.user,
            ...booking.event,
          };
        });
        setBookings(bookings);
      } catch (error) {
        console.log("error fetching vendors", error);
      }
    };

  useEffect(() => {
    
    getBookings();
  }, []);

  return (
    <>
      {/* Welcome banner */}
      <TitleBanner
        title="My Dashboard"
        subtitle="View your existing event bookings"
      />

      <BookingList
        list={bookings}
        getBookings={getBookings}
        keys={{
          id: "bookingId",
          name: "info",
          status: "vendorType",
          dueDate: "fromDestination",
          dueDateTime: "hours",
          createdBy: "vendorName",
          location: "location",
        }}
      />
    </>
  );
};

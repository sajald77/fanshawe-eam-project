import React, { useEffect, useState } from 'react';

import { TitleBanner } from '../../components/TitleBanner';
import { BookingList } from './BookingList';
import { api } from '../../config';

const projects = [
  {
    id: 1,
    name: 'GraphQL API',
    href: '#',
    status: 'Complete',
    createdBy: 'Leslie Alexander',
    dueDate: 'March 17, 2023',
    dueDateTime: '2023-03-17T00:00Z',
  },
  {
    id: 2,
    name: 'New benefits plan',
    href: '#',
    status: 'In progress',
    createdBy: 'Leslie Alexander',
    dueDate: 'May 5, 2023',
    dueDateTime: '2023-05-05T00:00Z',
  },
  {
    id: 3,
    name: 'Onboarding emails',
    href: '#',
    status: 'In progress',
    createdBy: 'Courtney Henry',
    dueDate: 'May 25, 2023',
    dueDateTime: '2023-05-25T00:00Z',
  },
  {
    id: 4,
    name: 'iOS app',
    href: '#',
    status: 'In progress',
    createdBy: 'Leonard Krasner',
    dueDate: 'June 7, 2023',
    dueDateTime: '2023-06-07T00:00Z',
  },
  {
    id: 5,
    name: 'Marketing site redesign',
    href: '#',
    status: 'Archived',
    createdBy: 'Courtney Henry',
    dueDate: 'June 10, 2023',
    dueDateTime: '2023-06-10T00:00Z',
  },
]

export const Dashboard = () => {

  const [bookings, setBookings] = useState([])

  useEffect(() => {

    const getBookings = async () => {

      try {
        const response = await api.get(`/bookings/1`)

        const bookings = response.data.map(booking => {
          return {
            ...booking,
            ...booking.vendor,
            ...booking.user,
            ...booking.event
          }
        })
        setBookings(bookings) 
      } catch (error) {
        console.log('error fetching vendors', error)
      }
    }
    getBookings()
   
  }, [])
  

  console.log('cheking vendors response', bookings)

  return (
          <>

            {/* Welcome banner */}
            <TitleBanner title="My Dashboard" subtitle="View your existing event bookings" />

            <BookingList 
              list={bookings}
              keys={{
                id: 'bookingId',
                name: 'info',
                status: 'vendorType',
                dueDate: 'fromDestination',
                dueDateTime: 'dueDateTime',
                createdBy: 'vendorName',
                location: 'location',
              }}
            />
            

          </>
        
  );
}

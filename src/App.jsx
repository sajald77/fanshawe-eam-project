import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import {  Login } from './pages';
import { Vendors } from './pages/vendors/Vendors';
import { Events } from './pages/events/Events';
import { Dashboard } from './pages/dashboard/Dashboard';

// Import pages

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/movies/:id" element={<Events type='movies'/>} />
        <Route exact path="/movies/" element={<Vendors type='movies'/>} />
        <Route exact path="/concerts/:id" element={<Events type='concerts'/>} />
        <Route exact path="/concerts" element={<Vendors type='concerts'/>} />
        <Route exact path="/airlines/:id" element={<Events type='airlines'/>} />
        <Route exact path="/airlines" element={<Vendors type='airlines'/>} />


        <Route exact path="/login" element={<Login />} />

        <Route exact path="/" element={<Dashboard />} />

      </Routes>
    </>
  );
}

export default App;

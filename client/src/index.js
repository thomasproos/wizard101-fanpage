// Import Dependencies
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';

// Import CSS
import './index.css';

// Import React Components
import Navigation from './Pages/Navigation/Navigation';
import MainPage from './Pages/MainPage/MainPage';
import Blacksmith from './Pages/Blacksmith/Blacksmith';
import Login from './Pages/Login/Login';

// Define routes config
const router = createHashRouter([
  {
    path: "/",
    element: <Navigation />,
    children: [
      { path: '/', element: <MainPage /> },
      { path: '/blacksmith', element: <Blacksmith /> },
      { path: '/login', element: <Login /> }
    ]
  }
]);

// Render in React Components Router
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// Import Dependencies
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './ReduxStore.js';

// Import CSS
import './index.css';

// Import React Components
import Navigation from './Pages/Navigation/Navigation';
import MainPage from './Pages/MainPage/MainPage';
import Blacksmith from './Pages/Backpack/Backpack';
import Login from './Pages/Login/Login';
import CreateAccount from './Pages/CreateAccount/CreateAccount';

// Define routes config
const router = createHashRouter([
  {
    path: "/",
    element: <Navigation />,
    children: [
      { path: '/', element: <MainPage /> },
      { path: '/blacksmith', element: <Blacksmith /> },
      { path: '/account/login', element: <Login /> },
      { path: '/account/create-account', element: <CreateAccount /> }
    ]
  }
]);

// Render in React Components Router
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

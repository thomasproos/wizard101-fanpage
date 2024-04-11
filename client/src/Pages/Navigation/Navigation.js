// Import dependencies
import { useNavigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actionTypes } from '../../ReduxStore.js';
import { useState } from 'react';
import { useEffect } from 'react';

// Import CSS
import './Navigation.css';

export default function Navigation() {
  const [page, setPage] = useState('');

  // Establish the navigation & redux store
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux Store Values
  const loginStatus = useSelector(state => state.loginStatus);

  // Fetch the current login-status
  useEffect(() => {
    (async () => {
      try {
        // The redux value setter method
        const setLoginStatus = (value) => {
          dispatch({ type: actionTypes.SET_LOGIN, payload: value });
        };

        const response = await fetch('api/v1/auth/login-status');
        
        if (response.ok) {
          const status = await response.json();
          setLoginStatus(status.loggedIn);
        }
      } catch(error) {
        console.error('Fetch Error: Failed to establish navigation status.');
      }
    })();
  }, [dispatch]);

  // Logging out the user
  const handleLogout = async () => {
    try {
      // The redux value setter method
      const setLoginStatus = (value) => {
        dispatch({ type: actionTypes.SET_LOGIN, payload: value });
      };

      const response = await fetch('/api/v1/auth/logout', {
        method: 'DELETE',
        body: {},
        headers: {}
      });

      if (response.ok) {
        const status = await response.json();

        if (status.loggedOut) {
          setLoginStatus(false);
        }
      }
    } catch(error) {
      console.error('Failed to logout user.');
    }
  };

  return(
    <>
      <section id="navigation" className="custom-border-1">
        {/* Navigation Logo */}
        <div id="navigation-website-container" onClick={() => {navigate('/')}}>
          <div id="navigation-website-icon" />
          <div id="navigation-website-title">Arcanum Archives</div>
        </div>

        {/* Navigation Headers */}
        <section id="navigation-header-section">
          <div id="navigation-guides-container" className="navigation-header-container">
            <div id="navigation-guides-icon" className="navigation-icon" />
            <div id="navigation-guides-title" className="navigation-title">Guides</div>
          </div>
          <div id="navigation-gardening-container" className="navigation-header-container">
            <div id="navigation-gardening-icon" className="navigation-icon" />
            <div id="navigation-gardening-title" className="navigation-title">Gardening</div>
          </div>
          <div id="navigation-blacksmith-container" className={"navigation-header-container " + (page === 'blacksmith' ? 'active' : '')}
            onClick={() => { navigate('/blacksmith'); }}>
            <div id="navigation-blacksmith-icon" className="navigation-icon"/>
            <div id="navigation-blacksmith-title" className="navigation-title">Blacksmith</div>
          </div>
          {loginStatus ?
            <div id="navigation-logout-container" className="navigation-header-container navigation-icon-user"
              onClick={handleLogout}>
              <div id="navigation-logout-icon" className="navigation-icon"/>
              <div id="navigation-logout-title" className="navigation-title">Logout</div>
            </div>
            :
            <div id="navigation-login-container" className="navigation-header-container navigation-icon-user"
              onClick={() => { navigate('/account/login'); }}>
              <div id="navigation-login-icon" className="navigation-icon"/>
              <div id="navigation-login-title" className="navigation-title">Login</div>
            </div>
          }
        </section>
      </section>
      <main>
        <Outlet />
      </main>
    </>
  );
}
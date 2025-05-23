// Import dependencies
import { useNavigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actionTypes } from '../../ReduxStore.js';
import { useEffect } from 'react';

// Import Assets
import Sapphire from '../../Assets/Jewels/sapphire-socket.png';
import Amethyst from '../../Assets/Jewels/amethyst-socket.png';
import Peridot from '../../Assets/Jewels/peridot-socket.png';
import Jade from '../../Assets/Jewels/jade-socket.png';
import Ruby from '../../Assets/Jewels/ruby-socket.png';

// Import CSS
import './Navigation.css';

export default function Navigation() {
  // Establish the navigation & redux store
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux Store Values
  const loginStatus = useSelector(state => state.loginStatus);
  const currentPage = useSelector(state => state.currentPage);

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
      <div id="navigation-bar-container">
        <section id="navigation" className="custom-border-2">
            {/* Navigation Logo */}
            <div id="navigation-website-container" onClick={() => {navigate('/')}}>
              <div id="navigation-website-icon" className={"" + currentPage === 'home' ? "home-icon" : currentPage === "backpack" ? "backpack-icon" : "home-icon" } />
              <div id="navigation-website-title">Beguiled Socket</div>
            </div>

            {/* Navigation Headers */}
            <section id="navigation-header-section">
              <div id="navigation-guides-container" className="navigation-header-container">
                <img src={Peridot} alt="Guide Icon" id="navigation-guides-icon" className="navigation-icon" />
                <div id="navigation-guides-title" className="navigation-title">Guides</div>
              </div>
              <div id="navigation-gardening-container" className="navigation-header-container">
                <img src={Jade} alt="Gardening Icon" id="navigation-gardening-icon" className="navigation-icon" />
                <div id="navigation-gardening-title" className="navigation-title">Gardening</div>
              </div>
              <div id="navigation-blacksmith-container" className="navigation-header-container"
                onClick={() => { navigate('/blacksmith'); }}>
                <img src={Amethyst} alt="Backpack Icon" id="navigation-blacksmith-icon" className="navigation-icon"/>
                <div id="navigation-blacksmith-title" className="navigation-title">Backpack</div>
              </div>
              {loginStatus ?
                <div id="navigation-logout-container" className="navigation-header-container navigation-icon-user"
                  onClick={handleLogout}>
                  <img src={Ruby} alt="Logout Icon" id="navigation-logout-icon" className="navigation-icon"/>
                  <div id="navigation-logout-title" className="navigation-title">Logout</div>
                </div>
                :
                <div id="navigation-login-container" className="navigation-header-container navigation-icon-user"
                  onClick={() => { navigate('/account/login'); }}>
                  <img src={Sapphire} alt="Login Icon" id="navigation-login-icon" className="navigation-icon"/>
                  <div id="navigation-login-title" className="navigation-title">Login</div>
                </div>
              }
            </section>
          </section>
      </div>
      <main>
        <Outlet />
      </main>
      <div id="footer" className="custom-border-2">
        <div id="footer-content">
          Footer - This will be filled with pertinent information soon!
        </div>
      </div>
    </>
  );
}
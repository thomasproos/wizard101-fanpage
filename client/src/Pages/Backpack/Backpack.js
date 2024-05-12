// Import dependencies
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actionTypes } from '../../ReduxStore.js';

// Import CSS
import './Backpack.css';

// Import Components
import InformationPage from './InformationPage/InformationPage.js';
import Flags from './Flags/Flags.js';
import StarPage from './StarPage/StarPage.js';
import BackpackPage from './BackpackPage/BackpackPage.js';

export default function Backpack() {
  const [profile, setProfile] = useState({});
  const [currentSlot, setCurrentSlot] = useState({});
  const [currentGear, setCurrentGear] = useState('all');
  const [page, setPage] = useState('information');
  const [pageNumber, setPageNumber] = useState(1);

  // Setup state modifications
  const dispatch = useDispatch();

  // Setup global variables
  const loginStatus = useSelector(state => state.loginStatus);
  const currentPage = useSelector(state => state.currentPage);

  // Fetch user profile
  useEffect(() => {
    if (currentPage !== 'backpack') {
      const setCurrentPage = (value) => {
        dispatch({ type: actionTypes.SET_PAGE, payload: value });
      };

      setCurrentPage('backpack');
    }

    if (loginStatus) {
      (async () => {
        try {
          const response = await fetch('/api/v1/auth/user');

          if (response.ok) {
            const result = await response.json();
            setProfile(result.user);
          }
        } catch(error) {
          console.log('Server Error: Failed to fetch user profile.');
        }
      })();
    }
  }, [currentPage, dispatch, loginStatus]);

  // If the user is logged in
  if (loginStatus) {
    if (page === 'star') {
      return(
        <StarPage currentSlot={currentSlot} setCurrentSlot={setCurrentSlot} profile={profile} setProfile={setProfile} page={page} setPage={setPage}/>
      );
    } else if (page === 'information') {
      return(
        <InformationPage loggedIn={(loginStatus)} setPage={setPage} page={page} pageNumber={pageNumber} setPageNumber={setPageNumber} />
      );
    } else if (page === 'backpack') {
      return(
        <BackpackPage currentGear={currentGear} setCurrentGear={setCurrentGear} currentSlot={currentSlot} page={page} setPage={setPage}/>
      );
    }
  } else {
    return(
      <section id="backpack" className="custom-border-2">
        <div id="backpack-content-container">
          <div id="backpack-title-background">
            <div id="backpack-title">Information</div>
          </div>
          <InformationPage loggedIn={false}/>
          <Flags star={false} stats={false} backpack={false} question={true} settings={false} setPage={setPage} page={page}/>
        </div>
      </section>
    );
  }
}
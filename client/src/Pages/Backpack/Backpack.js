// Import dependencies
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from "react-router-dom";

// Import CSS
import './Backpack.css';

// Import Components
import InformationPage from './InformationPage/InformationPage.js';
import StarPage from './StarPage/StarPage.js';
import BackpackPage from './BackpackPage/BackpackPage.js';

export default function Backpack({ navigatePage }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [profile, setProfile] = useState({});
  const [currentSlot, setCurrentSlot] = useState({});
  const [currentGear, setCurrentGear] = useState('all');
  const [page, setPage] = useState('information');
  const [pageNumber, setPageNumber] = useState(searchParams.get('page') > 0 ? searchParams.get('page') : 1);

  // Get current page

  // Setup state modifications
  const dispatch = useDispatch();

  // Setup global variables
  const loginStatus = useSelector(state => state.loginStatus);

  // Fetch user profile
  useEffect(() => {
    if (navigatePage !== page) {
      setPage(navigatePage);
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
  }, [dispatch, loginStatus, navigatePage]);

  // If the user is logged in
  if (loginStatus) {
    if (page === 'star') {
      return(
        <StarPage currentSlot={currentSlot} setCurrentSlot={setCurrentSlot} profile={profile} setProfile={setProfile} page={page} setPage={setPage}/>
      );
    } else if (page === 'information') {
      return(
        <InformationPage currentSlot={currentSlot} loggedIn={(loginStatus)} setPage={setPage} page={page} pageNumber={pageNumber} setPageNumber={setPageNumber} />
      );
    } else if (page === 'backpack') {
      return(
        <BackpackPage currentGear={currentGear} setCurrentGear={setCurrentGear} currentSlot={currentSlot} page={page} setPage={setPage}/>
      );
    }
  } else {
    return(
      <InformationPage loggedIn={false} setPage={setPage} page={page} pageNumber={pageNumber} setPageNumber={setPageNumber}/>
    );
  }
}
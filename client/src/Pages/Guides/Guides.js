// Import CSS
import { useEffect } from 'react';
import './Guides.css';

// Import dependencies
import { useSelector, useDispatch } from 'react-redux';
import { actionTypes } from '../../ReduxStore.js';

export default function Guides() {
  // Setup state modifications
  const dispatch = useDispatch();

  // Setup global variables
  const currentPage = useSelector(state => state.currentPage);

  useEffect(() => {
    if (currentPage !== 'guides') {
      const setCurrentPage = (value) => {
        dispatch({ type: actionTypes.SET_PAGE, payload: value });
      };

      setCurrentPage('guides');
    }
  }, [currentPage, dispatch]);

  return(
    <section id="guides-page" className="custom-border-2">
      <div>Guides</div>
    </section>
  );
}
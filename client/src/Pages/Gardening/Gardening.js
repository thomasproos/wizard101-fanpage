// Import CSS
import './Gardening.css';

// Import dependencies
import { useSelector, useDispatch } from 'react-redux';
import { actionTypes } from '../../ReduxStore.js';
import { useEffect } from 'react';

export default function Gardening() {
  // Setup state modifications
  const dispatch = useDispatch();

  // Setup global variables
  const currentPage = useSelector(state => state.currentPage);

  useEffect(() => {
    if (currentPage !== 'gardening') {
      const setCurrentPage = (value) => {
        dispatch({ type: actionTypes.SET_PAGE, payload: value });
      };

      setCurrentPage('gardening');
    }
  }, [currentPage, dispatch]);
  
  return(
    <section id="gardening-page">
      <div>Hello</div>
    </section>
  );
}
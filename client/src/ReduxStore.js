import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  loginStatus: false,
  currentPage: 'home'
};

const actionTypes = {
  SET_LOGIN: 'SET_LOGIN',
  SET_PAGE: 'SET_PAGE',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LOGIN:
      return { ...state, loginStatus: action.payload };
    case actionTypes.SET_PAGE:
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
};

const store = configureStore({
  reducer
});

export { store, actionTypes };
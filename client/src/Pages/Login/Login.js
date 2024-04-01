// Import CSS
import { useState } from 'react';
import './Login.css';

// Import dependencies
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actionTypes } from '../../ReduxStore.js';

// Import assets
import Spiral from '../../Assets/large-spiral-icon.png';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameValid, setUsernameValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [systemMessage, setSystemMessage] = useState('');

  // Setup navigation
  const navigate = useNavigate();

  // Global login status
  const dispatch = useDispatch();

  // Redux store state information
  const loginStatus = useSelector(state => state.loginStatus);
  const setLoginStatus = (value) => {
    dispatch({ type: actionTypes.SET_LOGIN, payload: value });
  };

  const createAccount = async () => {
    try {
      if (passwordValid && usernameValid) {
        const response = await fetch('/api/v1/auth/login', {
          method: 'POST',
          body: JSON.stringify({
            "username" : username,
            "password" : password 
          }),
          headers: {
            'Content-Type' : 'application/json'
          }
        });

        if (response.ok) {
          setLoginStatus(true);
          navigate('/');
        } else {
          const result = await response.json();

          if (result.message === 'Invalid account object input.') {
            setSystemMessage('Invalid username or password');
          }
        }
      }
    } catch(error) {
      console.error('Fetch Error : Failed to login the account.');
    }
  }

  if (!loginStatus) {
    return(
      <section id="login" className="custom-border-1">
        {/* Title */}
        <div className="login-title-background">
          <div className="login-title">Login</div>
        </div>
  
        {/* Input Container */}
        <div className="login-container custom-border-2">
  
          {/* Username Field */}
          <div className="login-container-field">
            <div id="login-username-label">Username</div>
            <input type="text" className="login-input-field custom-border-2" maxLength="20" onChange={(event) => {
                setUsername(event.target.value);
                setUsernameValid(event.target.value.match('^[a-zA-Z0-9_.-]{4,20}$'));
              }}/>
          </div>
  
          {/* Password Field */}
          <div className="login-container-field">
            <div id="login-password-label">Password</div>
            <input type="password" className="login-input-field custom-border-2" maxLength="30"  
              onChange={(event) => {
                setPassword(event.target.value);
                setPasswordValid(event.target.value.match('^[a-zA-Z0-9]{8,30}$'));
              }}/>
          </div>
  
          {/* Login Button */}
          <div id="login-container-button" onClick={createAccount} className={
            '' + (usernameValid && passwordValid ? "login-valid" : "")
          }>Login</div>
          
          {/* Extra References */}
          <div className="white-text">
            Don't have an account?
          </div>
          <div id="login-create-account-button" onClick={() => { navigate('/account/create-account'); }}>Create Account</div>
  
          {/* Warning Messages */}
          <div className={"custom-border-2 " + (systemMessage === '' ? "account-warning-hidden" : "account-warning-visible")}>{systemMessage}</div>
        </div>
      </section>
    );
  } else {
    return(
      <section id="login" className="custom-border-1">
        {/* Title */}
        <div className="login-title-background">
          <div className="login-title">Login</div>
        </div>
  
        {/* Input Container */}
        <div id="unauthorized-login-container" className="login-container custom-border-2">
          <img src={Spiral} alt="Spiral Icon" className="unauthorized-spiral-icon"/>
          <span>You are already logged in!</span>
          <img src={Spiral} alt="Spiral Icon" className="unauthorized-spiral-icon"/>
        </div>
      </section>
    );
  }
}
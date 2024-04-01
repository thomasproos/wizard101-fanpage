// Import CSS
import './CreateAccount.css';

// Import dependencies
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actionTypes } from '../../ReduxStore.js';

// Import Assets
import Info from '../../Assets/info-icon.png';
import { useState } from 'react';
import Spiral from '../../Assets/large-spiral-icon.png';

export default function CreateAccount() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameValid, setUsernameValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [systemMessage, setSystemMessage] = useState('');
  const [tooltipStatus, setTooltipStatus] = useState([false, false]);

  // Global login status
  const dispatch = useDispatch();

  const loginStatus = useSelector(state => state.loginStatus);
  const setLoginStatus = (value) => {
    dispatch({ type: actionTypes.SET_LOGIN, payload: value });
  };

  const createAccount = async () => {
    try {
      if (usernameValid && passwordValid) {
        const response = await fetch('/api/v1/auth/create-account', {
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

          if (result.message === 'Username already taken.') {
            setSystemMessage('Username is already taken');
          }
        }
      }
    } catch(error) {
      console.error('Fetch Error : Failed to create an account.');
    }
  }

  // Setup navigation
  const navigate = useNavigate();

  if (!loginStatus) {
    return(
      <section id="create-account" className="custom-border-1" >
        {/* Page Title */}
        <div className="create-account-title-background">
          <div className="create-account-title">Create Account</div>
        </div>

        {/* Account Box */}
        <div className="create-account-container custom-border-2">

          {/* Username Field */}
          <div className="create-account-container-field">
            {/* Label */}
            <div id="create-account-username-label">Username</div>
            
            {/* Input Field */}
            <input type="text" className="create-account-input-field custom-border-2" minLength="4" maxLength="20" 
              onChange={(event) => {
                setUsername(event.target.value);
                setUsernameValid(event.target.value.match('^[a-zA-Z0-9_.-]{4,20}$'));
              }}/>

            {/* Info Icon */}
            <img src={Info} alt="Info Icon" className="create-account-info-icon" onClick={() => {
              const status = [!tooltipStatus[0], false];
              setTooltipStatus(status);
            }}/>
            <div className={"tooltip custom-border-2 " + (tooltipStatus[0] ? "tooltip-visible" : "")}>
              A username must be between 4 to 20 characters and can include numbers, 
              letters, underscores, periods, and hyphens.
            </div>
          </div>

          {/* Password Field */}
          <div className="create-account-container-field">
            {/* Label */}
            <div id="create-account-password-label">Password</div>
            
            {/* Input Field */}
            <input type="password" className="create-account-input-field custom-border-2" minLength="8" maxLength="30" 
              onChange={(event) => {
                setPassword(event.target.value);
                setPasswordValid(event.target.value.match('^[a-zA-Z0-9]{8,30}$'));
              }}/>

            {/* Info Icon */}
            <img src={Info} alt="Info Icon" className="create-account-info-icon" onClick={() => {
              const status = [false, !tooltipStatus[1]];
              setTooltipStatus(status);
            }}/>
            <div className={"tooltip custom-border-2 " + (tooltipStatus[1] ? "tooltip-visible" : "")}>
              A password must be between 8 to 30 characters and can include numbers and letters.
            </div>
          </div>

          {/* Create Button */}
          <div id="create-account-container-button" className={
            '' + (usernameValid && passwordValid ? "create-account-valid" : "")
          } onClick={createAccount}>Create</div>
          
          {/* Already have an account text */}
          <div className="white-text">
            Already have an account?
          </div>
          <div id="create-account-login-button" onClick={() => { navigate('/account/login'); }}>Login</div>

          {/* Warning Messages */}
          <div className={"custom-border-2 " + (systemMessage === '' ? "account-warning-hidden" : "account-warning-visible")}>{systemMessage}</div>
        </div>
      </section>
    );
  } else {
    return(
      <section id="create-account" className="custom-border-1">
        {/* Title */}
        <div className="create-account-title-background">
          <div className="create-account-title">Create Account</div>
        </div>
  
        {/* Input Container */}
        <div id="unauthorized-create-account-container" className="create-account-container custom-border-2">
          <img src={Spiral} alt="Spiral Icon" className="unauthorized-spiral-icon"/>
          <span>You are already logged in!</span>
          <img src={Spiral} alt="Spiral Icon" className="unauthorized-spiral-icon"/>
        </div>
      </section>
    );
  }
}
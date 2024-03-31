// Import CSS
import './CreateAccount.css';

// Import dependencies
import { useNavigate } from 'react-router-dom';

// Import Assets
import Info from '../../Assets/info-icon.png';

export default function CreateAccount() {
  // Setup navigation
  const navigate = useNavigate();

  return(
    <section id="create-account" className="custom-border-1" >
      <div className="create-account-title-background">
        <div className="create-account-title">Create Account</div>
      </div>
      <div className="create-account-container custom-border-2">
        <div className="create-account-container-field">
          <div id="create-account-username-label">Username</div>
          <input type="text" className="create-account-input-field custom-border-2" maxLength="20" />
          <img src={Info} alt="Info Icon" className="create-account-info-icon" />
        </div>
        <div className="create-account-container-field">
          <div id="create-account-password-label">Password</div>
          <input type="password" className="create-account-input-field custom-border-2" maxLength="30" />
          <img src={Info} alt="Info Icon" className="create-account-info-icon" />
        </div>
        <div id="create-account-container-button">Create</div>
        <div className="white-text">
          Already have an account?
        </div>
        <div id="create-account-login-button" onClick={() => { navigate('/account/login'); }}>Login</div>
      </div>
    </section>
  );
}
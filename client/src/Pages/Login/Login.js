// Import CSS
import './Login.css';

export default function Login() {
  return(
    <section id="login" className="custom-border-1">
      <div className="login-title-background">
        <div className="login-title">Login</div>
      </div>
      <div className="login-container custom-border-2">
        <div className="login-container-field">
          <div id="login-username-label">Username</div>
          <input type="text" className="login-input-field custom-border-2" maxLength="20" />
        </div>
        <div className="login-container-field">
          <div id="login-password-label">Password</div>
          <input type="password" className="login-input-field custom-border-2" maxLength="30" />
        </div>
        <div id="login-container-button">Login</div>
        <div className="white-text">
          Don't have an account?
        </div>
        <div id="login-create-account-button">Create Account</div>
      </div>
    </section>
  );
}
// Import CSS
import './Flags.css';

// Import Dependencies
import { useNavigate } from 'react-router-dom';

export default function Flags({ star, stats, backpack, question, settings, setPage, page }) {
  // Setup navigation
  const navigate = useNavigate();
  
  return(
    <section id="backpack-flags">
      {/* Star */}
      <div className="backpack-flag" id="star-flag">
        <div className={"flag-button " + (star ? " button-active" : "")} id="star-button" onClick={() => {
          if (page !== 'star' && star) {
            setPage('star');
            navigate('/backpack/character-list');
          }
        }}/>
      </div>

      {/* Stats */}
      <div className="backpack-flag" id="stats-flag">
        <div className={"flag-button " + (stats ? "button-active" : "")} id="stats-button" onClick={() => {
          if (page !== 'stats' && stats) {
            setPage('stats');
            navigate('/backpack/stats');
          }
        }}/>
      </div>

      {/* Backpack */}
      <div className="backpack-flag" id="backpacks-flag">
        <div className={"flag-button " + (backpack ? "button-active" : "")} id="backpacks-button" onClick={() => {
          if (page !== 'backpack' && backpack) {
            setPage('backpack');
            navigate('/backpack/inventory');
          }
        }}/>
      </div>
      <div className="backpack-flag">
        <div className="flag-button"/>
      </div>
      <div className="backpack-flag">
        <div className="flag-button"/>
      </div>
      <div className="backpack-flag">
        <div className="flag-button"/>
      </div>
      <div className="backpack-flag">
        <div className="flag-button"/>
      </div>
      <div className="backpack-flag">
        <div className="flag-button"/>
      </div>
      <div className="backpack-flag" id="question-flag">
        <div className={"flag-button " + (question ? "button-active" : "")} id="question-button" onClick={() => {
          if (page !== 'information' && question) {
            setPage('information');
            navigate('/backpack/information');
          }
        }}/>
      </div>
      <div className="backpack-flag" id="settings-flag">
        <div className={"flag-button " + (settings ? "button-active" : "")} id="settings-button" onClick={() => {
          if (page !== 'settings' && settings) {
            setPage('settings');
            navigate('/backpack/settings');
          }
        }}/>
      </div>
    </section>
  );
}
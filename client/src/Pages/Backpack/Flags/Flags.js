// Import CSS
import './Flags.css';

export default function Flags({ star, stats, backpack, question, settings, setPage, page }) {
  return(
    <section id="backpack-flags">
      {/* Star */}
      <div className="backpack-flag" id="star-flag">
        <div className={"flag-button " + (star ? " button-active" : "")} id="star-button" onClick={() => {
          if (page !== 'star') {
            setPage('star');
          }
        }}/>
      </div>

      {/* Stats */}
      <div className="backpack-flag" id="stats-flag">
        <div className={"flag-button " + (stats ? "button-active" : "")} id="stats-button" onClick={() => {
          if (page !== 'stats') {
            setPage('stats');
          }
        }}/>
      </div>

      {/* Backpack */}
      <div className="backpack-flag" id="backpacks-flag">
        <div className={"flag-button " + (backpack ? "button-active" : "")} id="backpacks-button" onClick={() => {
          if (page !== 'backpack') {
            setPage('backpack');
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
          if (page !== 'information') {
            setPage('information');
          }
        }}/>
      </div>
      <div className="backpack-flag" id="settings-flag">
        <div className={"flag-button " + (settings ? "button-active" : "")} id="settings-button" onClick={() => {
          if (page !== 'settings') {
            setPage('settings');
          }
        }}/>
      </div>
    </section>
  );
}
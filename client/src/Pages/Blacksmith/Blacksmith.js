// Import dependencies
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// Import CSS
import './Blacksmith.css';

// Import Components
import OfflineDisplay from './OfflineDisplay/OfflineDisplay';
import GearSearch from './GearSearch/GearSearch.js';
import GearCreator from './GearCreator/GearCreator.js';
import CharacterList from './CharacterList/CharacterList';
import CharacterCreator from './CharacterCreator/CharacterCreator';

export default function Blacksmith() {
  const [profile, setProfile] = useState({});
  const [confirmationMessage, setConfirmationMessage] = useState({});
  const [currentSlot, setCurrentSlot] = useState({});
  const [valid, setValid] = useState(false);
  const [page, setPage] = useState(1);
  const [currentGear, setCurrentGear] = useState('all');
  const [wizard, setWizard] = useState({});
  let numberPages = 2;

  // Setup global variables
  const loginStatus = useSelector(state => state.loginStatus);

  // Delete character slot
  const handleDeleteSlot = async () => {
    try {
      const response = await fetch(`/api/v1/auth/delete-wizard-slot/${currentSlot.index}`, {
        method: 'DELETE',
        headers: {}
      });

      if (response.ok) {
        const response = await fetch('/api/v1/auth/user');
  
        if (response.ok) {
          const result = await response.json();
          setConfirmationMessage({});
          setProfile(result.user);

          // Set default position
          if (result.user.wizard_slots.length > 0) {
            setCurrentSlot({
              index: 0,
              created: true,
              name: result.user.wizard_slots[0].name,
              school: result.user.wizard_slots[0].school,
              level: result.user.wizard_slots[0].level
            });
          }
        }
      }
    } catch(error) {
      console.error('Fetch Error: Failed to delete slot and update user');
    }
  };

  // Fetch user profile
  useEffect(() => {
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
  }, [loginStatus]);

  // If the user is logged in
  if (loginStatus) {
    if (page === 2) {
      return(
        <section id="blacksmith" className="custom-border-1">
          <div id="blacksmith-title-background">
            <div id="blacksmith-title">Blacksmith</div>
          </div>
          <div id="blacksmith-content-container">
  
            {/* Character List */}
            <CharacterList currentSlot={currentSlot} setCurrentSlot={setCurrentSlot} profile={profile}/>
  
            {/* Character Creator */}
            <CharacterCreator setPage={setPage} profile={profile} currentSlot={currentSlot} setCurrentSlot={setCurrentSlot} confirmationMessage={confirmationMessage}
              setConfirmationMessage={setConfirmationMessage} setProfile={setProfile} valid={valid} setValid={setValid} setWizard={setWizard}/>
              
            {/* Page Buttons */}
            <div id="blacksmith-page-left-button" className={"" + (page === 2 ? "page-button-enabled" : "")} onClick={() => {
                if (page === 2) {
                  setPage(1);
                }
              }}/>
            <div id="blacksmith-page-number-display">{page}/{numberPages}</div>
            <div id="blacksmith-page-right-button" className={"" + (page === 1 ? "page-button-enabled" : "")} onClick={() => {
                if (page === 1) {
                  setPage(2);
                }
              }}/>
          </div>
  
          {/* Confirmation Message */}
          {Object.keys(confirmationMessage).length === 3 ?
            <div id="confirmation-background">
              <div className="confirmation-container custom-border-2">
                <div id="confirmation-message">{confirmationMessage.title}</div>
                <div id="confirmation-button-container">
                  <div className="confirmation-button" onClick={handleDeleteSlot}>{confirmationMessage.left}</div>
                  <div className="confirmation-button" onClick={() => { setConfirmationMessage({}); }}>{confirmationMessage.right}</div>
                </div>
              </div>
            </div>
            :
            <></>
          }
  
        </section>
      );
    } else if (page === 1) {
      return(
        <section id="blacksmith" className="custom-border-1">
          <div id="blacksmith-title-background">
            <div id="blacksmith-title">Blacksmith</div>
          </div>
          <div id="blacksmith-content-container">
            <OfflineDisplay loggedIn={true} setPage={setPage}/>

            {/* Page Buttons */}
            <div id="blacksmith-page-left-button" className={"" + (page === 2 ? "page-button-enabled" : "")} onClick={() => {
                if (page === 2) {
                  setPage(1);
                }
              }}/>
            <div id="blacksmith-page-number-display">{page}/{numberPages}</div>
            <div id="blacksmith-page-right-button" className={"" + (page === 1 ? "page-button-enabled" : "")} onClick={() => {
                if (page === 1) {
                  setPage(2);
                }
              }}/>
          </div>
        </section>
      );
    } else if (page === 3) {
      numberPages = 4;
      return(
        <section id="blacksmith" className="custom-border-1">
          <div id="blacksmith-title-background">
            <div id="blacksmith-title">Backpack</div>
          </div>
          <div id="blacksmith-content-container">
            <GearCreator currentGear={currentGear} setCurrentGear={setCurrentGear}/>
            <GearSearch currentGear={currentGear} setCurrentGear={setCurrentGear} wizard={wizard}/>

            {/* Page Buttons */}
            <div id="blacksmith-page-left-button" className="page-button-enabled" onClick={() => {
                if (page === 3) {
                  setPage(2);
                }
              }}/>
            <div id="blacksmith-page-number-display">{page}/{numberPages}</div>
            <div id="blacksmith-page-right-button" className="page-button-enabled" onClick={() => {
                if (page === 3) {
                  setPage(4);
                }
              }}/>
          </div>
        </section>
      );
    }
  } else {
    return(
      <section id="blacksmith" className="custom-border-1">
        <div id="blacksmith-title-background">
          <div id="blacksmith-title">Blacksmith</div>
        </div>
        <div id="blacksmith-content-container">
          <OfflineDisplay loggedIn={false}/>
        </div>
      </section>
    );
  }
}
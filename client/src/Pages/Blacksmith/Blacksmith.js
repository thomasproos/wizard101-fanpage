// Import dependencies
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// Import CSS
import './Blacksmith.css';

// Import Components
import OfflineDisplay from './OfflineDisplay/OfflineDisplay';

// Import Assets
import CharacterList from './CharacterList/CharacterList';
import CharacterCreator from './CharacterCreator/CharacterCreator';

export default function Blacksmith() {
  const [profile, setProfile] = useState({});
  const [confirmationMessage, setConfirmationMessage] = useState({});
  const [currentSlot, setCurrentSlot] = useState({});
  const [valid, setValid] = useState(false);

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
    return(
      <section id="blacksmith" className="custom-border-1">
        <div id="blacksmith-title-background">
          <div id="blacksmith-title">Blacksmith</div>
        </div>
        <div id="blacksmith-content-container">

          {/* Character List */}
          <CharacterList currentSlot={currentSlot} setCurrentSlot={setCurrentSlot} profile={profile}/>

          {/* Character Creator */}
          <CharacterCreator profile={profile} currentSlot={currentSlot} setCurrentSlot={setCurrentSlot} confirmationMessage={confirmationMessage}
            setConfirmationMessage={setConfirmationMessage} setProfile={setProfile} valid={valid} setValid={setValid}/>
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
  } else {
    return(
      <section id="blacksmith" className="custom-border-1">
        <div id="blacksmith-title-background">
          <div id="blacksmith-title">Blacksmith</div>
        </div>
        <div id="blacksmith-content-container">
          <OfflineDisplay />
        </div>
      </section>
    );
  }
}
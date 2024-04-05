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
  const [currentSlot, setCurrentSlot] = useState({ index: 0, name: 'EMPTY SLOT 1', school: 'spiral', level: 0 });

  // Setup global variables
  const loginStatus = useSelector(state => state.loginStatus);

  // Fetch user profile
  useEffect(() => {
    if (loginStatus) {
      (async () => {
        try {
          const response = await fetch('/api/v1/auth/user');

          if (response.ok) {
            const result = await response.json();
            setProfile(result.user[0]);

            // Set default position
            if (result.user[0].wizard_slots.length > 0) {
              setCurrentSlot({
                index: 0, 
                name: result.user[0].wizard_slots[0].name,
                school: result.user[0].wizard_slots[0].school,
                level: result.user[0].wizard_slots[0].level
              });
            }
            // console.log(result.user[0]);
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
          <CharacterCreator currentSlot={currentSlot} setCurrentSlot={setCurrentSlot}/>
        </div>
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
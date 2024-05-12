// Import Dependencies
import { useState } from "react";

// Import Components
import CharacterCreator from "./CharacterCreator/CharacterCreator";
import CharacterList from "./CharacterList/CharacterList";
import Flags from "../Flags/Flags";

// Import CSS
import './StarPage.css';

export default function StarPage({ currentSlot, setCurrentSlot, profile, setProfile, page, setPage }) {
  const [valid, setValid] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState({});

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

  return(
    <section id="backpack" className="custom-border-2">
      <div id="backpack-content-container">
        <div id="backpack-title-background">
          <div id="backpack-title">Backpack</div>
        </div>

        {/* Character List */}
        <CharacterList currentSlot={currentSlot} setCurrentSlot={setCurrentSlot} profile={profile}/>

        {/* Character Creator */}
        <CharacterCreator setPage={setPage} profile={profile} currentSlot={currentSlot} setCurrentSlot={setCurrentSlot} confirmationMessage={confirmationMessage}
          setConfirmationMessage={setConfirmationMessage} setProfile={setProfile} valid={valid} setValid={setValid} />
        <Flags star={true} stats={true} backpack={true} question={true} settings={true} setPage={setPage} page={page}/>
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
}
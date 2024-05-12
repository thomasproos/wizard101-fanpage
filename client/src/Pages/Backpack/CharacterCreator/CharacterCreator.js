// Import Assets
import SpiralBook from '../../../Assets/Buttons/spiral-book.png';
import Button from '../../../Assets/Buttons/arrow-icon.png';
import Delete from '../../../Assets/Buttons/delete-button.png';
import Info from '../../../Assets/ItemIcons/info-icon.png';

// Import dependencies
import { useRef, useState, useEffect } from 'react';

// Import CSS
import './CharacterCreator.css';

export default function CharacterCreator({ profile, currentSlot, setCurrentSlot, setConfirmationMessage, 
  setProfile, valid, setValid, setPage, setWizard }) {
  const [isRunning, setIsRunning] = useState(false);
  const [buttonStatus, setButtonStatus] = useState('add');
  const [infoStatus, setInfoStatus] = useState(false);
  const [systemMessage, setSystemMessage] = useState('');
  const mouseIsDown = useRef(false);

  // CSS text span
  const spanBlue = {
    color: 'rgb(78, 175, 255)'
  };
  const spanRed = {
    color: 'rgb(255, 89, 89)'
  };
  const spanYellow = {
    color: 'rgb(255, 219, 58)'
  };

  // Define the clickhold interval
  useInterval(() => {
    if (buttonStatus === 'add') {
      setCurrentSlot({
        index: currentSlot.index,
        created: currentSlot.created, 
        name: currentSlot.name,
        school: currentSlot.school,
        level: currentSlot.level + (currentSlot.level + 1 <= 170 ? 1 : 0)
      })
    } else {
      setCurrentSlot({
        index: currentSlot.index, 
        created: currentSlot.created, 
        name: currentSlot.name,
        school: currentSlot.school,
        level: currentSlot.level - (currentSlot.level - 1 > 0 ? 1 : 0)
      })
    }
  }, isRunning ? 50 : null);

  // Handle starting and stopping the mouse down
  const handleStartLoop = () => {
    mouseIsDown.current = true;
    setTimeout(() => {
      if (mouseIsDown.current) {
        setIsRunning(true);
      }
    }, 600);
  };

  const handleStopLoop = () => {
    mouseIsDown.current = false;
    setIsRunning(false);
  };

  // Create the account
  const handleCreateCharacter = async () => {
    if (valid) {
      setValid(false);
      try {
        const response = await fetch('/api/v1/auth/update-wizard-slot/', {
          method: 'PUT',
          body: JSON.stringify({
            name: currentSlot.name,
            created: currentSlot.created,
            index: currentSlot.index, 
            level: currentSlot.level,
            school: currentSlot.school
          }),
          headers: {'Content-Type' : 'application/json'}
        });

        if (response.ok) {
          setSystemMessage('');
          try {
            const response = await fetch('/api/v1/auth/user');
  
            if (response.ok) {
              const result = await response.json();
              setProfile(result.user);
  
              // Set default position
              if (result.user.wizard_slots.length > 0) {
                setCurrentSlot({
                  name: currentSlot.name,
                  created: true,
                  index: currentSlot.index > profile.wizard_slots.length - 1 ? profile.wizard_slots.length : currentSlot.index, 
                  level: currentSlot.level,
                  school: currentSlot.school
                });
              }
            } else {
              setSystemMessage('Something went wrong :(');
            }
          } catch(error) {
            setSystemMessage('Something went wrong :(');
            console.log('Server Error: Failed to fetch user profile.');
          }
        } else {
          setSystemMessage('Something went wrong :(');
        }
      } catch(error) {
        setSystemMessage('Something went wrong :(');
        console.log('Fetch Error : Failed to create new wizard character.');
      }
    } else {
      if (currentSlot.name.length < 4) {
        setSystemMessage('Minimum name length is 4');
      } else if (!currentSlot.name.match('^[A-Z0-9\\s]{4,20}$')) {
        setSystemMessage('No special characters!');
      } else if (currentSlot.school === 'spiral') {
        setSystemMessage('Please choose a school!');
      } else if (currentSlot.level === 0) {
        setSystemMessage('Please choose a level!')
      }
    }
  };

  // Check if there have been any changes to save
  const checkIfChanged = () => {
    if (currentSlot.name !== profile.wizard_slots[currentSlot.index].name) {
      return true;
    } else if (currentSlot.level !== profile.wizard_slots[currentSlot.index].level) {
      return true;
    } else if (currentSlot.school !== profile.wizard_slots[currentSlot.index].school) {
      return true;
    } else {
      return false;
    }
  };

  if (Object.keys(currentSlot).length > 0) {
    return(
      <div id="backpack-wizard-slot-creator" className="custom-border-2">
        <div className="backpack-wizard-editor-header custom-border-2">Character View</div>
        
        {/* Name */}
        <div className="backpack-wizard-editor-name-container">
          <div id="backpack-wizard-editor-name-label">Name</div>
          <input type="text" id="backpack-wizard-editor-name-input" className="custom-border-2" maxLength="20" value={currentSlot.name}
            onChange={(event) => {
              let characterName = event.target.value.toUpperCase()
              setCurrentSlot({
                index: currentSlot.index, 
                created: currentSlot.created, 
                name: characterName,
                school: currentSlot.school,
                level: currentSlot.level
              });
              if (characterName.match('^[A-Z0-9\\s]{4,20}$') && currentSlot.level > 0 && currentSlot.level <= 170 && currentSlot.school !== 'spiral') {
                setValid(true);
              } else {
                setValid(false);
              }}}></input>
        </div>

        {/* School */}
        <div className="backpack-wizard-editor-name-container">
          <div id="backpack-wizard-editor-name-label">School</div>
          <div id="backpack-wizard-editor-school-selector" className="custom-border-2">
            {['storm', 'fire', 'ice', 'life', 'death', 'myth', 'balance'].map((school, index) => {
              return(
                <div key={index} className={`active-wizard-slot-${school} active-wizard-slot-icon backpack-wizard-editor-school-icon ` + (currentSlot.school === school ? 'current-slot-school' : '')}
                onClick={() => {setCurrentSlot({
                  index: currentSlot.index, 
                  created: currentSlot.created, 
                  name: currentSlot.name,
                  school: school,
                  level: currentSlot.level
                });
                if (currentSlot.name.match('^[A-Z0-9\\s]{4,20}$') && currentSlot.level > 0 && currentSlot.level <= 170) {
                  setValid(true);
                } else {
                  setValid(false);
                }}}/>
              );
            })}
          </div>
        </div>

        {/* Level */}
        <div className="backpack-wizard-editor-name-container">
          <div id="backpack-wizard-editor-name-label">Level</div>
          <input type="number" id="backpack-wizard-editor-level-input" disabled className="custom-border-2" min="1" max="170" value={currentSlot.level}
            onChange={(event) => {setCurrentSlot({
              index: currentSlot.index, 
              created: currentSlot.created, 
              name: currentSlot.name,
              school: currentSlot.school,
              level: event.target.value
            });
            if (currentSlot.name.match('^[A-Z0-9\\s]{4,20}$') && event.target.value > 0 && event.target.value <= 170 && currentSlot.school !== 'spiral') {
              setValid(true);
            } else {
              setValid(false);
            }}}></input>

            {/* Increase Button */}
            <img src={Button} id="wizard-editor-level-increase" alt="Increase Level Button" 
            onClick={() => {setCurrentSlot({
              index: currentSlot.index, 
              created: currentSlot.created, 
              name: currentSlot.name,
              school: currentSlot.school,
              level: currentSlot.level + (currentSlot.level + 1 <= 170 ? 1 : 0)
            });
            if (currentSlot.name.match('^[A-Z0-9\\s]{4,20}$') && currentSlot.level + 1 > 0 && currentSlot.level <= 170 && currentSlot.school !== 'spiral') {
              setValid(true);
            } else {
              setValid(false);
            }}} onMouseDown={() => { setButtonStatus('add'); handleStartLoop(); }} onMouseUp={handleStopLoop} onMouseLeave={handleStopLoop} draggable="false"/>

            {/* Decrease Button */}
            <img src={Button} id="wizard-editor-level-decrease" alt="Decrease Level Button" 
            onClick={() => {setCurrentSlot({
              index: currentSlot.index, 
              created: currentSlot.created, 
              name: currentSlot.name,
              school: currentSlot.school,
              level: currentSlot.level - (currentSlot.level - 1 > 0 ? 1 : 0)
            });
            if (currentSlot.name.match('^[A-Z0-9\\s]{4,20}$') && currentSlot.level > 0 && currentSlot.level <= 170 && currentSlot.school !== 'spiral') {
              setValid(true);
            } else {
              setValid(false);
            }}} onMouseDown={() => { setButtonStatus('sub'); handleStartLoop(); }} onMouseUp={handleStopLoop} onMouseLeave={handleStopLoop} draggable="false"/>
        </div>

        {/* Save Button */}
        <div className={"backpack-wizard-editor-save-button " + (valid ? currentSlot.created ? checkIfChanged() ? "editor-save-button-valid" : "" : "editor-save-button-valid" : "")} onClick={handleCreateCharacter}>
          {(currentSlot.created ? "Save Changes" : "Create")}
        </div>

        {/* Delete Button */}
        {currentSlot.created ?
          <img src={Delete} alt="Delete Button" id="wizard-slot-delete-button" onClick={() => {
            setConfirmationMessage({
              title: 'Are you sure you want to delete this slot?',
              left: 'Yes',
              right: 'No'
            });
          }}/>
          :
          <></>
        }

        {/* Information Button */}
        <img src={Info} alt="Information Button" id="wizard-slot-info-button" onClick={() => { setInfoStatus(!infoStatus); }} />
        <div id="tooltip-info-character-view" className={"tooltip custom-border-2 " + (infoStatus ? "tooltip-visible" : "")}>
        <span style={spanBlue}>Info</span>: You can rename your character, change their level, and change schools! <br/><br/> 
          
          <span style={spanRed}>Warning</span>: Changing your school or lowering your level after you have equipped gear will unequip
          it all. <br/><br/> 
          
          <span style={spanYellow}>Note</span>: Increasing your character's level will NOT affect your equipped gear.
        </div>

        {/* Spiral Book */}
        <img src={SpiralBook} alt="Backpack button" className={"backpack-wizard-editor-button-inactive " 
          + (currentSlot.created && !checkIfChanged() ? "backpack-wizard-editor-button-active" : "")} 
          onClick={() => {
            if (!currentSlot.created) {
              setSystemMessage('Create your wizard first!');
            } else if (checkIfChanged()) {
              setSystemMessage('Save your changes first!');
            } else {
              setWizard(profile.wizard_slots[currentSlot.index]);
              setPage(3);
            }
          }}/>

        {/* System Messages */}
        {systemMessage !== '' ?
          <div id="wizard-slot-system-message" className="custom-border-2" onClick={() => { setSystemMessage(''); }}>
            <div className="wizard-slot-system-icon"/>
            {systemMessage}
            <div className="wizard-slot-system-icon"/>
          </div>
          :
          <></>
        }
      </div>
    );
  } else {
    return(
      <div id="backpack-wizard-slot-creator" className="custom-border-2">
        <div className="backpack-wizard-editor-header custom-border-2">Character View</div>

        <div id="character-editor-message" className="custom-border-2">Please choose<br/>a character slot</div>

        {/* Information Button */}
        <img src={Info} alt="Information Button" id="wizard-slot-info-button" onClick={() => { setInfoStatus(!infoStatus); }} />
        <div id="tooltip-info-character-view" className={"tooltip custom-border-2 " + (infoStatus ? "tooltip-visible" : "")}>
        <span style={spanBlue}>Info</span>: You can rename your character, change their level, and change schools! <br/><br/> 
          
          <span style={spanRed}>Warning</span>: Changing your school or lowering your level after you have equipped gear will unequip
          it all. <br/><br/> 
          
          <span style={spanYellow}>Note</span>: Increasing your character's level will NOT affect your equipped gear.
        </div>
      </div>
    );
  }

  function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
  
      let intervalId;
      if (delay !== null) {
        intervalId = setInterval(tick, delay);
      }
  
      return () => clearInterval(intervalId);
    }, [delay]);
  }
}
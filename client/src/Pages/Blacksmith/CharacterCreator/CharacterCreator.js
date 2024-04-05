// Import Assets
import SpiralBook from '../../../Assets/spiral-book.png';
import Button from '../../../Assets/arrow-icon.png';
import { useRef, useState, useEffect } from 'react';

// Import CSS
import './CharacterCreator.css';

export default function CharacterCreator({ currentSlot, setCurrentSlot }) {
  const [valid, setValid] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [buttonStatus, setButtonStatus] = useState('add');
  const mouseIsDown = useRef(false);

  // Define the clickhold interval
  useInterval(() => {
    if (buttonStatus === 'add') {
      setCurrentSlot({
        index: currentSlot.index, 
        name: currentSlot.name,
        school: currentSlot.school,
        level: currentSlot.level + (currentSlot.level + 1 <= 170 ? 1 : 0)
      })
    } else {
      setCurrentSlot({
        index: currentSlot.index, 
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
      try {
        const response = await fetch('/api/v1/auth', {
          method: 'PUT',
          body: {},
          headers: {}
        });
      } catch(error) {
        console.log('Fetch Error : Failed to create new wizard character.');
      }
    }
  };

  return(
    <div id="blacksmith-wizard-slot-creator" className="custom-border-2">
      <div className="blacksmith-wizard-editor-header custom-border-2">Character Editor</div>
      
      {/* Name */}
      <div className="blacksmith-wizard-editor-name-container">
        <div id="blacksmith-wizard-editor-name-label">Name</div>
        <input type="text" id="blacksmith-wizard-editor-name-input" className="custom-border-2" maxLength="20" value={currentSlot.name}
          onChange={(event) => {
            let characterName = event.target.value.toUpperCase()
            setCurrentSlot({
              index: currentSlot.index, 
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
      <div className="blacksmith-wizard-editor-name-container">
        <div id="blacksmith-wizard-editor-name-label">School</div>
        <div id="blacksmith-wizard-editor-school-selector" className="custom-border-2">
          {['storm', 'fire', 'ice', 'life', 'death', 'myth', 'balance'].map((school, index) => {
            return(
              <div key={index} className={`active-wizard-slot-${school} blacksmith-wizard-editor-school-icon ` + (currentSlot.school === school ? 'current-slot-school' : '')}
              onClick={() => {setCurrentSlot({
                index: currentSlot.index, 
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
      <div className="blacksmith-wizard-editor-name-container">
        <div id="blacksmith-wizard-editor-name-label">Level</div>
        <input type="number" id="blacksmith-wizard-editor-level-input" disabled className="custom-border-2" min="1" max="170" maxLength="3" value={currentSlot.level}
          onChange={(event) => {setCurrentSlot({
            index: currentSlot.index, 
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
            name: currentSlot.name,
            school: currentSlot.school,
            level: Number.parseInt(currentSlot.level) + (currentSlot.level + 1 <= 170 ? 1 : 0)
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
            name: currentSlot.name,
            school: currentSlot.school,
            level: Number.parseInt(currentSlot.level) - (currentSlot.level - 1 > 0 ? 1 : 0)
          });
          if (currentSlot.name.match('^[A-Z0-9\\s]{4,20}$') && currentSlot.level > 0 && currentSlot.level <= 170 && currentSlot.school !== 'spiral') {
            setValid(true);
          } else {
            setValid(false);
          }}} onMouseDown={() => { setButtonStatus('sub'); handleStartLoop(); }} onMouseUp={handleStopLoop} onMouseLeave={handleStopLoop} draggable="false"/>
      </div>

      {/* Save Button */}
      <div className={"blacksmith-wizard-editor-save-button " + (valid ? "editor-save-button-valid" : "")}>Create</div>

      {/* Spiral Book */}
      <img src={SpiralBook} alt="Backpack button" id="blacksmith-wizard-editor-button-inactive" />
    </div>
  );

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
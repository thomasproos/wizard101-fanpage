// Import dependencies
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Import CSS
import './Blacksmith.css';

// Import Components
import GearCreator from './GearCreator/GearCreator';
import GearSearch from './GearSearch/GearSearch';
import OfflineDisplay from './OfflineDisplay/OfflineDisplay';

// Import Assets
import SpiralBook from '../../Assets/spiral-book.png';
import Button from '../../Assets/arrow-icon.png';

export default function Blacksmith() {
  // const [currentGear, setCurrentGear] = useState('all');

  const [profile, setProfile] = useState({});
  const [currentSlot, setCurrentSlot] = useState({
    index: 0, 
    name: 'Empty Slot 1',
    school: 'spiral',
    level: 0
  });
  const [valid, setValid] = useState(false);
  const interval = useRef();
  const finalValue = useRef();

  // Setup global variables
  const loginStatus = useSelector(state => state.loginStatus);

  // Setup navigation
  const navigate = useNavigate();

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
          <div id="blacksmith-wizard-slot-list" className="custom-border-2">
            <div className="blacksmith-wizard-slot-shading">
              <div className="blacksmith-wizard-slot-header custom-border-2">Wizard Character Slots</div>
              {Object.keys(profile).length !== 0 ?
                <div id="blacksmith-wizard-slot-container">
                  {[...Array(10)].map((item, index) => {
                    if (profile.wizard_slots.length > index) {
                      return(
                        <div key={index} className={"blacksmith-wizard-slot-character-valid " + (index === currentSlot.index ? "custom-border-3" : "custom-border-2")} 
                          onClick={() => {setCurrentSlot({
                            index: index, 
                            name: profile.wizard_slots[index].name,
                            school: profile.wizard_slots[index].school,
                            level: profile.wizard_slots[index].level
                          })}}>
                          <div className={`active-wizard-slot-${profile.wizard_slots[index].school} blacksmith-wizard-slot-school-icon`}></div>
                          <div className="blacksmith-wizard-slot-character-name">{profile.wizard_slots[index].name}</div>
                        </div>
                      );
                    } else {
                      return(
                      <div key={index} className={"blacksmith-wizard-slot-character-empty " + (index === currentSlot.index ? "custom-border-3" : "custom-border-4")}
                        onClick={() => {setCurrentSlot({
                          index: index, 
                          name: `Empty Slot ${index + 1}`,
                          school: 'spiral',
                          level: '0',
                        })}}>
                        <div className={`blacksmith-wizard-slot-school-icon ` + (index === currentSlot.index ? `active-wizard-slot-${currentSlot.school}` : `active-wizard-slot-spiral`)}></div>
                        <div className="blacksmith-wizard-slot-character-name-empty">{index === currentSlot.index ? currentSlot.name : `Empty Slot ${index + 1}`}</div>
                      </div>
                      );
                    }
                  })}
                </div>
                :
                <></>
              }
            </div>
          </div>

          {/* Character Creator */}
          <div id="blacksmith-wizard-slot-creator" className="custom-border-2">
            <div className="blacksmith-wizard-editor-header custom-border-2">Character Editor</div>
            
            {/* Name */}
            <div className="blacksmith-wizard-editor-name-container">
              <div id="blacksmith-wizard-editor-name-label">Name</div>
              <input type="text" id="blacksmith-wizard-editor-name-input" className="custom-border-2" maxLength="25" value={currentSlot.name}
                onChange={(event) => {setCurrentSlot({
                  index: currentSlot.index, 
                  name: event.target.value,
                  school: currentSlot.school,
                  level: currentSlot.level
                });
                if (event.target.value.length > 0 && currentSlot.level > 0 && currentSlot.level <= 170 && currentSlot.school !== 'spiral') {
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
                    if (currentSlot.name.length > 0 && currentSlot.level > 0 && currentSlot.level <= 170) {
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
              <input type="number" id="blacksmith-wizard-editor-level-input" className="custom-border-2" min="1" max="170" maxLength="3" value={currentSlot.level}
                onChange={(event) => {setCurrentSlot({
                  index: currentSlot.index, 
                  name: currentSlot.name,
                  school: currentSlot.school,
                  level: event.target.value
                });
                if (currentSlot.name.length > 0 && event.target.value > 0 && event.target.value <= 170 && currentSlot.school !== 'spiral') {
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
                  level: currentSlot.level + (currentSlot.level + 1 <= 170 ? 1 : 0)
                });
                if (currentSlot.name.length > 0 && currentSlot.level + 1 > 0 && currentSlot.level + 1 <= 170 && currentSlot.school !== 'spiral') {
                  setValid(true);
                } else {
                  setValid(false);
                }}} onMouseDown={() => {
                  setTimeout(() => {
                    finalValue.current = currentSlot.level;
                    interval.current = useInterval(() => {
                      setCurrentSlot({
                        index: currentSlot.index, 
                        name: currentSlot.name,
                        school: currentSlot.school,
                        level: finalValue + (finalValue.current + 1 <= 170 ? 1 : 0)
                      });
                      console.log('level: ' + finalValue.current);
                    }, 1000);
                  }, 1000);
                }} onMouseUp={() => {
                  clearInterval(interval.current);
                  console.log('goodbye');
                }}/>

                {/* Decrease Button */}
                <img src={Button} id="wizard-editor-level-decrease" alt="Decrease Level Button" />
            </div>

            {/* Save Button */}
            <div className={"blacksmith-wizard-editor-save-button " + (valid ? "editor-save-button-valid" : "")}>Create</div>

            {/* Spiral Book */}
            <img src={SpiralBook} alt="Backpack button" id="blacksmith-wizard-editor-button-inactive" />
          </div>
          {/* <GearCreator currentGear={currentGear} setCurrentGear={setCurrentGear}/>
          <GearSearch currentGear={currentGear} setCurrentGear={setCurrentGear}/> */}
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

  function useInterval(callback, delay) {
    const savedCallback = useRef();
   
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
   
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }
}
// Import dependencies
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Import CSS
import './Blacksmith.css';

// Import Components
import GearCreator from './GearCreator/GearCreator';
import GearSearch from './GearSearch/GearSearch';
import OfflineDisplay from './OfflineDisplay/OfflineDisplay';

export default function Blacksmith() {
  // const [currentGear, setCurrentGear] = useState('all');
  const [wizardSlots, setWizardSlots] = useState([
    {
      school: 'storm',
      name: 'LIAM STORMWOLFAAAAAAAAAA'
    },
    {
      school: 'fire',
      name: 'EMILY FIREHEART'
    },
    {
      school: 'ice',
      name: 'DANIEL ICEFANG'
    },
    {
      school: 'death',
      name: 'SAMANTHA DEATHSONG'
    },
    {
      school: 'life',
      name: 'LIAM WINTERFLOWER'
    }
  ]);
  const [currentSlot, setCurrentSlot] = useState({});

  // Setup global variables
  const loginStatus = useSelector(state => state.loginStatus);

  // Setup navigation
  const navigate = useNavigate();
  
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
              <div id="blacksmith-wizard-slot-container">
                {[...Array(8)].map((item, index) => {
                  if (wizardSlots.length > index) {
                    return(
                      <div key={index} className="blacksmith-wizard-slot-character-valid custom-border-2" onDoubleClick={() => {}}>
                        <div className={`active-wizard-slot-${wizardSlots[index].school} blacksmith-wizard-slot-school-icon`}></div>
                        <div className="blacksmith-wizard-slot-character-name">{wizardSlots[index].name}</div>
                      </div>
                    );
                  } else {
                    return(
                      <div key={index}></div>
                    );
                  }
                })}
              </div>
            </div>
          </div>

          {/* Character Creator */}
          <div id="blacksmith-wizard-slot-creator" className="custom-border-2">

            Create a slot
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
}
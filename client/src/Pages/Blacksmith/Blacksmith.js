// Import dependencies
import { useState } from 'react';

// Import CSS
import './Blacksmith.css';
import GearCreator from './GearCreator/GearCreator';
import GearSearch from './GearSearch/GearSearch';

export default function Blacksmith() {
  const [currentGear, setCurrentGear] = useState('hat');

  return(
    <section id="blacksmith" className="custom-border-1">
      <div id="blacksmith-title-background">
        <div id="blacksmith-title">Blacksmith</div>
      </div>
      <div id="blacksmith-content-container">
        <GearCreator currentGear={currentGear} setCurrentGear={setCurrentGear}/>
        <GearSearch currentGear={currentGear}/>
      </div>
    </section>
  );
}
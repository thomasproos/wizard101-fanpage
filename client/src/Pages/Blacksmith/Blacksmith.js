// Import dependencies
import { useState } from 'react';

// Import CSS
import './Blacksmith.css';
import GearCreator from './GearCreator/GearCreator';

export default function Blacksmith() {
  const [currentGear, setCurrentGear] = useState('');

  return(
    <section id="blacksmith-component" className="custom-border-1">
      <div id="blacksmith-component-title-background">
        <div id="blacksmith-component-title">Blacksmith</div>
      </div>
      <div id="blacksmith-component-content-container">
        <GearCreator currentGear={currentGear} setCurrentGear={setCurrentGear}/>
      </div>
    </section>
  );
}
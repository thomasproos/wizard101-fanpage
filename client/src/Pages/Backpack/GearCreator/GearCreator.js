// Import Assets
import BorderLine from '../../../Assets/CustomAssets/border-line.png';

// Import CSS
import './GearCreator.css';

export default function GearCreator({ currentGear, setCurrentGear }) {

  // Handle clicking on a gear set
  const handleGearClick = (gear) => {
    setCurrentGear(gear);
  };

  return(
    <div id="backpack-display-box" className="custom-border-2">
      {/* Hat */}
      <div id="backpack-display-hat" className={"backpack-gear-icon " + (currentGear === 'hat' ? 'backpack-gear-selected' : '')} 
        onClick={() => {handleGearClick('hat')}}/>

      {/* Amulet */}
      <div id="backpack-display-amulet" className={"backpack-gear-icon " + (currentGear === 'amulet' ? 'backpack-gear-selected' : '')} 
        onClick={() => {handleGearClick('amulet')}}/>

      {/* Ring - Wand */}
      <div id="backpack-display-row-3">
        <div id="backpack-display-ring" className={"backpack-gear-icon " + (currentGear === 'ring' ? 'backpack-gear-selected' : '')} 
        onClick={() => {handleGearClick('ring')}}/>
        <div id="backpack-display-wand" className={"backpack-gear-icon " + (currentGear === 'wand' ? 'backpack-gear-selected' : '')} 
        onClick={() => {handleGearClick('wand')}}/>

        {/* CSS LINES */}
        <img src={BorderLine} alt="" id="g-line-1" className="backpack-gear-line" />
        <img src={BorderLine} alt="" id="g-line-6" className="backpack-gear-line" />
        <img src={BorderLine} alt="" id="g-line-7" className="backpack-gear-line" />
        <img src={BorderLine} alt="" id="g-line-8" className="backpack-gear-line" />
      </div>

      <div id="backpack-display-row-center">
        <div id="backpack-display-all" className={"backpack-gear-icon " + (currentGear === 'all' ? 'backpack-gear-selected' : '')} 
          onClick={() => {handleGearClick('all')}}/>
      </div>

      {/* Deck - Robe - Athame */}
      <div id="backpack-display-row-4">
        <div id="backpack-display-deck" className={"backpack-gear-icon " + (currentGear === 'deck' ? 'backpack-gear-selected' : '')} 
        onClick={() => {handleGearClick('deck')}}/>
        <div id="backpack-display-robe" className={"backpack-gear-icon " + (currentGear === 'robe' ? 'backpack-gear-selected' : '')} 
        onClick={() => {handleGearClick('robe')}}/>
        <div id="backpack-display-athame" className={"backpack-gear-icon " + (currentGear === 'athame' ? 'backpack-gear-selected' : '')} 
        onClick={() => {handleGearClick('athame')}}/>

        {/* CSS LINES */}
        <img src={BorderLine} alt="" id="g-line-2" className="backpack-gear-line" />
        <img src={BorderLine} alt="" id="g-line-3" className="backpack-gear-line" />
        <img src={BorderLine} alt="" id="g-line-4" className="backpack-gear-line" />
        <img src={BorderLine} alt="" id="g-line-5" className="backpack-gear-line" />
      </div>

      {/* Boots */}
      <div id="backpack-display-boots" className={"backpack-gear-icon " + (currentGear === 'boots' ? 'backpack-gear-selected' : '')} 
        onClick={() => {handleGearClick('boots')}}/>
    </div>
  );
}
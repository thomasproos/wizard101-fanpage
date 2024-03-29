// Import Assets
import BorderLine from '../../../Assets/border-line.png';

// Import CSS
import './GearCreator.css';

export default function GearCreator({ currentGear, setCurrentGear }) {

  // Handle clicking on a gear set
  const handleGearClick = (gear) => {
    if (currentGear === gear) {
      setCurrentGear('');
    } else {
      setCurrentGear(gear);
    }
  };

  return(
    <div id="blacksmith-component-display-box">
      {/* Hat */}
      <div id="blacksmith-component-display-hat" className={"blacksmith-gear-icon " + (currentGear === 'hat' ? 'blacksmith-gear-selected' : '')} 
        onClick={() => {handleGearClick('hat')}}/>

      {/* Amulet */}
      <div id="blacksmith-component-display-amulet" className={"blacksmith-gear-icon " + (currentGear === 'amulet' ? 'blacksmith-gear-selected' : '')} 
        onClick={() => {handleGearClick('amulet')}}/>

      {/* Ring - Robe - Wand */}
      <div id="blacksmith-component-display-row-3">
        <div id="blacksmith-component-display-ring" className={"blacksmith-gear-icon " + (currentGear === 'ring' ? 'blacksmith-gear-selected' : '')} 
        onClick={() => {handleGearClick('ring')}}/>
        <div id="blacksmith-component-display-robe" className={"blacksmith-gear-icon " + (currentGear === 'robe' ? 'blacksmith-gear-selected' : '')} 
        onClick={() => {handleGearClick('robe')}}/>
        <div id="blacksmith-component-display-wand" className={"blacksmith-gear-icon " + (currentGear === 'wand' ? 'blacksmith-gear-selected' : '')} 
        onClick={() => {handleGearClick('wand')}}/>

        {/* CSS LINES */}
        <img src={BorderLine} alt="" id="g-line-1" className="blacksmith-component-gear-line" />
        <img src={BorderLine} alt="" id="g-line-6" className="blacksmith-component-gear-line" />
        <img src={BorderLine} alt="" id="g-line-7" className="blacksmith-component-gear-line" />
        <img src={BorderLine} alt="" id="g-line-8" className="blacksmith-component-gear-line" />
      </div>

      {/* Deck - Athame */}
      <div id="blacksmith-component-display-row-4">
        <div id="blacksmith-component-display-deck" className={"blacksmith-gear-icon " + (currentGear === 'deck' ? 'blacksmith-gear-selected' : '')} 
        onClick={() => {handleGearClick('deck')}}/>
        <div id="blacksmith-component-display-athame" className={"blacksmith-gear-icon " + (currentGear === 'athame' ? 'blacksmith-gear-selected' : '')} 
        onClick={() => {handleGearClick('athame')}}/>

        {/* CSS LINES */}
        <img src={BorderLine} alt="" id="g-line-2" className="blacksmith-component-gear-line" />
        <img src={BorderLine} alt="" id="g-line-3" className="blacksmith-component-gear-line" />
        <img src={BorderLine} alt="" id="g-line-4" className="blacksmith-component-gear-line" />
        <img src={BorderLine} alt="" id="g-line-5" className="blacksmith-component-gear-line" />
      </div>

      {/* Boots */}
      <div id="blacksmith-component-display-boots" className={"blacksmith-gear-icon " + (currentGear === 'boots' ? 'blacksmith-gear-selected' : '')} 
        onClick={() => {handleGearClick('boots')}}/>
    </div>
  );
}
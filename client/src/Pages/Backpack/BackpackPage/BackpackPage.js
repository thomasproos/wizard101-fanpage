// Import CSS
import './BackpackPage.css';

// Import Components
import GearCreator from '../GearCreator/GearCreator';
import GearSearch from '../GearSearch/GearSearch';
import Flags from '../Flags/Flags';

export default function BackpackPage({ currentGear, setCurrentGear, setPage, page, currentSlot }) {
  return(
    <section id="backpack" className="custom-border-2">
      <div id="backpack-content-container">
        <div id="backpack-title-background">
          <div id="backpack-title">Backpack</div>
        </div>
          
        <GearCreator currentGear={currentGear} setCurrentGear={setCurrentGear} />
        <GearSearch currentGear={currentGear} setCurrentGear={setCurrentGear} currentSlot={currentSlot} />

        <Flags star={true} stats={true} backpack={true} question={true} settings={true} setPage={setPage} page={page}/>
      </div>
    </section>
  );
}
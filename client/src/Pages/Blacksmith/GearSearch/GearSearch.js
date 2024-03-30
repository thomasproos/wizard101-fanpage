// Import CSS
import './GearSearch.css';

// Import Assets
import GoArrow from '../../../Assets/right-arrow.png';
import { useState } from 'react';

export default function GearSearch({ currentGear, setCurrentGear }) {
  const [dropDown, setDropDown] = useState(false);
  // Define array of gear items
  const [gearList] = useState(['all', 'hat', 'robe', 'boots', 'wand', 'ring', 'deck', 'athame', 'amulet']);

  // Handle opening and closing the dropdown
  const handleDropDown = () => {
    setDropDown(!dropDown);
  };

  // Handle the user changing the search option
  const handleChangeCurrentGear = (gear) => {
    setCurrentGear(gear);
    setDropDown(!dropDown);
  };

  return(
    <div id="blacksmith-gear-search">

      <div id="blacksmith-gear-search-bar-container" >
        <input type="text" id="blacksmith-gear-search-input-bar" 
          className="custom-border-2" />
        <div id="blacksmith-gear-search-go-button" className="custom-border-2">
          <img src={GoArrow} alt="search-button" id="blacksmith-gear-search-go-arrow" />
        </div>

        {/* DROP DOWN OPTION */}
        <div id="blacksmith-gear-search-display" className={`active-gear-${currentGear}`} onClick={handleDropDown}/>
        <section id="blacksmith-gear-search-dropdown-section" className={"" + (dropDown ? "display-visible" : "")}>
          {gearList.map((item, index) => {
            if (item !== currentGear) {
              return(
                <div key={index} className={`blacksmith-gear-dropdown-icon active-gear-${item}`}
                  onClick={() => {handleChangeCurrentGear(item)}} />
              );
            } else {
              return(
                <span key={index}></span>
              );
            }
          })}
        </section>
      </div>

      <div id="blacksmith-gear-search-item-list">
        {[...Array(8)].map((item, index) => {
          return(
            <div key={index} className="blacksmith-gear-search-item-placeholder"></div>
          );
        })}
      </div>
      <div id="blacksmith-gear-search-move-container">
        <div id="blacksmith-gear-search-backwards" className="blacksmith-gear-search-move-button" />
        <div id="blacksmith-gear-search-forward" className="blacksmith-gear-search-move-button" />
      </div>
    </div>
  );
}
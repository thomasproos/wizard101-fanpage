// Import CSS
import './GearSearch.css';

// Import Assets
import BorderLine from '../../../Assets/border-line.png';
import GoArrow from '../../../Assets/right-arrow.png';

export default function GearSearch({ currentGear }) {
  return(
    <div id="blacksmith-component-gear-search">

      <div id="blacksmith-component-gear-search-bar-container">
        <input type="text" id="blacksmith-component-gear-search-input-bar" placeholder={"Search " + currentGear + "s"}></input>
        <div id="blacksmith-component-gear-search-go-button">
          <img src={GoArrow} alt="search-button" id="blacksmith-component-gear-search-go-arrow"/>
        </div>

        {/* CSS LINES */}
        <img src={BorderLine} alt="" id="search-line-1" className="blacksmith-component-gear-line" />
        <img src={BorderLine} alt="" id="search-line-2" className="blacksmith-component-gear-line" />
        <img src={BorderLine} alt="" id="search-line-3" className="blacksmith-component-gear-line" />
        <img src={BorderLine} alt="" id="search-line-4" className="blacksmith-component-gear-line" />
      </div>

      <div id="blacksmith-component-gear-search-item-list">
        {[...Array(8)].map((item, index) => {
          return(
            <div key={index} className="blacksmith-component-gear-search-item-placeholder"></div>
          );
        })}
      </div>
      <div id="blacksmith-component-gear-search-move-container">
        <div id="blacksmith-component-gear-search-backwards" className="blacksmith-component-gear-search-move-button" />
        <div id="blacksmith-component-gear-search-forward" className="blacksmith-component-gear-search-move-button" />
      </div>
    </div>
  );
}
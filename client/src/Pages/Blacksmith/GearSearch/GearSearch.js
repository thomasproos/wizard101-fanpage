// Import CSS
import './GearSearch.css';

// Import Assets
import GoArrow from '../../../Assets/right-arrow.png';

export default function GearSearch({ currentGear }) {
  return(
    <div id="blacksmith-gear-search">

      <div id="blacksmith-gear-search-bar-container" >
        <input type="text" id="blacksmith-gear-search-input-bar" 
          className="custom-border-2" ></input>
        <div id="blacksmith-gear-search-go-button" className="custom-border-2">
          <img src={GoArrow} alt="search-button" id="blacksmith-gear-search-go-arrow" />
        </div>

        {/* DROP DOWN OPTION */}
        <div id="blacksmith-gear-search-display" className={`active-gear-${currentGear}`}/>
        <section id="blacksmith-gear-search-dropdown-section">

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
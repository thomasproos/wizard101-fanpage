// Import CSS
import './GearSearch.css';

export default function GearSearch({ currentGear }) {
  return(
    <div id="blacksmith-component-gear-search">
      <div id="blacksmith-component-gear-search-title">{currentGear} Search</div>
      <div id="blacksmith-component-gear-search-item-list">
        {[...Array(8)].map((index) => {
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
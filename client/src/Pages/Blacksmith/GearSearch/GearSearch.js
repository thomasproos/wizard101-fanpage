// Import CSS
import './GearSearch.css';

// Import Assets
import GoArrow from '../../../Assets/right-arrow.png';
import { useEffect, useState } from 'react';

export default function GearSearch({ currentGear, setCurrentGear }) {
  const [dropDown, setDropDown] = useState(false);
  // Define array of gear items
  const [gearList] = useState(['all', 'hat', 'robe', 'boots', 'wand', 'ring', 'deck', 'athame', 'amulet']);
  const [itemList, setItemList] = useState([]);
  const [page, setPage] = useState(1);
  const [equipedItems, setEquipedItems] = useState([]);

  // Handle opening and closing the dropdown
  const handleDropDown = () => {
    setDropDown(!dropDown);
  };

  // Handle the user changing the search option
  const handleChangeCurrentGear = (gear) => {
    setCurrentGear(gear);
    setDropDown(!dropDown);
  };

  // Handle equiping/unequiping items
  const handleDoubleClickItem = (name) => {
    // Check if item is already equipped
    if (equipedItems.length > 0) {
      if (equipedItems.includes(name)) {
        const tempList = equipedItems.filter((item) => {
          return item !== name;
        });
        setEquipedItems(tempList);
        return;
      }
    }

    // Equip the item by adding it to the list
    equipedItems.push(name);
    setEquipedItems(equipedItems);
  };

  // Fetch gear for the current gear item
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`/api/v1/item/random-items/${50}/${currentGear}`);

        // Validate response
        if (response.ok) {
          const result = await response.json();
          setItemList(result.items);
        }
      } catch(error) {
        console.log('Failed $#A5113KA');
      }
    })();
  }, [currentGear])

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
          const currentIndex = index*page;
          if (itemList.length > currentIndex) {
            return(
              <div key={index} className={"blacksmith-gear-search-item-valid " + (equipedItems.includes(itemList[currentIndex].name ? "blacksmith-gear-search-item-equipped" : ""))} onDoubleClick={() => {handleDoubleClickItem(itemList[currentIndex].name)}}>
                <div className={`active-gear-${itemList[currentIndex].type} blacksmith-gear-search-display-icon`}></div>
                <div className="blacksmith-gear-search-item-name">{itemList[currentIndex].name}</div>
              </div>
            );
          } else {
            return(
              <div key={index} className="blacksmith-gear-search-item-placeholder" id={`blacksmith-gear-search-item-${index}`}></div>
            );
          }
        })}
      </div>
      <div id="blacksmith-gear-search-move-container">
        <div id="blacksmith-gear-search-backwards" className="blacksmith-gear-search-move-button" />
        <div id="blacksmith-gear-search-forward" className="blacksmith-gear-search-move-button" />
      </div>
    </div>
  );
}
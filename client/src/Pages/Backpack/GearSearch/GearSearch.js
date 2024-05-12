// Import CSS
import './GearSearch.css';

// Import Assets
import GoArrow from '../../../Assets/Buttons/right-arrow.png';

// Import Dependencies
import { useEffect, useState } from 'react';
import ItemTooltip from './ItemTooltip/ItemTooltip';

export default function GearSearch({ currentSlot, currentGear, setCurrentGear }) {
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
  const handleDoubleClickItem = async (item) => {
    // Check if item is already equipped
    if (equipedItems.length > 0) {
      if (equipedItems.includes(item.name)) {
        const tempList = equipedItems.filter((gear) => {
          return gear !== item.name;
        });
        setEquipedItems(tempList);
        return;
      }
    }

    // Update the user
    const response = await fetch('/api/v1/auth/update-currentSlot-items', {
      method: 'PUT',
      body: JSON.stringify({
        currentSlot: currentSlot,
        gear: item
      }),
      headers: {'Content-Type' : 'application/json'}
    });

    if (response.ok) {
      console.log(':3');
    }

    // Equip the item by adding it to the list
    equipedItems.push(item.name);
    setEquipedItems(equipedItems);
  };

  // Fetch gear for the current gear item
  useEffect(() => {
    (async () => {
      if (currentGear !== 'all') {
        try {
          const response = await fetch(`/api/v1/item/random-items/${50}/${currentGear}`);
  
          // Validate response
          if (response.ok) {
            const result = await response.json();
            setItemList(result.items);
          }
        } catch(error) {
          console.error('Fetch Error: Failed to load items.');
        }
      } else {
        const itemsList = [];

        // Add each item to the list
        if (currentSlot.hat !== null) {
          itemsList.push(currentSlot.hat);
        }
        if (currentSlot.robe !== null) {
          itemsList.push(currentSlot.robe);
        }
        if (currentSlot.boots !== null) {
          itemsList.push(currentSlot.boots);
        }
        if (currentSlot.amulet !== null) {
          itemsList.push(currentSlot.amulet);
        }
        if (currentSlot.athame !== null) {
          itemsList.push(currentSlot.athame);
        }
        if (currentSlot.ring !== null) {
          itemsList.push(currentSlot.ring);
        }
        if (currentSlot.deck !== null) {
          itemsList.push(currentSlot.deck);
        }
        if (currentSlot.wand !== null) {
          itemsList.push(currentSlot.wand);
        }
        setEquipedItems(itemsList);
      }
    })();
  }, [currentGear, currentSlot])

  return(
    <div id="backpack-gear-search">
      <div id="backpack-gear-search-bar-container" >
        <input type="text" id="backpack-gear-search-input-bar" 
          className="custom-border-2" />
        <div id="backpack-gear-search-go-button" className="custom-border-2">
          <img src={GoArrow} alt="search-button" id="backpack-gear-search-go-arrow" />
        </div>

        {/* DROP DOWN OPTION */}
        <div id="backpack-gear-search-display" className={`active-gear-${currentGear}`} onClick={handleDropDown}/>
        <section id="backpack-gear-search-dropdown-section" className={"" + (dropDown ? "display-visible" : "")}>
          {gearList.map((item, index) => {
            if (item !== currentGear) {
              return(
                <div key={index} className={`backpack-gear-dropdown-icon active-gear-${item}`}
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

      {currentGear === 'all' ?
        <div id="backpack-gear-search-item-list">
          {[...Array(8)].map((item, index) => {
            const currentIndex = index*page;
            if (equipedItems.length > currentIndex) {
              return(
                <div key={index} className={"backpack-gear-search-item-equipped "} 
                  onDoubleClick={() => {handleDoubleClickItem(equipedItems[currentIndex])}}>
                  <ItemTooltip item={equipedItems[currentIndex]}/>
                  {/* <div className={`active-gear-${itemList[currentIndex].type} backpack-gear-search-display-icon`}></div> */}
                  <div className="backpack-gear-search-item-name">{equipedItems[currentIndex].name}</div>
                </div>
              );
            } else {
              return(
                <div key={index} className="backpack-gear-search-item-placeholder" id={`backpack-gear-search-item-${index}`}></div>
              );
            }
          })}
        </div>
        :
        <div id="backpack-gear-search-item-list">
          {[...Array(8)].map((item, index) => {
            const currentIndex = index*page;
            if (itemList.length > currentIndex) {
              return(
                <div key={index} className={"backpack-gear-search-item-valid " + (equipedItems.includes(itemList[currentIndex].name ? "backpack-gear-search-item-equipped" : ""))} 
                  onDoubleClick={() => {handleDoubleClickItem(itemList[currentIndex])}}>
                  {/* <div className={`active-gear-${itemList[currentIndex].type} backpack-gear-search-display-icon`}></div> */}
                  <div className="backpack-gear-search-item-name">{itemList[currentIndex].name}</div>
                </div>
              );
            } else {
              return(
                <div key={index} className="backpack-gear-search-item-placeholder" id={`backpack-gear-search-item-${index}`}></div>
              );
            }
          })}
        </div>
      }

      <div id="backpack-gear-search-move-container">
        <div id="backpack-gear-search-backwards" className="backpack-gear-search-move-button" />
        <div id="backpack-gear-search-forward" className="backpack-gear-search-move-button" />
      </div>
    </div>
  );
}
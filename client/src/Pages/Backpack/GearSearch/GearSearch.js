// Import CSS
import './GearSearch.css';

// Import Assets
import GoArrow from '../../../Assets/Buttons/arrow-icon.png';

// Import Dependencies
import { useEffect, useState } from 'react';
import ItemTooltip from './ItemTooltip/ItemTooltip';

export default function GearSearch({ wizard, currentGear, setCurrentGear }) {
  const [dropDown, setDropDown] = useState(false);
  // Define array of gear items
  const [gearList] = useState(['all', 'hat', 'robe', 'boots', 'wand', 'ring', 'deck', 'athame', 'amulet']);
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(true);
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
    const response = await fetch('/api/v1/auth/update-wizard-items', {
      method: 'PUT',
      body: JSON.stringify({
        wizard: wizard,
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
          setLoading(true);
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
        if (wizard.hat !== null) {
          itemsList.push(wizard.hat);
        }
        if (wizard.robe !== null) {
          itemsList.push(wizard.robe);
        }
        if (wizard.boots !== null) {
          itemsList.push(wizard.boots);
        }
        if (wizard.amulet !== null) {
          itemsList.push(wizard.amulet);
        }
        if (wizard.athame !== null) {
          itemsList.push(wizard.athame);
        }
        if (wizard.ring !== null) {
          itemsList.push(wizard.ring);
        }
        if (wizard.deck !== null) {
          itemsList.push(wizard.deck);
        }
        if (wizard.wand !== null) {
          itemsList.push(wizard.wand);
        }
        setEquipedItems(itemsList);
      }
    })();
  }, [currentGear, wizard])

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

      {currentGear === 'all' ?
        <div id="blacksmith-gear-search-item-list">
          {[...Array(8)].map((item, index) => {
            const currentIndex = index*page;
            if (equipedItems.length > currentIndex) {
              return(
                <div key={index} className={"blacksmith-gear-search-item-equipped "} 
                  onDoubleClick={() => {handleDoubleClickItem(equipedItems[currentIndex])}}>
                  <ItemTooltip item={equipedItems[currentIndex]}/>
                  {/* <div className={`active-gear-${itemList[currentIndex].type} blacksmith-gear-search-display-icon`}></div> */}
                  <div className="blacksmith-gear-search-item-name">{equipedItems[currentIndex].name}</div>
                </div>
              );
            } else {
              return(
                <div key={index} className="blacksmith-gear-search-item-placeholder" id={`blacksmith-gear-search-item-${index}`}></div>
              );
            }
          })}
        </div>
        :
        <div id="blacksmith-gear-search-item-list">
          {[...Array(8)].map((item, index) => {
            const currentIndex = index*page;
            if (itemList.length > currentIndex) {
              return(
                <div key={index} className={"blacksmith-gear-search-item-valid " + (equipedItems.includes(itemList[currentIndex].name ? "blacksmith-gear-search-item-equipped" : ""))} 
                  onDoubleClick={() => {handleDoubleClickItem(itemList[currentIndex])}}>
                  {/* <div className={`active-gear-${itemList[currentIndex].type} blacksmith-gear-search-display-icon`}></div> */}
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
      }

      <div id="blacksmith-gear-search-move-container">
        <div id="blacksmith-gear-search-backwards" className="blacksmith-gear-search-move-button" />
        <div id="blacksmith-gear-search-forward" className="blacksmith-gear-search-move-button" />
      </div>
    </div>
  );
}
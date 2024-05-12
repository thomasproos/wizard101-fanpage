// Import CSS
import './CharacterList.css';

export default function CharacterList({ profile, setCurrentSlot, currentSlot }) {
return(
    <div id="backpack-wizard-slot-list" className="custom-border-2">
      <div className="backpack-wizard-slot-shading">
        <div className="backpack-wizard-slot-header custom-border-2">Character Slots</div>
        {Object.keys(profile).length !== 0 ?
          <div id="backpack-wizard-slot-container">
            {[...Array(10)].map((item, index) => {
              if (profile.wizard_slots.length > index) {
                return(
                  <div key={index} className={"backpack-wizard-slot-character-valid " + (index === currentSlot.index ? "custom-border-3" : "custom-border-2")} 
                    onClick={() => {
                      setCurrentSlot({
                        index: index,
                        created: true,
                        name: profile.wizard_slots[index].name,
                        school: profile.wizard_slots[index].school,
                        level: profile.wizard_slots[index].level,
                        hat: profile.wizard_slots[index].hat,
                        robe: profile.wizard_slots[index].robe,
                        boots: profile.wizard_slots[index].boots,
                        deck: profile.wizard_slots[index].deck,
                        wand: profile.wizard_slots[index].wand,
                        athame: profile.wizard_slots[index].athame,
                        ring: profile.wizard_slots[index].ring,
                        amulet: profile.wizard_slots[index].amulet
                      });
                    }}>
                    <div className={`active-wizard-slot-${profile.wizard_slots[index].school} backpack-wizard-slot-school-icon`}></div>
                    <div className="backpack-wizard-slot-character-name">{profile.wizard_slots[index].name}</div>
                  </div>
                );
              } else {
                return(
                <div key={index} className={"backpack-wizard-slot-character-empty " + (index === currentSlot.index ? "custom-border-3" : "custom-border-4")}
                  onClick={() => {setCurrentSlot({
                    index: index,
                    created: false,
                    name: '',
                    school: 'spiral',
                    level: 0,
                  })}}>
                  <div className={`backpack-wizard-slot-school-icon ` + (index === currentSlot.index ? `active-wizard-slot-${currentSlot.school}` : `active-wizard-slot-spiral`)}></div>
                  <div className="backpack-wizard-slot-character-name-empty">{index === currentSlot.index ? currentSlot.name : ""}</div>
                </div>
                );
              }
            })}
          </div>
          :
          <></>
        }
      </div>
    </div>
  );
}
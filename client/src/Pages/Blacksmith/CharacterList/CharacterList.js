// Import CSS
import './CharacterList.css';

export default function CharacterList({ profile, setCurrentSlot, currentSlot }) {
  return(
    <div id="blacksmith-wizard-slot-list" className="custom-border-2">
      <div className="blacksmith-wizard-slot-shading">
        <div className="blacksmith-wizard-slot-header custom-border-2">Wizard Character Slots</div>
        {Object.keys(profile).length !== 0 ?
          <div id="blacksmith-wizard-slot-container">
            {[...Array(10)].map((item, index) => {
              if (profile.wizard_slots.length > index) {
                return(
                  <div key={index} className={"blacksmith-wizard-slot-character-valid " + (index === currentSlot.index ? "custom-border-3" : "custom-border-2")} 
                    onClick={() => {setCurrentSlot({
                      index: index, 
                      name: profile.wizard_slots[index].name,
                      school: profile.wizard_slots[index].school,
                      level: profile.wizard_slots[index].level
                    })}}>
                    <div className={`active-wizard-slot-${profile.wizard_slots[index].school} blacksmith-wizard-slot-school-icon`}></div>
                    <div className="blacksmith-wizard-slot-character-name">{profile.wizard_slots[index].name}</div>
                  </div>
                );
              } else {
                return(
                <div key={index} className={"blacksmith-wizard-slot-character-empty " + (index === currentSlot.index ? "custom-border-3" : "custom-border-4")}
                  onClick={() => {setCurrentSlot({
                    index: index, 
                    name: `Empty Slot ${index + 1}`,
                    school: 'spiral',
                    level: '0',
                  })}}>
                  <div className={`blacksmith-wizard-slot-school-icon ` + (index === currentSlot.index ? `active-wizard-slot-${currentSlot.school}` : `active-wizard-slot-spiral`)}></div>
                  <div className="blacksmith-wizard-slot-character-name-empty">{index === currentSlot.index ? currentSlot.name : `Empty Slot ${index + 1}`}</div>
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
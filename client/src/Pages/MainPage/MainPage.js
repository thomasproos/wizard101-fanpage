// Import CSS
import './MainPage.css';

// Import Assets
import GuideBook from '../../Assets/recipes-icon.png';
import Gardening from '../../Assets/gardening-icon.png';
import Blacksmith from '../../Assets/hat-icon.png';

export default function MainPage() {
  // Pink color style
  const spanPink = {
    color: '#F6F741'
  };

  return(
    <section id="main-page-component"  className="custom-border-1">
      <div className="main-title-background">
        <div className="main-title">About Us</div>
      </div>
      <div className="main-about-container custom-border-2">
        <div className="main-about-header-1">
          Welcome to Arcanum Archives!
        </div>
        <div className="main-about-paragraph-1">
          This is a <a className="main-about-link-external" target="_blank" rel="noreferrer" href="https://www.wizard101.com/">Wizard101</a> fanpage
          dedicated to the wiz community! <br/><br/>
          
          We aim to provide helpful guides and cool tools that let wizards customize their character and 
          figure out which gear sets suit them best.<br/><br/>

          The guides, gardening, and gear information were made using the extremely helpful 
          <a className="main-about-link-external" target="_blank" rel="noreferrer" href="https://wiki.wizard101central.com/wiki/"> Wizard101central</a> wiki!
          <br/><br/>

          Each page references or links the appropriate resources for credit, if the corresponding author wishes to have said information removed
          please contact us <a className="main-about-link-internal" target="_blank" rel="noreferrer" href="mailto:asdasd@gmail.com">here</a>.
        </div>
      </div>

      <div className="main-title-background" id="main-title-container-2">
        <div className="main-title">Features & Pages</div>
      </div>
      <div className="main-about-container custom-border-2">
        {/* Guides */}
        <div className="main-about-header-2 main-about-header-container">
          <img src={GuideBook} alt="GuideBook Icon" className="main-about-header-icon" />
          <div>Guides</div>
          <img src={GuideBook} alt="GuideBook Icon" className="main-about-header-icon" />
        </div>
        <div className="main-about-paragraph-1">
          We are working towards creating a wide variety of guides! We plan on setting up a gear 
          guide for every school at the usual intervals. 
          <br/><br/>
          
          This is a work in progress and won't feature every school and every level until a later date.
          <br/><br/>

          We also plan on setting up a jewel grinding/crafting guide page! This will not include gardening
          since we have a gardening page planned for the future.
        </div>

        {/* Gardening */}
        <div className="main-about-header-2 main-about-header-container">
          <img src={Gardening} alt="Gardening Icon" className="main-about-header-icon" />
          <div>Gardening</div>
          <img src={Gardening} alt="Gardening Icon" className="main-about-header-icon" />
        </div>
        <div className="main-about-paragraph-1">
          Gardening tips for beginners and pros! While it is still in the works, we're hoping
          to release it sometime in the near future.
        </div>

        {/* Blacksmith */}
        <div className="main-about-header-2 main-about-header-container" onClick={() => {window.location.href='/#/blacksmith'}}>
          <img src={Blacksmith} alt="Blacksmith Icon" className="main-about-header-icon" />
          <div>Blacksmith</div>
          <img src={Blacksmith} alt="Blacksmith Icon" className="main-about-header-icon" />
        </div>
        <div className="main-about-paragraph-1">
          The name is still being workshopped, but welcome to the blacksmith! This is the creative
          child of the website devs! The blacksmith lets wizards create and save wizard slots &#40;up to <span style={spanPink}>20</span>&#41;.
          <br/><br/>
          
          Wizards can set their slot's level, school, and gear! Building your ideal gear setup is no longer a challenge, simply follow along
          one of our gear guides that suits you.
          <br/><br/>

          The stat page allows wizards to select their gear sets based off of stats and grinding difficulty preferences.
          <br/><br/>

          <span style={spanPink}>Disclaimer:</span> You need to create an account in order to save your character slot.
        </div>
      </div>
    </section>
  );
}
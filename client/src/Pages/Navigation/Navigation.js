// Import dependencies

// Import CSS
import './Navigation.css';

// Import Assets
import WebsiteIcon from '../../Assets/arcanum-icon.png';
import WebsiteLogo from '../../Assets/ice-logo.png';

export default function Navigation() {
  return(
    <section id="navigation-component">
      {/* Navigation Logo */}
      <img src={WebsiteLogo} alt="Navigation Website Icon" id="navigation-component-website-icon" />

      {/* Navigation Headers */}
      <section id="navigation-component-header-container">
        <div id="navigation-component-blacksmith-icon" className="navigation-component-header">
          <div>Icon #2</div>
          <div>Blacksmith</div>
        </div>
      </section>
    </section>
  );
}
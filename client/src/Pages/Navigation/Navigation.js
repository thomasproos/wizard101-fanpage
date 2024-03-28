// Import dependencies
import { useNavigate, Outlet } from 'react-router-dom';

// Import CSS
import './Navigation.css';

export default function Navigation() {
  // Establish the navigation
  const navigate = useNavigate();

  // Handle Navigation
  const handleNavigate = (destination) => {
    // navigate(`/${destination}`);
  };

  return(
    <>
      <section id="navigation-component" className="custom-border-1">
        {/* Navigation Logo */}
        <div id="navigation-component-website-container">
          <div id="navigation-component-website-icon" />
          <div id="navigation-component-website-title">Arcanum Archives</div>
        </div>

        {/* Navigation Headers */}
        <section id="navigation-component-header-section">
          <div id="navigation-component-guides-container" className="navigation-component-header-container">
            <div id="navigation-component-guides-icon" className="navigation-component-icon" />
            <div id="navigation-component-guides-title" className="navigation-component-title">Guides</div>
          </div>
          <div id="navigation-component-gardening-container" className="navigation-component-header-container">
            <div id="navigation-component-gardening-icon" className="navigation-component-icon" />
            <div id="navigation-component-gardening-title" className="navigation-component-title">Gardening</div>
          </div>
          <div id="navigation-component-blacksmith-container" className="navigation-component-header-container"
            onClick={handleNavigate('blacksmith')}>
            <div id="navigation-component-blacksmith-icon" className="navigation-component-icon"/>
            <div id="navigation-component-blacksmith-title" className="navigation-component-title">Blacksmith</div>
          </div>
        </section>
      </section>
      <main>
        <Outlet />
      </main>
    </>
  );
}
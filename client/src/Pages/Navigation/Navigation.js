// Import dependencies
import { useNavigate, Outlet } from 'react-router-dom';
import { useState } from 'react';

// Import CSS
import './Navigation.css';

export default function Navigation() {
  const [page, setPage] = useState('');

  // Establish the navigation
  const navigate = useNavigate();

  // Handle Navigation
  const handleNavigate = (destination) => {
    setPage(destination);
    navigate(`/${destination}`);
  };

  return(
    <>
      <section id="navigation-component" className="custom-border-1">
        {/* Navigation Logo */}
        <div id="navigation-component-website-container" onClick={() => {handleNavigate('')}}>
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
          <div id="navigation-component-blacksmith-container" className={"navigation-component-header-container " + (page === 'blacksmith' ? 'active' : '')}
            onClick={() => {handleNavigate('blacksmith')}}>
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
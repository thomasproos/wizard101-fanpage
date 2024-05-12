// Import CSS
import './InformationPage.css';

// Import dependencies
import { useNavigate } from 'react-router-dom';

// Import Assets
import ShimmerStar from '../../../Assets/CustomAssets/star-shimmer.png';
import Storm from '../../../Assets/SchoolIcons/storm-icon.png';
import Fire from '../../../Assets/SchoolIcons/fire-icon.png';
import Ice from '../../../Assets/SchoolIcons/ice-icon.png';
import Life from '../../../Assets/SchoolIcons/life-icon.png';
import Death from '../../../Assets/SchoolIcons/death-icon.png';
import Myth from '../../../Assets/SchoolIcons/myth-icon.png';
import Balance from '../../../Assets/SchoolIcons/balance-icon.png';
import Flags from '../Flags/Flags';

export default function InformationPage({ loggedIn, setPage, page, pageNumber, setPageNumber }) {
  // Setup navigation
  const navigate = useNavigate();

  return(
    <section id="backpack" className="custom-border-2">
      <div id="backpack-content-container">
        <div id="backpack-title-background">
          <div id="backpack-title">Backpack</div>
        </div>
        
        <div id="backpack-empty-mirror-container" className="custom-border-2" >
          <div id="backpack-empty-mirror">
            <img src={ShimmerStar} alt="" id="shimmering-star-1" className="shimmering-star" />
            <img src={ShimmerStar} alt="" id="shimmering-star-2" className="shimmering-star" />
            <img src={ShimmerStar} alt="" id="shimmering-star-3" className="shimmering-star" />
            <img src={ShimmerStar} alt="" id="shimmering-star-4" className="shimmering-star" />
            <img src={ShimmerStar} alt="" id="shimmering-star-5" className="shimmering-star" />
            <img src={ShimmerStar} alt="" id="shimmering-star-6" className="shimmering-star" />
            <img src={ShimmerStar} alt="" id="shimmering-star-7" className="shimmering-star" />
            <img src={ShimmerStar} alt="" id="shimmering-star-8" className="shimmering-star" />
            <img src={ShimmerStar} alt="" id="shimmering-star-9" className="shimmering-star" />
            <img src={ShimmerStar} alt="" id="shimmering-star-10" className="shimmering-star" />
            <img src={ShimmerStar} alt="" id="shimmering-star-11" className="shimmering-star" />  
          </div>
        </div>
        <div id="backpack-unauthorized-display" className="custom-border-2">
          Welcome to the backpack!<br/><br/>

          <span className="white-text">
            Wizards can choose one of the 7 schools:<br/>
            <div id="backpack-mirror-school-container">
              <img src={Storm} alt="School Icon" className="backpack-mirror-school-icon" />
              <img src={Fire} alt="School Icon" className="backpack-mirror-school-icon" />
              <img src={Ice} alt="School Icon" className="backpack-mirror-school-icon" />
              <img src={Death} alt="School Icon" className="backpack-mirror-school-icon" />
              <img src={Myth} alt="School Icon" className="backpack-mirror-school-icon" />
              <img src={Life} alt="School Icon" className="backpack-mirror-school-icon" />
              <img src={Balance} alt="School Icon" className="backpack-mirror-school-icon" />
            </div>

            Allowed up to 10 slots, you can customize each character!<br/><br/>

            The goal of the Backpack is to allow you to browse gear and choose your ideal setup
            based on stats, level, school, and most importantly difficulty to obtain!<br/><br/>
          </span>

          You need to be logged-in in order to create wizard slots.
          
          {!loggedIn ?
            <div id="backpack-mirror-login" onClick={() => { navigate('/account/login'); }}>Login</div>
            :
            <></>
          }
        </div>

        <Flags star={loggedIn} stats={loggedIn} backpack={loggedIn} question={true} settings={true} setPage={setPage} page={page}/>

        {/* Page Buttons */}
        <div id="backpack-page-left-button" className={"" + (pageNumber === 2 ? "page-button-enabled" : "")} onClick={() => {
            if (pageNumber === 2) {
              setPageNumber(1);
            }
          }}/>
        <div id="backpack-page-number-display">{pageNumber}/2</div>
        <div id="backpack-page-right-button" className={"" + (pageNumber === 1 ? "page-button-enabled" : "")} onClick={() => {
            if (pageNumber === 1) {
              setPageNumber(2);
            }
          }}/>
      </div>
    </section>
  );
}
// Import CSS
import './OfflineDisplay.css';

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

export default function OfflineDisplay({ loggedIn, setPage }) {
  // Setup navigation
  const navigate = useNavigate();

  return(
    <>
      <div id="blacksmith-empty-mirror-container" className="custom-border-2" >
        <div id="blacksmith-empty-mirror">
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
      <div id="blacksmith-unauthorized-display" className="custom-border-2">
        Welcome to the blacksmith!<br/><br/>

        <span className="white-text">
          Wizards can choose one of the 7 schools:<br/>
          <div id="blacksmith-mirror-school-container">
            <img src={Storm} alt="School Icon" className="blacksmith-mirror-school-icon" />
            <img src={Fire} alt="School Icon" className="blacksmith-mirror-school-icon" />
            <img src={Ice} alt="School Icon" className="blacksmith-mirror-school-icon" />
            <img src={Death} alt="School Icon" className="blacksmith-mirror-school-icon" />
            <img src={Myth} alt="School Icon" className="blacksmith-mirror-school-icon" />
            <img src={Life} alt="School Icon" className="blacksmith-mirror-school-icon" />
            <img src={Balance} alt="School Icon" className="blacksmith-mirror-school-icon" />
          </div>

          Allowed up to 10 slots, you can customize each character!<br/><br/>

          The goal of the Backpack is to allow you to browse gear and choose your ideal setup
          based on stats, level, school, and most importantly difficulty to obtain!<br/><br/>
        </span>

        You need to be logged-in in order to create wizard slots.
        
        {loggedIn ?
          <div id="blacksmith-mirror-login" onClick={() => { setPage(2); }}>Begin</div>
          :
          <div id="blacksmith-mirror-login" onClick={() => { navigate('/account/login'); }}>Login</div>
        }
      </div>
    </>
  );
}
// Import CSS
import './Tooltip.css';

export default function Tooltip({ message, side }) {
  return(
    <div id="tooltip" className={"" +
      side === 'left' ? 
        "left-tooltip" 
      : side === 'bottom' ? 
        "bottom-tooltip" 
      : side === "right" ? 
        "right-tooltip" 
      : "top-tooltip"
    }>
      {message}
    </div>
  );
}
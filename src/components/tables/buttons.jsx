import React from "react";

const Buttons = ({
  className = "btn btn-sm btn-warning btn-addon",
  icon = "fa fa-pen-to-square",
  handleClick = () => alert("Button Pressed")
}) => {
  return (
   <div style={{marginLeft: "15px"}}>
     <button type="button" className={className} onClick={handleClick}>
      <i className={icon}></i>
    </button>
   </div>
  );
};

export default Buttons;

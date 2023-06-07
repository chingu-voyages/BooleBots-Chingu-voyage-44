import React, { useState } from 'react';



export default function IconPalette({iconPalette, setBotsData, iconSelected, setIconSelected }) {
    
    function handleClick(){
        console.log("Icon Clicked!")
    }

    function onChangeValue(event) {
        setIconSelected(event.target.value);

        setBotsData(prev => {
            return {...prev, botIcon: iconPalette[Number(event.target.value)].url}
        })
        console.log(event.target.value);
    }


 
    const iconEl = iconPalette.map((icon, i) => {
        return (
          <div onClick={(e)=> handleClick(e)} onChange={onChangeValue} key={i} className="iconContainer">
            <input type="radio" value={i} name={`bot${i}`} readOnly checked={iconSelected == i } disabled={icon.isSelected} />
            <img src={icon.url} alt={`bot icon ${i}`}/>
           
          </div>
        );
    })




  return <div style={{ display: "flex", gap: "10px", width: "400px"}}>{iconEl}</div>;
}
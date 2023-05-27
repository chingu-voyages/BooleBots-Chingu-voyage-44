import React, { useState } from 'react';
import singleBot from "../assets/bot.png";
import { Link } from 'react-router-dom';

export default function BotsInfo(props) {
  // const [botName, setBotName] = useState('');
  // const [booleanValue, setBooleanValue] = useState('1');
  // const [booleanOperator, setBooleanOperator] = useState('and');
  // const [botSpeed, setBotSpeed] = useState(0);
  // const [botDirection, setBotDirection] = useState('north');
  const addbot = props.addBotToArray;
  const createdBots = props.botsArray;
  // const [createdBots, setCreatedBots] = useState([]);
  
  //Refactoring Form state management
  const [formData, setFormData]= useState({
    position:1,
    direction:"",
    tile:"4",
    name:"",
    colorClass:"yellow",
    value: "",
    wins:0,
    loses: 0,
    isAlive:true,
  })

  // Generic change handler
  function handleChange(e){
    const changedField = e.target.name;
    const newValue = e.target.value;
    setFormData((currentData)=>{
      currentData[changedField] = newValue;
      return {...currentData};
    })
  }

  //form event- submit
  const handleSubmit = (event) => {
    event.preventDefault();

    if (createdBots.some((bot) => bot.name === formData.name)) {
    // Display an error message or perform necessary actions
    console.log("Bot with the same name already exists.");
    isValid = false;
  }


    // Create a new bot object

    // new BotClass(25, 4, numTilesPerSide, "bot4", "green", 1),
    // const newBot = {
    //   position: formData.position,
    //   name: formData.name,
    //   direction: formData.direction,
    //   tile: formData.tile,
    //   value: formData.value,
    //   colorClass: formData.colorClass,
    //   operator: formData.booleanOperator,
    //   speed: formData.botSpeed,
    //   wins:0,
    //   loses:0,
    //   isAlive: true
    // };

    addbot(formData);

    setFormData({
    position: 1,
    direction: "",
    tile: "4",
    name: "",
    colorClass: "yellow",
    value: "",
    wins: 0,
    loses: 0,
    isAlive: true,
  });
    // Add the new bot to the createdBots array
    // setCreatedBots((prevCreatedBots) => [...prevCreatedBots, newBot]);

    // Clear the form fields
    // setBotName('');
    // setBooleanValue('1');
    // setBooleanOperator('and');
    // setBotSpeed(0);
    // setBotDirection('north');
  };

  // const handleDelete = (index) => {
  //   setCreatedBots((prevCreatedBots) =>
  //     prevCreatedBots.filter((_, i) => i !== index)
  //   );
  // };

  const [expandedBots, setExpandedBots] = useState([]);

  const toggleBotExpansion = (index) => {
    setExpandedBots((prevExpandedBots) => {
      const newExpandedBots = [...prevExpandedBots];
      newExpandedBots[index] = !newExpandedBots[index];
      return newExpandedBots;
    });
  };


 

  return (
    <>
      <h2>Create Bot</h2>
      <div className="createdBots">
        {createdBots.map((bot, index) => (
          <div className="showBot" key={index}>
            <img src={singleBot} alt="photo of a robot head" />
            <div key={index}>
              <h3 className="title">{bot.name}</h3>
              {expandedBots[index] ? (
                <>
                  <p>Value: {bot.value}</p>
                  <p>Operator: {bot.operator}</p>
                  <p>Speed: {bot.speed}</p>
                  <p>Direction: {bot.direction}</p>
                </>
              ) : null}
            </div>
            <button
              className={`expandButton ${expandedBots[index] ? 'expanded' : ''}`}
              onClick={() => toggleBotExpansion(index)}
            >
              <span className="arrow"></span>
            </button>
            <button>Edit</button>
            <button className="delete" onClick={() => props.deleteBotFromArray(index)}>
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="test">
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label htmlFor="name">
              Name your bot:
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>
            <div></div>
            <label htmlFor="value">
              Choose a Boolean Value:
              <select
                id="value"
                name="value"
                value={formData.value}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select a Value</option>
                <option value="1">1</option>
                <option value="0">0</option>
              </select>
            </label>
            {/* <label htmlFor="boole_op">
              Choose Boolean Operator:
              <select
                id="boole_op"
                name="boole_op"
                value={booleanOperator}
                onChange={(event) => setBooleanOperator(event.target.value)}
              >
                <option value="and">AND</option>
                <option value="or">OR</option>
                <option value="not">NOT</option>
                <option value="nor">NOR</option>
              </select>
            </label> */}
            <label htmlFor="botSpeed">
              Choose Speed:
              <input
                id="botSpeed"
                type="range"
                min={1}
                max={100}
                name='botSpeed'
                value={formData.botSpeed}
                onChange={handleChange}
                required
              />
            </label>
            <label htmlFor="direction">
              Bot Direction:
              <select
                id="direction"
                name='direction'
                value={formData.direction}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select a Direction</option>
                <option value="1">NORTH</option>
                <option value="2">SOUTH</option>
                <option value="4">EAST</option>
                <option value="3">WEST</option>
              </select>
            </label>
            <button type="submit">Submit</button>
          </fieldset>
        </form>
       <Link to="/arena"><button >Battle Ground</button></Link> 
      </div>
      
    </>
  );
}
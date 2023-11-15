import dash_styles from './dashboard.module.css';
import { useState } from 'react'; 
import { Club } from './club.js'; 
import { AddClub } from './add_club.js'; 

function User_Dashboard() { 
  
  const [components, setComponents] = useState(["CLUB #1"]);
  const [componentNames, setComponentNames] = useState([ "CLUB #2", "CLUB #3", "CLUB #4", "CLUB #5", "CLUB #6" ]);  
  document.body.style.backgroundColor = "#FCF9F5";
  function addComponent() { 
    
    if (componentNames.length > 0) { 
      
      setComponents([...components, componentNames[0]]);
      componentNames.splice(0, 1);
      
    } else { 
      
      window.alert("REACHED MAX CLUBS AVAILABLE");
      
    } 
    
  } 
  
  return ( 
    
    <div className={dash_styles.buttonDisplay}> 
      <h1 className={dash_styles.title}>USER'S DASHBOARD</h1>
      <h1>
      <Club onClick={addComponent} text="ADD CLUB +"/> 
      {components.map((item, i) => ( <AddClub text={item} /> ))} 
      </h1>
      
    </div> 
    
  ) 
  
} 

export default User_Dashboard;
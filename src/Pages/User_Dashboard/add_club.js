import React from 'react'; 
import dash_styles from './dashboard.module.css';

const AddClub = (props) => { 
  
  return ( 
    
    <div className={dash_styles.Component}> 
    
      <h1>{props.text}</h1> 
      
    </div> 
    
  ); 
  
}; 

export {AddClub};
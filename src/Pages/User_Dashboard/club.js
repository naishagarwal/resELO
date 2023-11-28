import React from 'react'; 
import dash_styles from './dashboard.module.css';

const Club = (props) => { 
  
  return ( 
    
    <button className={dash_styles.AddButton} onClick={props.onClick}>{props.text}</button> 
    
  ); 
} 

export {Club};
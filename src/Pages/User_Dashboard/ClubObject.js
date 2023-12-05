import React from 'react'; 
import dash_styles from './dashboard.module.css';
import {Link, redirect} from 'react-router-dom'
import { useState, useEffect } from 'react';




function ClubObject(props) {
  const [isCopied, setIsCopied] = useState(false);

  function copyClubLink(club_name) {
    const link = window.location.href.split("/dashboard")[0]+'/upload/'+club_name;
    navigator.clipboard.writeText(link).then(() => {  
      setIsCopied(true);
    }).catch((error) => {
      console.log(error);
    });
  }

  console.log(props);
  return ( 
    <div className={dash_styles.Component} > 
      <div>
        <Link to={`/club/${props.club_name}`}>
          {props.club_name}
        </Link>
        <button onClick={() => copyClubLink(props.club_name)}>{isCopied ? 'Copied!' : 'Copy Club Link'}</button>
      </div>
    </div> 
  ); 
  
}; 

export {ClubObject};
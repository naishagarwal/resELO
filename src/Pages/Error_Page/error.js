import React from 'react';
import {useNavigate} from 'react-router-dom'
import error_styles from './error_style.module.css';


function Error () {
    const navigate = useNavigate();
    document.body.style.backgroundColor = "#FCF9F5"; /*sets background color to cream*/

    function goHome(){
        navigate('/')
    }
    
    return (
        <div className={error_styles.page_container}>
            <h1>Error</h1>
            <button className={error_styles.home_button} onClick={goHome}>Go To Home</button>
        </div>
    );

}

export default Error;
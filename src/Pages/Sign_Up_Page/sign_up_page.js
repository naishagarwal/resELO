import React from 'react';
import { useState } from 'react';
import sign_up_styles from './sign_up_style.module.css';


function sign_up () {
    document.body.style.backgroundColor = '#3f4f37cc'; /*sets background color to green*/

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit() {
        if (false){ /*TODO: Check if Username is already taken*/
            alert('Username is already taken! Please select a different username.');
            return;
        }
        if (username === "" || password === ""){
            alert('Username and Password cannot be empty!');
            return;
        }
        /*TODO: Add user to database, redirect them to the dashboard*/
        alert('New Account Created! with username: ' + username + ' and password: '+  password);
        setUsername("");
        setPassword("");
    }

    function handleExit(){
        /*TODO: Redirect to the home page*/
    }


    return (
        <div className={sign_up_styles.sign_up_container}>
            <button className={sign_up_styles.exit_button} onClick={handleExit}>X</button>
            <h1>Create An Account</h1>
            <form 
                className={sign_up_styles.form_container} 
                onSubmit={(e) => {e.preventDefault(); handleSubmit(); }}
            > 
                <label>
                    Username:
                    <input 
                        className={sign_up_styles.input_box} 
                        type="text" 
                        value = {username}
                        placeholder="Username" 
                        onChange={(e) => setUsername(e.target.value)}>
                    </input>
                </label>

                <label>
                    Password:
                    <input 
                        className={sign_up_styles.input_box} 
                        type="password" 
                        value = {password}
                        placeholder="Password" 
                        onChange={(e) => setPassword(e.target.value)}>
                    </input>
                </label>
                    
                <button className={sign_up_styles.submit_button} type="submit" >Submit</button>
            </form>

            <button className={sign_up_styles.sign_in_button} >Already have an account? Sign In</button>
        </div>
    );

}

export default sign_up;

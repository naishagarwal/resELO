import React from 'react';
import { useState } from 'react';
import sign_up_styles from './sign_up_style.module.css';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


function Log_In () {
    document.body.style.backgroundColor = '#3f4f37cc'; /*sets background color to green*/

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit() {
        if (email === "" || password === ""){
            alert('Email and Password cannot be empty!');
            return;
        }

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            alert('Logged in! ' + user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
        setEmail("");
        setPassword("");
    }

    function handleExit(){
        /*TODO: Redirect to the home page*/
    }


    return (
        <div className={sign_up_styles.sign_up_container}>
            <button className={sign_up_styles.exit_button} onClick={handleExit}>X</button>
            <h1>Log In</h1>
            <form 
                className={sign_up_styles.form_container} 
                onSubmit={(e) => {e.preventDefault(); handleSubmit(); }}
            > 
                <label>
                    Email:
                    <input 
                        className={sign_up_styles.input_box} 
                        type="text" 
                        value = {email}
                        placeholder="Email" 
                        onChange={(e) => setEmail(e.target.value)}>
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

            <button className={sign_up_styles.sign_in_button} >Don't have an account? Create An Account</button>
        </div>
    );

}

export default Log_In;

import React from 'react';
import { useState } from 'react';
import sign_up_styles from './sign_up_style.module.css';
import { getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {useNavigate} from 'react-router-dom'


function sign_up () {
    document.body.style.backgroundColor = '#3f4f37cc'; /*sets background color to green*/
    const navigate = useNavigate();
    const auth = getAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit() {
        if (email === "" || password === ""){
            alert('Email and Password cannot be empty!');
            return;
        }

        fetch('http://localhost:4000/signup', {
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'post',
        body: JSON.stringify({email, password}),
    })
        .then(response => {
            if(!response.ok) { //if failed to create account
                //alert("Failed to create account!");
                throw new Error('Failed to create account')
            }
            return response.json();
        })
        .then(data => {
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                navigate('/dashboard');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert("Account Created by log in unsuccessful. Please log in on log in page.");
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
            // ..
        });
        setEmail("");
        setPassword("");
    }

    function handleExit(){
        navigate("/");
    }

    function goToLogIn(){
        navigate("/login");
    }

    return (
        <div>
            <button className={sign_up_styles.exit_button} onClick={handleExit}>X</button>
            <div className={sign_up_styles.sign_up_container}>
                <h1>Create An Account</h1>
                <form 
                     
                    onSubmit={(e) => {e.preventDefault(); handleSubmit(); }}
                > 
                    <div className={sign_up_styles.input_container}>
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
                    </div>
                    <div className={sign_up_styles.input_container}>
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
                    </div>
                    <button className={sign_up_styles.submit_button} type="submit" >Submit</button>
                </form>

                <button className={sign_up_styles.sign_in_button} onClick={goToLogIn} >Already have an account? Sign In</button>
            </div>
        </div>
    );

}

export default sign_up;

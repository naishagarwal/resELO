import sign_up_styles from './sign_up_style.module.css';
import { useState, useEffect } from 'react'; 
import {useNavigate} from 'react-router-dom'
import { getAuth } from "firebase/auth";

const Log_Out = (props) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    setAuth(auth);
    if (user)
        setEmail(user.email);
    else
        navigate('/login');
  }, []);

  function logout() {
    auth.signOut()
      .then(() => {
        // Redirect to home page
        navigate("/");
      })
      .catch((error) => {
        alert('Error logging out:', error);
      });
    }
  
    if (props.style_sheet == 'sign_up_styles') //This one is tan color
    {
        return (
            <div className={sign_up_styles.log_out_buttons}>
                <text className={sign_up_styles.dash_email_display} style={{color: '#FCF9F5'}}>{email}</text> 
                <button className={sign_up_styles.LogOutButton} style={{color: '#FCF9F5'}}
                        onClick={logout}>Log Out</button>
            </div>
        );
    }
    else{
        return (
            <div className={sign_up_styles.log_out_buttons}>
                <text className={sign_up_styles.dash_email_display}>{email}</text>
                <button className={sign_up_styles.LogOutButton }
                        onClick={logout}>Log Out</button>
            </div>
        );
    }
}

export default Log_Out;
import dash_styles from '../User_Dashboard/dashboard.module.css';
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
  
    if (props.style_sheet === "dash_styles") //This one is tan color
    {
        return (
            <div>
                <text className={sign_up_styles.dash_email_display} > User: {email} </text>
                <button className={dash_styles.LogOutButton}
                        onClick={logout}>Log Out</button>
            </div>
        );
    }
    else{
        return (
            <div>
                <text className={sign_up_styles.emailDisplay} > User: {email} </text>
                <button className={sign_up_styles.LogOutButton}
                        onClick={logout}>Log Out</button>
            </div>
        );
    }
}

export default Log_Out;
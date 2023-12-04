import dash_styles from './dashboard.module.css';
import { useState } from 'react'; 
import { AddClub } from './add_club.js'; 
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import { getAuth } from "firebase/auth";

//TODO: One issue is the buttons disappear when I refresh the page
//this is because it is not being stored in databse rn; need to save clubs in database 

function User_Dashboard() { 
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  //TODO: Component (List of the user's clubs) needs to be pulled from database
  const [components, setComponents] = useState([]); 
  document.body.style.backgroundColor = "#FCF9F5";
  const auth = getAuth();
  const user = auth.currentUser;


  const addComponent = (e) => {
    setInputValue(e.target.value);
    
  };

  const addComponentChange = () => {
    if (inputValue == ""){
      return;
    }
    /* TODO: CHECK FOR DUPLICATE NAME*/

    if (user) { //if user is logged in
      user.getIdToken().then((idToken) => {
        // idToken is the user token (JWT), need to verify this token on the server side
        //idToken has all the user info you would need
        console.log('User Token:', idToken);
        /* TODO: ADD CLUB TO DATABASE*/
        setComponents([...components, { service: inputValue }]); //remove this once adding to database impemented
        setInputValue('');
      });
    }
    else {
      alert("Please Log In");
    }
  };

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

  return (
    <form>
      <div className={dash_styles.buttonDisplay}>
      <button className={dash_styles.LogOutButton}
                  onClick={logout}>Log Out</button>
      <h1 className={dash_styles.title}>USER'S DASHBOARD</h1>
          <div className={dash_styles.input}>
            <div>
              <input className={dash_styles.input_field}
                name="service"
                type="text"
                value={inputValue}
                onChange={addComponent}
                required
              />
                <button className={dash_styles.AddButton}
                  onClick={addComponentChange}>Add Club</button>
            </div>
          </div>
      </div>
      <div className="output">
         {components.map((club, i) => (
            <div key={i}>
              <Link to={`/club/${club.service}`}>
                <AddClub text={club.service}></AddClub>
              </Link>
            </div>
          ))}
      </div>
    </form>
  );
}


export default User_Dashboard;
import dash_styles from './dashboard.module.css';
import { useState } from 'react'; 
import { AddClub } from './add_club.js'; 
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import { getAuth, } from "firebase/auth";

//TODO: One issue is the buttons disappear when I refresh the page
//this is because it is not being stored in databse rn; need to save clubs in database 

function User_Dashboard() { 
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [components, setComponents] = useState([]);
  document.body.style.backgroundColor = "#FCF9F5";

  const addClub = () => {
    // setComponents([{club_name: "a"}, ...components]);
    fetch('http://localhost:4000/add_club', {
      mode : 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 123,
      },
      method: 'post',
      body: JSON.stringify({
        club_name: inputValue,
      })
    }).then((response) => {
      setInputValue('');
      setComponents([{club_name: inputValue}]);
    }).catch((error) => {
      console.log(error);
      console.log("HEHE")
      if(error.message == "Club already exists"){
        alert("Club already exists");
        setInputValue(['incorrect amc']);
      } else {
        alert(error.message);
      }
    });
  };

  function logout() { //untested
    const auth = getAuth();
    auth.signOut()
      .then(() => {
        // Redirect to home page
        navigate("/");
      })
      .catch((error) => {
        alert('Error signing out:', error);
      });
    }

  return (
    <span>
      <div className={dash_styles.buttonDisplay}>
      <button className={dash_styles.LogOutButton}
                  onClick={logout}>Log Out</button>
      <h1 className={dash_styles.title}>USER'S DASHBOARD</h1>
          <div className={dash_styles.input}>
            <div>
              <input className={dash_styles.input_field}
                type="text"
                value={inputValue}
                onChange={ (e) => {setInputValue(e.target.value)} }
                required
              />
                <button type="button" className={dash_styles.AddButton}
                  onClick={addClub}>Add Club</button>
            </div>
          </div>
      </div>
      <div className="output">
         {components.map((club, i) => (
            <div key={i}>
              <Link to={`/club/${club.club_name}`}>
                <AddClub text={club.club_name}></AddClub>
              </Link>
            </div>
          ))}
      </div>
    </span>
  );
}


export default User_Dashboard;
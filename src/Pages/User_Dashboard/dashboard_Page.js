import dash_styles from './dashboard.module.css';
import { useState, useEffect } from 'react'; 
import { ClubObject } from './ClubObject.js'; 
import { useNavigate } from 'react-router-dom';
import { getAuth } from "firebase/auth";
import Log_Out from '../Sign_Up_Page/log_out.js';


function User_Dashboard() { 
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  //TODO: Component (List of the user's clubs) needs to be pulled from database
  const [components, setComponents] = useState([]); 
  document.body.style.backgroundColor = "#FCF9F5";
  const [auth, setAuth] = useState("");

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) { 
      setAuth(auth);
      auth.currentUser.getIdToken().then((idToken) => {
        fetch('http://localhost:4000/get_clubs', {
          mode : 'cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': idToken,
          },
          method: 'get',
        }).then((response) => { return response.json(); })
        .then((response) => {
          console.log(response);
          setComponents(response.clubs);
        }).catch((error) => {
          console.log(error);
        });
      });
    } else {
      navigate('/login');
    }
  }, []);

  const notAlphaNum = (e) => {
    if(!/[0-9a-zA-Z]/.test(e.key)){
      alert("Club name must only consist of numbers and letters!");
      e.preventDefault();
    }
  }

  const addClub = () => {
    if (inputValue == ""){
      return;
    }

    if (inputValue.includes('.'))
    {
      alert("Club name must only consist of numbers and letters!");
      setInputValue('');
      return;
    }
    auth.currentUser.getIdToken().then((idToken) => {
      fetch('http://localhost:4000/add_club', {
        mode : 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': idToken,
        },
        method: 'post',
        body: JSON.stringify({
          club_name: inputValue.toUpperCase(),
        })
      }).then((response) => { return response.json(); })
      .then((response) => {
        console.log(response);
        if(response.message == 'Club ' + inputValue.toUpperCase() + ' already exists') {
          alert('Club already exists');
        } else {
          setInputValue('');
          setComponents(response.clubs);
        }
      }).catch((error) => {
        console.log(error);
      });
    });
  };

  return (
    <span>
      <div className={dash_styles.buttonDisplay}>
      <Log_Out style_sheet='dash_styles' ></Log_Out>
      <h1 className={dash_styles.title}>CLUB DASHBOARD</h1>
          <div className={dash_styles.input}>
            <div>
              <input className={dash_styles.input_field}
                type="text"
                minLength={1}
                value={inputValue}
                onKeyDown={(e)=>{notAlphaNum(e)}}
                onChange={ (e) => {setInputValue(e.target.value)} }
                required
              />
                <button type="button" className={dash_styles.AddButton}
                  onClick={addClub}>Add Club</button>
            </div>
          </div>
      </div>
      <div className="output">
         {components.map((club_name, i) => (
            <div key={i}>
              <ClubObject club_name={club_name}></ClubObject>
            </div>
          ))}
      </div>
    </span>
  );
}


export default User_Dashboard;
import dash_styles from './dashboard.module.css';
import { useState } from 'react'; 
import { AddClub } from './add_club.js'; 
import {Link} from 'react-router-dom'

//TODO: One issue is the buttons disappear when I refresh the page
//this is because it is not being stored in databse rn; need to save clubs in database 

function User_Dashboard() { 
  const [inputValue, setInputValue] = useState('');
  const [components, setComponents] = useState([]);
  document.body.style.backgroundColor = "#FCF9F5";

  const addComponent = (e) => {
    setInputValue(e.target.value);
  };

  const addComponentChange = () => {
    setComponents([...components, { service: inputValue }]);
    setInputValue('');
  };

  return (
    <form>
      <div className={dash_styles.buttonDisplay}>
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
          //TODO: Make the button each have its own Club Page
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

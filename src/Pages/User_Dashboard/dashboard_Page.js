import dash_styles from './dashboard.module.css';
import { useState } from 'react'; 
import { AddClub } from './add_club.js'; 

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
            <div key={i}>
              <AddClub text={club.service}></AddClub>
            </div>
          ))}
      </div>
    </form>
  );
}


export default User_Dashboard;

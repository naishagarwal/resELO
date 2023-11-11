import logo from './logo.svg';
import './App.css';
import PostRequestButton from './button.js';
import FileUpload from './form.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <PostRequestButton />
        <FileUpload />
      </header>
    </div>
  );
}

export default App;

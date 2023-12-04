import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Compare from './Pages/Compare/compare_page';
import Upload from './Pages/Upload/upload_page';
import Club_Page from './Pages/Club_Page/club_page';
import User_Dashboard from './Pages/User_Dashboard/dashboard_Page';
import SignUp from './Pages/SignUp/signup_page';
import Home from './Pages/Home_Page/home';


//<Route path="/club/:clubName" component={Club_Page} /> 

const App = () => {
 return (
   <BrowserRouter>
      <Routes>
         {/* <Route path="/" element={<Home />} /> */}
         <Route path="/compare"  element={<Compare club_name="test" />} />
         <Route path="/Upload/*" element={<Upload />} />
         <Route path="/signup" element={<SignUp />} />
         <Route path = "/club/:clubName" element = {<Club_Page />} />
         <Route path="/dashboard" element={<User_Dashboard />} />
         <Route path="/home" element={<Home />}/>
      </Routes>
      </BrowserRouter>
 );
};

export default App;

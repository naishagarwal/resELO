import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Compare from './Pages/Compare/compare_page';
import Upload from './Pages/Upload/upload_page';
import Club_Page from './Pages/Club_Page/club_page';
import User_Dashboard from './Pages/User_Dashboard/dashboard_Page';
import SignUp from './Pages/SignUp/signup_page';


//<Route path="/club/:clubName" component={Club_Page} /> 

const App = () => {
 return (
   <BrowserRouter>
      <Routes>
         {/* <Route path="/" element={<Home />} /> */}
         <Route path="/compare" element={<Compare />} />
         <Route path="/signup" element={<SignUp />} />
         <Route path="/upload" element={<Upload />} />
         <Route path = "/club/:clubName" element = {<Club_Page />} />
         <Route path="/dashboard" element={<User_Dashboard />} />
      </Routes>
      </BrowserRouter>
 );
};

export default App;

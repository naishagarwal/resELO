import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Compare from './Pages/Compare/compare_page';
import Upload from './Pages/Upload/upload_page';
import Club_Page from './Pages/Club_Page/club_page';
import User_Dashboard from './Pages/User_Dashboard/dashboard_Page'
import Sign_Up from './Pages/Sign_Up_Page/sign_up_page';


const App = () => {
 return (
   <BrowserRouter>
      <Routes>
         {/* <Route path="/" element={<Home />} /> */}
         <Route path="/compare" element={<Compare />} />
         <Route path="/" element={<Upload />} />
         <Route path="/club-page" element={<Club_Page />} />
         <Route path="/dashboard" element={<User_Dashboard />} />
         <Route path="/sign-up" element={<Sign_Up />} />
      </Routes>
      </BrowserRouter>
 );
};

export default App;

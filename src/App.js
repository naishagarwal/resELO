import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Compare from './Pages/Compare/compare_page';
import Upload from './Pages/Upload/upload_page';
import Club_Page from './Pages/Club_Page/club_page';
import User_Dashboard from './Pages/User_Dashboard/dashboard_Page'
import Sign_Up from './Pages/Sign_Up_Page/sign_up_page';
import Log_In from './Pages/Sign_Up_Page/log_in_page';

/* Firebase Config*/

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcETIzadQCkbSPt03nxn6kktFSUqfTAiY",
  authDomain: "reselo.firebaseapp.com",
  projectId: "reselo",
  storageBucket: "reselo.appspot.com",
  messagingSenderId: "488113282061",
  appId: "1:488113282061:web:2d7f81c6f11db926b74944",
  measurementId: "G-LRVXF61D22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);



//<Route path="/club/:clubName" component={Club_Page} /> 

const App = () => {
 return (
   <BrowserRouter>
      <Routes>
         {/* <Route path="/" element={<Home />} /> */}
         <Route path="/compare"  element={<Compare club_name="test" />} />
         <Route path="/Upload/*" element={<Upload />} />
         <Route path = "/club/:clubName" element = {<Club_Page />} />
         <Route path="/dashboard" element={<User_Dashboard />} />
         <Route path="/sign-up" element={<Sign_Up />} />
         <Route path="/log-in" element={<Log_In />} />
      </Routes>
      </BrowserRouter>
 );
};

export default App;

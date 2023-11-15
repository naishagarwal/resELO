import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Compare from './Pages/Compare/compare_page';
import Upload from './Pages/Upload/upload_page';


const App = () => {
 return (
   <BrowserRouter>
      <Routes>
         {/* <Route path="/" element={<Home />} /> */}
         <Route path="/compare" element={<Compare />} />
         <Route path="/" element={<Upload />} />
      </Routes>
      </BrowserRouter>
 );
};

export default App;

import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import './styles.css';
import Upload from './pages/upload';
import Visualise from './pages/visualise';
import ViewData from './pages/viewData';
import ErrorPage from './pages/errorPage';
import HomeImg from './icons/home.png';
import UploadImg from './icons/upload.png';
import ViewImg from './icons/view.png';
import TeamLogo from './icons/teamLogo.png';

function App() {
  
  return (
    <Router>
      <nav className='sideBar'>
        <div className='sideImgContainer'><img className='teamLogo' src={TeamLogo} alt="Teamlogo" /></div>
        <Link to='/' className='sideImgContainer'><img className='sideImg' src={HomeImg} alt="visualise" /></Link>
        <Link to='/Upload' className='sideImgContainer'><img className='sideImg' src={UploadImg} alt="upload" /></Link>
        <Link to='/ViewData' className='sideImgContainer'><img className='sideImg' src={ViewImg} alt="view data" /></Link>
      </nav>
      <Routes>
        <Route path='/' element={<Visualise />}/>
        <Route path='/Upload' element={<Upload />}/>
        <Route path='/ViewData' element={<ViewData />}/>
        <Route path='*' element={<ErrorPage />}/>
      </Routes>
    </Router>
  );
}

export default App;
import React from 'react'
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import HomePage from './HomePage';
import ImgToPdf from './ImgToPdf';
import ImgResize from './ImgResize';
const FrontPage = () => {
  return (
    <div>
        <Router>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/img-to-pdf' element={<ImgToPdf />} />
                <Route path='/img-resize' element={<ImgResize/>} />
            </Routes>
        </Router>
    </div>
  )
}

export default FrontPage
import React from 'react'
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import HomePage from './HomePage';
import ImgToPdf from './ImgToPdf';
const FrontPage = () => {
  return (
    <div>
        <Router>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/img-to-pdf' element={<ImgToPdf />} />
            </Routes>
        </Router>
    </div>
  )
}

export default FrontPage
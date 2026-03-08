import React from 'react'
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import HomePage from './HomePage';
import ImgToPdf from './ImgToPdf';
import ImgResize from './ImgResize';
import RemoveBg from './RemoveBg';
import CombineImg from './CombineImg';
import MergePdf from './MergePdf';
import CompressPdf from './CompressPdf';
import SplitPdf from './SplitPdf';
import RemovePasswordPdf from './RemovePasswordPdf';
const FrontPage = () => {
  return (
    <div>
        <Router basename='Docs-management-frontend'>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/img-to-pdf' element={<ImgToPdf />} />
                <Route path='/img-resize' element={<ImgResize/>} />
                <Route path='/remove-bg' element={<RemoveBg/>} />
                <Route path='/combine-img' element={<CombineImg/>} />
                <Route path='/merge-pdf' element={<MergePdf/>} />
                <Route path='/compress-pdf' element={<CompressPdf/>} />
                <Route path='/split-pdf' element={<SplitPdf/>} />
                <Route path='/remove-password-pdf' element={<RemovePasswordPdf/>} />
            </Routes>
        </Router>
    </div>
  )
}

export default FrontPage
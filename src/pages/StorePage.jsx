import React from 'react';
import Header from "../components/layout/Header.jsx";
import Footer from '../components/layout/Footer.jsx';
import StorePage1 from '../pages/StorePage/StorePage1.jsx';
import StorePage3 from '../pages/StorePage/StorePage3.jsx';
import StorePage4 from '../pages/StorePage/StorePage4.jsx';
import StoreNamePicture from '../pages/StorePage/StoreNamePicture.jsx';
import FloatingButtons from '../components/common/FloatingButtons.jsx';
import MapComponent from '../components/common/MapComponent.jsx';


function StorePage() {
  return (
    
    <>
    <Header />
    <StorePage1 />
    <StorePage3 />
    <MapComponent/>
    <StorePage4 />
    <StoreNamePicture />
    <FloatingButtons/>
    <Footer />
    
    
  </>
  )
}

export default StorePage;

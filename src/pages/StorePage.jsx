import React from 'react';
import Header from "../components/layout/Header.jsx";
import Footer from '../components/layout/Footer.jsx';
import StorePage1 from '../pages/StorePage/StorePage1.jsx';
import StorePage3 from '../pages/StorePage/StorePage3.jsx';


function StorePage() {
  return (
    
    <>
    <Header />
    <StorePage1 />
    <StorePage3 />
    <Footer />
    </>
    
  );
}

export default StorePage;

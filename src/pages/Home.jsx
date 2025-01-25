import React from 'react';
import Header from "../components/layout/Header.jsx";
import HomePicture1 from './HomeAll/HomePicture1.jsx';
import HomePicture2 from './HomeAll/HomePicture2.jsx';
import HomePicture3 from './HomeAll/HomePicture3.jsx';
import Footer from '../components/layout/Footer.jsx';
import HomeHeroImage from './HomeAll/HomeHeroImage.jsx';
import HomeComment from './HomeAll/HomeComment.jsx';
import FloatingButtons from '../components/common/FloatingButtons.jsx';

function Home() {
  return (
    
    <>
    <Header />
    
    <HomeHeroImage/>
    <HomePicture1 />
    <HomePicture2 />
    <HomePicture3 />
    <HomeComment />
    <FloatingButtons/>
    <Footer />
    </>
    
  );
}

export default Home;

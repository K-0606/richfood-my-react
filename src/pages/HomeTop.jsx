import React from 'react';
import Header from "../components/layout/Header.jsx";
import HomeName1 from '../pages/HomeAll/HomeName1';
import HomeName2 from '../pages/HomeAll/HomeName2';
import HomeName3 from './HomeAll/HomeName3.jsx';
import HomePicture1 from '../pages/HomeAll/HomePicture1';
import HomePicture2 from '../pages/HomeAll/HomePicture2';
import HomePicture3 from '../pages/HomeAll/HomePicture3';
import Footer from '../components/layout/Footer';
import HomeHeroImage from '../pages/HomeAll/HomeHeroImage';
import HomeComment from '../pages/HomeAll/HomeComment.jsx';

function HomeTop() {
  return (
    
    <>
    <Header />
    <HomeHeroImage/>
    <HomeName1 />
    <HomePicture1 />
    <HomeName2 />
    <HomePicture2 />
    <HomeName3 />
    <HomePicture3 />
    <HomeComment />
    <Footer />
    </>
    
  );
}

export default HomeTop;

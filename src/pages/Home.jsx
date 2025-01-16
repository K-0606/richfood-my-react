import React from 'react';
import Header from "../components/layout/Header.jsx";
import HomeName1 from './HomeAll/HomeName1.jsx';
import HomeName2 from './HomeAll/HomeName2.jsx';
import HomeName3 from './HomeAll/HomeName3.jsx';
import HomePicture1 from './HomeAll/HomePicture1.jsx';
import HomePicture2 from './HomeAll/HomePicture2.jsx';
import HomePicture3 from './HomeAll/HomePicture3.jsx';
import Footer from '../components/layout/Footer.jsx';
import HomeHeroImage from './HomeAll/HomeHeroImage.jsx';
import HomeComment from './HomeAll/HomeComment.jsx';

function Home() {
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

export default Home;

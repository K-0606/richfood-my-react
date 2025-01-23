import React from 'react';
import HeaderEnglish from "../components/layout/HeaderEnglish.jsx";
import HomeName1E from './HomeAllEnglish/HomeName1E.jsx';
import HomeName2E from './HomeAllEnglish/HomeName2E.jsx';
import HomeName3E from './HomeAllEnglish/HomeName3E.jsx';
import HomePicture1E from './HomeAllEnglish/HomePicture1E.jsx';
import HomePicture2E from './HomeAllEnglish/HomePicture2E.jsx';
import HomePicture3E from './HomeAllEnglish/HomePicture3E.jsx';
import Footer from '../components/layout/Footer.jsx';
import HomeHeroImageE from './HomeAllEnglish/HomeHeroImageE.jsx';
import HomeCommentE from './HomeAllEnglish/HomeCommentE.jsx';

function Home() {
  return (
    
    <>
    <HeaderEnglish />
    <HomeHeroImageE/>
    <HomeName1E />
    <HomePicture1E />
    <HomeName2E />
    <HomePicture2E />
    <HomeName3E />
    <HomePicture3E />
    <HomeCommentE />
    <Footer />
    </>
    
  );
}

export default Home;

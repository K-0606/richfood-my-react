import React from 'react';
import Header from "../components/layout/Header.jsx";
import Footer from '../components/layout/Footer';
import SearchPicture from'../pages/SearchStoreAll/SearchPicture';
// import SearchCheakBox from'../pages/SearchStoreAll/SearchCheakBox.jsx';


function SearchStore() {
  return (
    
    <>
    <Header />
    <SearchPicture />
    <Footer />
    </>
    
  );
}

export default SearchStore;

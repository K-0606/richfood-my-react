import React from 'react';
import Header from "../components/layout/Header.jsx";
import Footer from '../components/layout/Footer';
import SearchPicture2 from'../pages/SearchStoreAll/SearchPicture2';
import SearchPicture3 from'../pages/SearchStoreAll/SearchPicture3';
import SearchPagination from'../pages/SearchStoreAll/SearchPagination.jsx';


function SearchStore() {
  return (
    
    <>
    <Header />
    <SearchPicture2 />
    <SearchPicture3 />
    <SearchPagination />
    <Footer />
    </>
    
  );
}

export default SearchStore;

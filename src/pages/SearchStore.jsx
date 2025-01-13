import React from 'react';
import Header from "../components/layout/Header.jsx";
import Footer from '../components/layout/Footer';
import SearchPicture from'../pages/SearchStoreAll/SearchPicture';
import SearchSh from'../pages/SearchStoreAll/SearchSh.jsx';
import SearchPagination from'../pages/SearchStoreAll/SearchPagination.jsx';


function SearchStore() {
  return (
    
    <>
    <Header />
    <SearchSh />
    <SearchPicture />
    <SearchPagination />
    <Footer />
    </>
    
  );
}

export default SearchStore;

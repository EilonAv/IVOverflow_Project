import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FormControl } from 'react-bootstrap';
import { Route, useNavigate } from 'react-router-dom';
import SearchResults from './searchResults';

function Search() {
  const navigate = useNavigate();
  
  useEffect(() => {
}, []);

  const handleChange = async e => {
    navigate('/searchResults/'+ e.target.value);
    console.log(e.target.value);
  };

  return (
      <FormControl
                    type="search"
                    placeholder="Search"
                    className="d-block"
                    aria-label="Search"
                    onChange = {handleChange}
                />
  );
}

export default Search;
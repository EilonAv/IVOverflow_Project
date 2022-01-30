
import React, { useEffect, useState } from 'react';
import { FormControl } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function Search() {
  const navigate = useNavigate();
  
  useEffect(() => {
}, []);

  const handleChange = async e => {
    if(e.target.value.length > 0)
        navigate('/searchResults/'+ e.target.value);
    else
        navigate('/');
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
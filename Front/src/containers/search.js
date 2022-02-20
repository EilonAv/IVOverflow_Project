import React, { useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { SearchContainer } from "./styles/SearchContainer.style";

function Search() {
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const handleChange = async (e) => {
    if (e.target.value.length > 0) navigate("/searchResults/" + e.target.value);
    else navigate("/");
    console.log(e.target.value);
  };

  return (
    <SearchContainer>
      <FormControl
        type="search"
        placeholder="Search"
        className="d-block"
        aria-label="Search"
        onChange={handleChange}
      />
    </SearchContainer>
  );
}

export default Search;

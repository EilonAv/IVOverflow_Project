import React, { useEffect } from "react";
import QuestionAnswer from "./questionAnswer";
import AllQuestions from "./allQuestions";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import NewQuestion from "./newQuestion";
import Search from "./search";
import SearchResults from "./searchResults";

function deleteAuths() {
  localStorage.removeItem("email");
  localStorage.removeItem("jwt");
}
const Layout = function () {

  return (
    <div>
      <div className="navbar_container">
        <div className="navbar_sides left">
          <Link to="/" className="navLogo">
            <img
              src={
                "https://ianvanheusen.com/wp-content/uploads/2015/09/flow.jpg"
              }
              alt="Logo"
            />
          </Link>
        </div>
        <div className="search_container">
          <Search />
        </div>
        <div className="navbar_sides side_right">
          <NewQuestion />
          <Link to="/login" onClick={deleteAuths}>
            Logout
          </Link>
        </div>
      </div>

      <div className="page">
        <Routes>
          <Route path="/" element={<AllQuestions />} />
          <Route path="/searchResults/:id" element={<SearchResults />} />
          <Route path="/questionAnswer/:id" element={<QuestionAnswer />} />
          
        </Routes>
      </div>
    </div>
  );
};

export default Layout;

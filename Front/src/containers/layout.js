import React from "react";
import QuestionAnswer from "./questionAnswer";
import AllQuestions from "./allQuestions";
import { Routes, Route, Link } from "react-router-dom";
import NewQuestion from "./newQuestion";
import Search from "./search";
import SearchResults from "./searchResults";
import { NavBarContainer } from "./styles/NavBarContainer.style";
import { NavBarLogo } from "./styles/NavBarLogo.style";
import { LayoutContent } from "./styles/LayoutContent.style";

function deleteAuths() {
  localStorage.removeItem("email");
  localStorage.removeItem("jwt");
}
const Layout = function () {
  return (
    <div>
      <NavBarContainer>
        <Link to="/">
          <NavBarLogo
            src={"https://ianvanheusen.com/wp-content/uploads/2015/09/flow.jpg"}
            alt="Logo"
          />
        </Link>
        <Search />
        <NewQuestion />
        <Link to="/login" onClick={deleteAuths}>
          Logout
        </Link>
      </NavBarContainer>
      <LayoutContent>
        <div className="page">
          <Routes>
            <Route path="/" element={<AllQuestions />} />
            <Route path="/searchResults/:id" element={<SearchResults />} />
            <Route path="/questionAnswer/:id" element={<QuestionAnswer />} />
          </Routes>
        </div>
      </LayoutContent>
    </div>
  );
};

export default Layout;

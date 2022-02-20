import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Col, Badge } from "react-bootstrap";
import moment from "moment";
import { QuestionList } from "./styles/QuestionList.style";
import { QuestionContainer } from "./styles/QuestionContainer.style";
import { FlexRow } from "./styles/FlexRow.style";
import { QuestionTag } from "./styles/QuestionTag.style";
import { QuestionTags } from "./styles/QuestionTags.style";
import { QuestionTitle } from "./styles/QuestionTitle.style";
import { QuestionContent } from "./styles/QuestionContent.style";
import { QuestionFooter } from "./styles/QuestionFooter.style";
import { QuestionCounters } from "./styles/QuestionCounters.style";

const SearchResults = function () {
  const navigate = useNavigate();
  const searchUrl = useParams();
  const searchField = searchUrl.id;
  const [questionList, setQuestionList] = useState([]);

  function filterResults(results) {
    return results.filter((question) => {
      return (
        question.content.toLowerCase().includes(searchField.toLowerCase()) ||
        question.title.toLowerCase().includes(searchField.toLowerCase()) ||
        question.tags.includes(searchField.toLowerCase())
      );
    });
  }
  useEffect(() => {
    axios
      .post("http://localhost:80/getQuestions", {
        jwt: localStorage.jwt,
        email: localStorage.email,
      })
      .then((res) => {
        setQuestionList(filterResults(res.data));
      });
  }, [searchField]);

  function navigateQuestion(question_id) {
    navigate("/questionAnswer/" + question_id);
  }
  return (
    <div className="Home">
      <QuestionList>
        {questionList.map((question, i) => {
          return (
            <QuestionContainer
              onClick={() => {
                return navigateQuestion(question._id);
              }}
              key={i}
            >
              <FlexRow>
                <Col md={2}>
                <QuestionCounters>
                  <div>
                    {question.votes}
                    <br></br>
                    votes
                  </div>
                  <div>
                    {question.answers.length}
                    <br></br>
                    answers
                  </div>
                  </QuestionCounters>
                </Col>
                
                <Col md={10}>
                  <QuestionTitle>
                    <FlexRow>{question.title}</FlexRow>
                  </QuestionTitle>
                  <QuestionContent>
                    <FlexRow>{question.content}</FlexRow>
                  </QuestionContent>
                  <QuestionFooter>
                  <FlexRow>
                    <Col md={9}>
                      <QuestionTags>
                        {question.tags.map((tag, j) => {
                          return <QuestionTag key={j}>{tag}</QuestionTag>;
                        })}
                      </QuestionTags>
                    </Col>

                    <Col md={3}>
                      <b>Asked: </b>
                      {moment(question.createdAt).format("DD/MM/YY")}
                      <br />
                      <b>By: </b>
                      {question.user_ref.nickname}
                    </Col>
                  </FlexRow>
                  </QuestionFooter>
                </Col>
              </FlexRow>
            </QuestionContainer>
          );
        })}
      </QuestionList>
    </div>
  );
};

export default SearchResults;

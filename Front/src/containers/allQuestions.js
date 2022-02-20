import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import { Container, Col, Row, Badge } from "react-bootstrap";
import moment from "moment";
import {
  selectQuestions,
  allQuestionsReducer,
} from "../store/allQuestionsSlice";
import { selectUser } from "store/userInfoSlice";
import { QuestionList } from "./styles/QuestionList.style";
import { QuestionContainer } from "./styles/QuestionContainer.style";
import { FlexRow } from "./styles/FlexRow.style";
import { FlexColumn} from "./styles/FlexColumn.style";

const AllQuestions = function () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUser);
  const questionList = useSelector(selectQuestions);

  useEffect(() => {
    axios
      .post("http://localhost:80/getQuestions", {
        jwt: localStorage.jwt,
        email: localStorage.email,
      })
      .then((res) => {
        dispatch(allQuestionsReducer(res.data));
      });
  }, []);

  function navigateQuestion(question_id) {
    navigate("/questionAnswer/" + question_id);
  }

  return (
    <div>
      <QuestionList>
          {questionList.map((question, i) => {
            return (
              <QuestionContainer
                onClick={() => {
                  return navigateQuestion(question._id);
                }}
                key={i}
              >
                <Container fluid>
                  <FlexRow>
                    <Col className="counters" md={2}>
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
                    </Col>
                    <Col md={10}>
                      <FlexRow className="questionTitle">{question.title}</FlexRow>
                      <FlexRow className="questionContent">{question.content}</FlexRow>
                      <FlexRow className="questionBottom">
                        <Col className="questionTags" md={9}>
                          {question.tags.map((tag, j) => {
                            return (
                              <Badge
                                className="singleTag"
                                key={j}
                                pill
                                bg="info"
                              >
                                {tag}
                              </Badge>
                            );
                          })}
                        </Col>
                        <Col md={3}>
                          <b>Asked: </b>
                          {moment(question.createdAt).format("DD/MM/YY")}
                          <br />
                          <b>By: </b>
                          {question.user_ref.nickname}
                        </Col>
                      </FlexRow>
                    </Col>
                  </FlexRow>
                </Container>
              </QuestionContainer>
            );
          })}
      </QuestionList>
    </div>
  );
};

export default AllQuestions;

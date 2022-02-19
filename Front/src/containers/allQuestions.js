import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import { Container, Col, Row, Badge } from "react-bootstrap";
import moment from "moment";
import { selectQuestions, allQuestionsReducer } from "../allQuestionsSlice";

const AllQuestions = function () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const questionList = useSelector(selectQuestions);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:80/getQuestions", {
        jwt: localStorage.jwt,
        email: localStorage.email,
      })
      .then((res) => {
        setQuestions(res.data);
        dispatch(allQuestionsReducer(res.data));
      });
  }, []);

  function navigateQuestion(question_id) {
    navigate("/questionAnswer/" + question_id);
  }

  return (
    <div className="Home">
      <ListGroup className="questionList">
        {questionList.map((question, i) => {
          return (
            <ListGroup.Item
              className="questionContainer"
              onClick={() => {
                return navigateQuestion(question._id);
              }}
              key={i}
            >
              <Container fluid>
                <Row>
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
                    <Row className="questionTitle">{question.title}</Row>
                    <Row className="questionContent">{question.content}</Row>
                    <Row className="questionBottom">
                      <Col className="questionTags" md={9}>
                        {question.tags.map((tag, j) => {
                          return (
                            <Badge className="singleTag" key={j} pill bg="info">
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
                    </Row>
                  </Col>
                </Row>
              </Container>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
};

export default AllQuestions;

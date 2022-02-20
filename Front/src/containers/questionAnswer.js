import React, { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Container, Col, Row, Badge, Button, Form } from "react-bootstrap";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import moment from "moment";
import { useParams } from "react-router-dom";
import {
  allAnswersReducer,
  newAnswerReducer,
  selectQuestion,
  questionReducer,
  selectAnswers,
} from "../store/questionAnswerSlice";
import { selectUser } from "store/userInfoSlice";

const QuestionAnswer = function () {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUser)
  const question = useSelector(selectQuestion);
  const [questionDB, setQuestionDB] = useState({});
  const answerList = useSelector(selectAnswers);
  const [answerListDB, setAnswerListDB] = useState([]);
  const [voteChange, setVoteChange] = useState(0);
  const [newAnswerContent, setNewAnswerContent] = useState("");
  const q_id = useParams();
  const validateForm = () => {
    return newAnswerContent.length > 0;
  };
  useEffect(() => {
    axios({
      method: "post",
      url: "http://localhost:80/getQuestion_Answer",
      data: {
        question_id: q_id,
        email: localStorage.email,
        jwt: localStorage.jwt,
      },
    })
      .then((res) => {
        dispatch(questionReducer(res.data));
        //setQuestion(res.data);
        dispatch(allAnswersReducer(res.data.answers));
        //setAnswerList(res.data.answers);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  function voteNum(up, down) {
    return up - down;
  }
  function upVoteAdd(question, answer) {
    axios({
      method: "post",
      url: "http://localhost:80/upVote",
      data: {
        question_id: question._id,
        answer_id: answer._id,
        email: userInfo.email,
        jwt: localStorage.jwt,
      },
    })
      .then((res) => {
        setVoteChange(1 - voteChange);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function downVoteSub(question, answer) {
    axios({
      method: "post",
      url: "http://localhost:80/downVote",
      data: {
        question_id: question._id,
        answer_id: answer._id,
        email: userInfo.email,
        jwt: localStorage.jwt,
      },
    })
      .then((res) => {
        setVoteChange(7);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleSubmitAnswer(event) {
    event.preventDefault();
    console.log("newAnswer");
    //API call
    // need to append answers list
    axios({
      method: "post",
      url: "http://localhost:80/newAnswer",
      data: {
        question_id: question._id,
        content: newAnswerContent,
        email: userInfo.email,
        jwt: localStorage.jwt,
      },
    })
      .then( (res) => {
        dispatch(newAnswerReducer(res.data))
      })
      .catch(function (error) {
        console.log(error);
      });
    setNewAnswerContent("");
  }

  return (
    <div className="Home">
      <Container fluid>
        <Row className="questionAnswerContainer">
          <Col>
            <Row className="questionAnswerTitle">
              {question.title || "Temp Title"}
              <br />
              <p>
                Asked:
                {moment(question.createdAt).isValid()
                  ? moment(question.createdAt).format("DD/MM/YYYY")
                  : "12/12/2012"}{" "}
                by: {question.user_ref?.nickname || "gf"}
              </p>
            </Row>
            <Row className="questionContent">
              {question.content || "no content"}
            </Row>
            <Row className="questionBottom">
              <Col className="questionTags">
                {(question.tags || ["1", "2", "3"]).map((tag, j) => {
                  return (
                    <Badge className="singleTag" key={j} pill bg="info">
                      {tag}
                    </Badge>
                  );
                })}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <ListGroup className="answerList">
        <h1 className="answersTitle">Answers</h1>
        {answerList.map((answer, i) => {
          return (
            <ListGroup.Item className="answerContainer" key={i}>
              <Container fluid>
                <Row>
                  <Col md={2}>
                    <div className="votecounter">
                      <FaArrowUp
                        className="upVoteButton"
                        onClick={() => {
                          return upVoteAdd(question, answer);
                        }}
                      />
                      <br />
                      {voteNum(answer.upvote.length, answer.downvote.length)}
                      <br />
                      <FaArrowDown
                        className="downVoteButton"
                        onClick={() => {
                          return downVoteSub(question, answer);
                        }}
                      />
                    </div>
                  </Col>
                  <Col md={10}>
                    <Row className="answerContent">{answer.content}</Row>
                    <Row className="answerUser">
                      <Col>
                        Answered:{" "}
                        {moment(answer.createdAt).format("DD/MM/YYYY")}
                        <br />
                        By: {answer.user_ref.nickname}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
      <Form onSubmit={handleSubmitAnswer}>
        <Form.Group className="answerTextArea" size="lg" controlId="content">
          <Form.Label>Answer</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Type answer here"
            rows={4}
            value={newAnswerContent}
            onChange={(e) => setNewAnswerContent(e.target.value)}
          />
        </Form.Group>

        <Button
          className="submitAnswer"
          size="md"
          type="submit"
          disabled={!validateForm()}
        >
          Answer
        </Button>
      </Form>
    </div>
  );
};

export default QuestionAnswer;

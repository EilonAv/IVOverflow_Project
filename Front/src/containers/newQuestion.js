import React, { useState, useEffect } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import axios from "axios";
import { newQuestionReducer } from "../allQuestionsSlice";
import { useDispatch } from "react-redux";

const NewQuestion = function () {
  const [newQuestionTitle, setNewQuestionTitle] = useState("");
  const [newQuestionContent, setNewQuestionContent] = useState("");
  const [newQuestionTags, setNewQuestionTags] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => {
    // clear form and hiding it
    setNewQuestionTitle("");
    setNewQuestionContent("");
    setNewQuestionTags("");
    setShow(false);
  };
  const dispatch = useDispatch();

  //making sure to allow clicking the submit button only after title content and tags filled
  const validateForm = function () {
    return (
      newQuestionTitle.length > 0 &&
      newQuestionContent.length > 0 &&
      newQuestionTags.length > 0
    );
  };

  useEffect(() => {
    console.log("NewQuestionUseEffect");
  }, []);

  // fill submiting new question   cform to db
  const handleSubmit = () => {
    console.log("submitted");
    //API call
    var tags = newQuestionTags.split(",");
    tags = tags.map((e) => {
      return e.trim();
    });

    axios({
      method: "post",
      url: "http://localhost:80/newQuestion",
      data: {
        title: newQuestionTitle,
        content: newQuestionContent,
        tags: tags,
        email: localStorage.email,
        jwt: localStorage.jwt,
      },
    })
      .then((res) => {
        // when question saved to DB and backend returned response closing the modal form
        dispatch(newQuestionReducer(res.data));
        handleClose();
      })
      .catch(function (error) {});
  };
  return (
    <div className="newQuestion">
      <Button
        onClick={() => {
          setShow(true);
        }}
      >
        Ask Question
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ask Question</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group size="lg" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title here"
                value={newQuestionTitle}
                onChange={(e) => setNewQuestionTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="content">
              <Form.Label>Question</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={newQuestionContent}
                onChange={(e) => setNewQuestionContent(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="tags">
              <Form.Label>Tags seperatecd by ,</Form.Label>
              <Form.Control
                type="text"
                value={newQuestionTags}
                onChange={(e) => setNewQuestionTags(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="primary"
            size="lg"
            className="submit_newQuestion"
            disabled={!validateForm()}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NewQuestion;

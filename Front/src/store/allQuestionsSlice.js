import { createSlice } from "@reduxjs/toolkit"

export const allQuestionsSlice = createSlice({
    name: 'questionsPage',
    initialState: {
      questions : [{
          "_id": "61f5fe7fbd19dc1d65b48102",
          "user_ref": {
              "_id": "61f1afbda03bc2e582d67e0b",
              "nickname": "Eilon"


          },
          "title": "Question 2 ",
          "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis ante ac tellus eleifend commodo. Aliquam eleifend, diam ut tempor.",
          "tags": [
              "t2",
              "t3",
              "t4"
          ],
          "answers": [
              {
                  "user_ref": "61f1afbda03bc2e582d67e0b",
                  "content": "Answer 1 question 2 ",
                  "upvote": [],
                  "downvote": [
                      "61f1afbda03bc2e582d67e0b",
                      "61f1afbda03bc2e582d67e0b",
                      "61f1afbda03bc2e582d67e0b",
                      "61f1afbda03bc2e582d67e0b",
                      "61f1afbda03bc2e582d67e0b",
                      "61f1afbda03bc2e582d67e0b",
                      "61f1afbda03bc2e582d67e0b"
                  ],
                  "_id": "61f5fedbbd19dc1d65b48121"
              }
          ],
          "votes": -7,
          "createdAt": "2022-01-30T02:57:03.702Z",
          "updatedAt": "2022-01-30T02:59:17.820Z",
          "__v": 8
      }]
    },
    reducers: {
      allQuestionsReducer: (state,action ) => {
          console.log(action);
          state.questions = action.payload
      },
      newQuestionReducer: (state,action) => {
          state.questions.push(action.payload)
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { allQuestionsReducer, newQuestionReducer } = allQuestionsSlice.actions

  export const selectQuestions = (state) => {
  return state.allQuestions.questions }

  export default allQuestionsSlice.reducer
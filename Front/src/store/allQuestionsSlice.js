import { createSlice } from "@reduxjs/toolkit"

export const allQuestionsSlice = createSlice({
    name: 'questionsPage',
    initialState: {
      questions : [{
          "_id": "61f5fe7fbd19dc1d65b48102",
          "user_ref": {
              "_id": "61f1afbda03bc2e582d67e0b",
              "nickname": "Eilon",
              "fullname": "Eilon Avziz",
              "email": "e@g.com",
              "password": "2d73f22828254d2dc702e2dbb81f8c0f6cba8f2dfb6128572a6588e49325670c00dd7736b66520fcf6efe70fc43a460b2e4070f4516aa4ca3755db82b7d2a16ae46280481926ec6940be1277552fc262b155c275722551a3c3c39c0fcf46639fcac0d1769daf576cc6d24a20f2cb06ae2930e178c702670d38d533a6ccc5c094f89d453d5fc5028ec9eebdfe404e0eca448df4de37555fee48b0992bec8186602bc56e6fb8bb3ea57c0d55a3bfd3c25e586ee0185f764844ab8c46a9caef6fc79b1390f9659f719d421f1159616f1d95703cd2d0a2136c17b11b9dcb3ee8f79518b4ea09e84e57aea4384f7f0ea401fae54adc870dfc1b41bda2cfdcbec4255baedb161f8d5393a437f5014915e0ff6748d59383c7fd8ef54439f64cd34ca3c866896112f8604349e3ab9c8ba66d3008d3d28cc85c846014ecb37d812a1116c6d493ae114715a4ff04adfb32af9b20fc3b0a23823af792e8b192b97404502e598b0c64dbb79003e7f12f13dfe7fc21bad581e1f6596865ef24d2fc83415129914c539e41b309e5d5a7c9fc24df66d4ede2bdce3e9bdc0bcee75ddcf9e364841e7feee94a4b575896021dbf83b8c99460dc8780c5b1f63d54b829c836d66c84d26c80ff70edb3dda157079cba69bab1a0700180d9689e23d4601e6c049ba6d40cf2488f152e8576c8da93efa3a29e849bdd4d6a737329d3c19914b9ae6c21e2e4",
              "jwtoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjFmMWFmYmRhMDNiYzJlNTgyZDY3ZTBiIiwiZW1haWwiOiJlQGcuY29tIiwiaWF0IjoxNjQ1MTQzNzc1LCJleHAiOjE2NDUxNDczNzV9.YAX7HXnCnJV9ShcgHUGBuaSUPX4dG4oXT9UagqCLgqM",
              "createdAt": "2022-01-26T20:31:57.918Z",
              "updatedAt": "2022-02-18T00:22:55.233Z",
              "__v": 0
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
import { configureStore } from "@reduxjs/toolkit";
import allQuestionsShowReducer from "./allQuestionsSlice";
import currentQuestionReducer from "./questionAnswerSlice";
import userInfoReducer from "./userInfoSlice";

export default configureStore({
  reducer: {
    allQuestions: allQuestionsShowReducer,
    currentQuestion: currentQuestionReducer,
    userInfo : userInfoReducer,
  },
});

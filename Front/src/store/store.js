import { configureStore } from "@reduxjs/toolkit";
import allQuestionsShowReducer from "../allQuestionsSlice";
import currentQuestionReducer from "../questionAnswerSlice";

export default configureStore({
  reducer: {
    allQuestions: allQuestionsShowReducer,
    currentQuestion: currentQuestionReducer,
  },
});

import { useState } from "react";

const useQuestionNavigation = (totalQuestions: number) => {
  const [currenQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questinonAnswered, setQuestionAnswered] = useState(false)

  const handleNextQuestion = () => {
    setQuestionAnswered(false)
    setCurrentQuestionIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      return newIndex < totalQuestions ? newIndex : prevIndex;
    });
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => {
      const newIndex = prevIndex - 1;
      return newIndex >= 0 ? newIndex : prevIndex;
    });
  };
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    return currenQuestionIndex;
  } 

  return { currenQuestionIndex, handleNextQuestion, handlePreviousQuestion, questinonAnswered, setQuestionAnswered, handleRestart };
};

export default useQuestionNavigation;

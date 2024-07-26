import { useState } from "react";
import { Quiz } from "./useQuiz";
import useQuestionNavigation from "./useQuestionNavigation";

const dummyTotalQuestions = 10; // Replace with your actual total questions count

const useChechAnswer = (currentQuestion: Quiz) => {
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null); // Changed to null initially
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const { setQuestionAnswered } = useQuestionNavigation(dummyTotalQuestions);

  const handleOptionClick = (option: string) => {
    if (!isOptionSelected) {
      setSelectedOption(option);
      setIsOptionSelected(true);
      setQuestionAnswered(true);
      if (option === currentQuestion?.correct_answer) {
        setScore(score + 1);
      }
    }
  };

  const reset = () => {
    setIsOptionSelected(false);
    setSelectedOption(null); // Ensure this is null
  };

  return { handleOptionClick, score, selectedOption, isOptionSelected, reset };
};

export default useChechAnswer;

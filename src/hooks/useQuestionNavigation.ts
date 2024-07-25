import { useState } from 'react'

const useQuestionNavigation = (totalQuestions: number) => {
 const [currenQuestionIndex, setCurrentQuestionIndex] = useState(0);

 const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        return newIndex < totalQuestions ? newIndex : prevIndex;
    })
 }
 const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => {
        const newIndex = prevIndex - 1;
        return newIndex >=0 ? newIndex : prevIndex
    })
 }

 return {currenQuestionIndex, handleNextQuestion, handlePreviousQuestion}
  
}

export default useQuestionNavigation 
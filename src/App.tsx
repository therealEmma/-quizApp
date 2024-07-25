import QuizApp from "./components/QuizApp";
import useQuiz from "./hooks/useQuiz";

function App() {
  const { quiz, loading, error } = useQuiz();

  return (
    <>
      <QuizApp quiz={quiz} loading={loading} error={error}/>
    </>
  );
}

export default App;

import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { CanceledError } from "axios";

export interface Quiz {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface FetchQuizResponse {
  response_code: number;
  results: Quiz[];
}

const useQuiz = () => {
  const [quiz, setQuiz] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    apiClient
      .get<FetchQuizResponse>(
        "api.php?amount=10&category=9&difficulty=medium",
        { signal: controller.signal }
      )
      .then((response) => {
        if (response.data.response_code === 0) {
          setQuiz(response.data.results);
        } else {
          throw new Error("Failed to fetch quiz data: Invalid response code.");
        }
      })
      .catch((err) => {
        if (err instanceof CanceledError) {
          console.log("Request canceled", err.message);
        } else {
          console.error("Request failed", err.message);
          setError(err instanceof Error ? err : new Error("An unknown error occurred"));
        }
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  return { quiz, loading, error };
};

export default useQuiz;

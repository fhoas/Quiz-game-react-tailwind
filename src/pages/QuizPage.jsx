import React, { useEffect } from "react";
import QuizCard from "../components/QuizCard";

const QuizPage = ({ setScore, score, loading, setLoading }) => {
  useEffect(() => {
    window.onload = () => {
      setLoading(false);
    };
  }, []);

  return (
    <>
      <div className="flex items-center justify-center flex-col">
        {loading ? (
          <div className="loading">
            <img
              className="h-[30px] w-[30px]"
              src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.webp"
              alt="loader"
            />
          </div>
        ) : (
          <QuizCard setScore={setScore} score={score} />
        )}
      </div>
    </>
  );
};

export default QuizPage;

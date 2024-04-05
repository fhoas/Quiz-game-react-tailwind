import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const QuizCard = ({ setScore, score }) => {
  const { difficulty, amount, category } = useParams();
  const [questionsData, setQuestionsData] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(30);
  const navigate = useNavigate();

  const decodeEntities = (encodedString) => {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = encodedString;
    return textArea.value;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (timer === 0) {
      setCount((prevCount) => prevCount + 1);
      setTimer(30);
    }
  }, [timer]);

  useEffect(() => {
    if (amount && category && difficulty) {
      const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
      axios
        .get(url)
        .then((res) => {
          const cleanedQuestionsData = res.data.results.map((question) => ({
            ...question,
            question: decodeEntities(question.question),
            incorrect_answers: question.incorrect_answers.map(decodeEntities),
          }));
          setQuestionsData(cleanedQuestionsData);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [amount, category, difficulty]);

  useEffect(() => {
    if (questionsData.length > 0) {
      const currentQuestion = questionsData[count];
      if (currentQuestion) {
        const shuffledAnswers = shuffleArray([
          ...currentQuestion.incorrect_answers,
          currentQuestion.correct_answer,
        ]);
        setAnswers(shuffledAnswers);
      }
    }
  }, [questionsData, count]);

  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const getStatus = (e) => {
    const selectedAnswer = e.currentTarget.value;
    const currentQuestion = questionsData[count];
    setTimer(30);
    if (currentQuestion) {
      const isCorrectAnswer = selectedAnswer === currentQuestion.correct_answer;
      if (isCorrectAnswer) {
        setScore((prev) => prev + 1);
      }
      setCount((prevCount) => prevCount + 1);
    }
  };

  useEffect(() => {
    if (count === parseInt(amount)) {
      navigate(`/results`);
    }
  }, [count, amount, navigate]);

  return (
    <>
      {questionsData.length > 0 && (
        <div className="w-[90%] sm:w-[600px] md:w-[800px] h-fit flex gap-4 sm:gap-8 p-6 m-4 sm:p-12 items-center justify-center bg-[#1f1f1f] border border-[#666] rounded-[5px] flex-col">
          <div className="flex justify-between items-center gap-2 w-[100%] h-fit">
            <div className="flex justify-center items-center sm:text-xl font-bold w-1/4 bg-[#1f1f1f] border border-[#666] p-4 rounded-[5px]">
              {count + 1}/{amount}
            </div>
            <div className="flex justify-center sm:text-xl font-bold w-1/4 bg-[#1f1f1f] border border-[#666] p-4 rounded-[5px]">
              {timer}
            </div>
          </div>
          <div className="sm:text-xl font-bold w-[100%] bg-[#1f1f1f] border border-[#666] p-4 rounded-[5px]">
            {decodeEntities(questionsData[count]?.question)}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 w-full">
            {answers.map((answer, i) => (
              <button
                key={i}
                value={answer}
                onClick={getStatus}
                className="bg-[#1f1f1f] border border-[#666] rounded-[5px] p-4 sm:hover:bg-[#191919]"
              >
                {decodeEntities(answer)}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default QuizCard;

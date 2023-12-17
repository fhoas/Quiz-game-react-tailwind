import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Result from '../pages/results';
import { useParams, useNavigate } from 'react-router-dom';

const QuizCard = ({ setScore, score}) => {
  const { difficulty, amount, category } = useParams();
  const [questionsData, setQuestionsData] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [count, setCount] = useState(0);
  const [modal, setModal] = useState(false);
  const [timer, setTimer] = useState(30);
  const navigate = useNavigate();

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
    const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
    axios
      .get(url)
      .then((res) => {
        setQuestionsData(res.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
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
        <div className='w-[800px] h-fit flex gap-8 p-12 items-center justify-center bg-[#343a40] rounded-lg flex-col'>
          <div className='flex justify-center text-xl font-bold w-1/4 bg-[#212529] p-4 rounded-lg'>
            {timer}
          </div>
          <div className='text-xl font-bold w-full bg-[#212529] p-4 rounded-lg'>
            {count + 1}/{amount} - {questionsData[count]?.question}
          </div>
          <div className='grid grid-cols-2 gap-8 w-full'>
          {answers.map((answer, i) => (
            <button key={i} value={answer} onClick={getStatus} className='bg-[#495057] rounded-lg p-4 hover:bg-[#212529]'>
              {answer}
            </button>
          ))}
          </div>
        </div>
      )}
    </>
  );
};

export default QuizCard;
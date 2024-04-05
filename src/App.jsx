import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import QuizPage from "./pages/QuizPage";
import Results from "./pages/results.jsx";
import "./App.css";

function App() {
  const [score, setScore] = useState(0);
  const [amountValue, setAmountValue] = useState(1);
  const amount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [loading, setLoading] = useState(true);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              amount={amount}
              setAmountValue={setAmountValue}
              amountValue={amountValue}
              loading={loading}
              setLoading={setLoading}
            />
          }
        />
        <Route
          path="quiz/:difficulty/:amount/:category"
          element={
            <QuizPage
              setScore={setScore}
              score={score}
              loading={loading}
              setLoading={setLoading}
            />
          }
        />
        <Route
          path="/results"
          element={<Results score={score} amountValue={amountValue} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
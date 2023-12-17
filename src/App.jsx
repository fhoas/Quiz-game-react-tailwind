import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import QuizPage from './pages/QuizPage'
import Results from './pages/results'
import './App.css'
import { useState } from 'react'

function App() {
  const [score, setScore] = useState(0);
    const [amountValue, setAmoutValue] = useState("")
    const amount = [1, 2, 3, 4, 5, 6, 7, 8 , 9, 10];
    const [loading, setLoading] = useState(true);

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage amount={amount} amountValue={amountValue} setAmoutValue={setAmoutValue} loading={loading} setLoading={setLoading}/>}></Route>
          <Route path='quiz/:difficulty/:amount/:category' element={<QuizPage setScore={setScore} score={score} amount={amount} loading={loading} setLoading={setLoading}/>}></Route>
          <Route path='/results' element={<Results score={score} amountValue={amountValue} loading={loading} setLoading={setLoading}/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
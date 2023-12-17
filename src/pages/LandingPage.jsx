import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const LandingPage = ({amount, amountValue, setAmoutValue, loading, setLoading }) => {
    const category = {'General Knowledge' : 9, 'Entertainment: Books'  : 10, 'Entertainment: Film'  : 11, 'Entertainment: Music' : 12, 'Mythology'  : 20, 'Sports' : 21, 'Geography' : 22, 'History'  : 23, 'Animals' : 27}
    const difficulty = ["easy", "medium", "hard"];
    const navigate = useNavigate()
    const [difficultyValue, setDifficultyValue] = useState("")
    const [categoryValue, setCategoryValue] = useState("")
    const getDifficultyValue = (e) => {
        setDifficultyValue(e.currentTarget.value)
    }
    const getAmountValue = (e) => {
        setAmoutValue(e.currentTarget.value)
    }
    const getCategoryValue = (e) => {
        if (Object.keys(category).indexOf(e.target.value) !== -1){
            setCategoryValue(category[e.target.value])
        }
    }
    const startGame = () => {
        let url = `quiz/${difficultyValue}/${amountValue}/${categoryValue}`
        console.log(url)
        console.log(categoryValue)
        navigate(url)
    }

    useEffect(() => {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }, []);

    
    return (
        <div className="flex items-center justify-center flex-col">
            {loading ? (
        <div className="loading"><img className='h-[30px] w-[30px]' src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.webp" alt="loader" /></div>
      ) : (
        <div className='flex flex-col gap-8 p-12 bg-[#343a40] max-w-lg min-w-fit rounded-lg'>
          <img src="https://www.pngmart.com/files/19/Quiz-Logo-PNG-HD.png" alt="Logo" />
      
          <div className="p-2 w-full rounded-lg bg-[#495057]">
            <select onChange={getAmountValue} className="w-full border-none text-xl outline-none rounded-lg flex justify-center items-center bg-[#495057]">
              {amount.map((dt, i) => (
                <option key={i} value={dt}>
                  {dt}
                </option>
              ))}
            </select>
          </div>
      
          <div className="p-2 w-full rounded-lg bg-[#495057]">
            <select onChange={getCategoryValue} className="w-full border-none text-xl outline-none rounded-lg flex justify-center items-center bg-[#495057]">
              {Object.keys(category).map((dt, i) => (
                <option key={i} value={dt}>
                  {dt}
                </option>
              ))}
            </select>
          </div>
      
          <div className="p-2 w-full rounded-lg bg-[#495057]">
            <select onChange={getDifficultyValue} className="w-full border-none text-xl outline-none rounded-lg flex justify-center items-center bg-[#495057]">
              {difficulty.map((dt, i) => (
                <option key={i} value={dt}>
                  {dt}
                </option>
              ))}
            </select>
          </div>
      
          <button onClick={startGame} className="p-2 border-2 w-full bg-[#495057] rounded-lg font-bold hover:bg-[#343a40]">Start</button>
          </div>
      )}
        </div>
      );
      
}

export default LandingPage
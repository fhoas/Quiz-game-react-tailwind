import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = ({
  amount,
  amountValue,
  setAmountValue,
  loading,
  setLoading,
}) => {
  const category = {
    "General Knowledge": 9,
    "Entertainment: Books": 10,
    "Entertainment: Film": 11,
    "Entertainment: Music": 12,
    Mythology: 20,
    Sports: 21,
    Geography: 22,
    History: 23,
    Animals: 27,
  };
  const difficulty = ["easy", "medium", "hard"];
  const navigate = useNavigate();
  const [difficultyValue, setDifficultyValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");

  const getDifficultyValue = (e) => {
    setDifficultyValue(e.currentTarget.value);
  };

  const getAmountValue = (e) => {
    setAmountValue(e.currentTarget.value);
  };

  const getCategoryValue = (e) => {
    if (Object.keys(category).indexOf(e.target.value) !== -1) {
      setCategoryValue(category[e.target.value]);
    }
  };

  const startGame = () => {
    let url = "quiz/";

    if (difficultyValue === "") {
      url += "easy/";
    } else {
      url += `${difficultyValue}/`;
    }

    if (amount === "") {
      url += "1/";
    } else {
      url += `${amountValue}/`;
    }

    if (categoryValue === "") {
      url += "9";
    } else {
      url += `${categoryValue}`;
    }

    console.log(url);
    navigate(url);
  };

  useEffect(() => {
    const imageLoader = new Image();
    imageLoader.src = "https://www.pngmart.com/files/19/Quiz-Logo-PNG-HD.png";
    imageLoader.onload = () => {
      setLoading(false);
    };

    return () => {
      imageLoader.onload = null;
    };
  }, [setLoading]);

  return (
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
        <div className="flex flex-col gap-8 p-6 m-4 sm:p-12 bg-[#1f1f1f] border border-[#666] max-w-lg min-w-fit rounded-[5px]">
          <img
            src="https://www.pngmart.com/files/19/Quiz-Logo-PNG-HD.png"
            alt="Logo"
          />

          <div className="p-2 w-full rounded-[5px] bg-[#1f1f1f] border border-[#666] sm:hover:border-[#999]">
            <select
              onChange={getAmountValue}
              className="w-full border-none sm:text-xl outline-none rounded-[5px] flex justify-center items-center bg-transparent"
            >
              {amount.map((dt, i) => (
                <option key={i} value={dt}>
                  {dt}
                </option>
              ))}
            </select>
          </div>

          <div className="p-2 w-full rounded-[5px] bg-[#1f1f1f] border border-[#666] sm:hover:border-[#999]">
            <select
              onChange={getCategoryValue}
              className="w-full border-none sm:text-xl outline-none rounded-[5px] flex justify-center items-center bg-transparent"
            >
              {Object.keys(category).map((dt, i) => (
                <option key={i} value={dt}>
                  {dt}
                </option>
              ))}
            </select>
          </div>

          <div className="p-2 w-full rounded-[5px] bg-[#1f1f1f] border border-[#666] sm:hover:border-[#999]">
            <select
              onChange={getDifficultyValue}
              className="w-full border-none sm:text-xl outline-none rounded-[5px] flex justify-center items-center bg-transparent capitalize"
            >
              {difficulty.map((dt, i) => (
                <option key={i} value={dt}>
                  {dt}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={startGame}
            className="p-2 w-full bg-[#191919] sm:text-xl border border-[#999] rounded-[5px] hover:bg-[#1f1f1f]"
          >
            Start
          </button>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
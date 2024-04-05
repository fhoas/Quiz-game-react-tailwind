import React from "react";

const Results = ({ score, amountValue }) => {
  const progressWidth = `${(score / amountValue) * 100}%`;

  return (
    <>
      <div className="flex gap-6 p-6 sm:p-12 items-center justify-center flex-col w-[250px] sm:w-[600px] md:w-[800px] bg-[#1f1f1f] border border-[#666] rounded-[5px]">
        <div className="font-bold text-xl">
          Your score is {score}/{amountValue}
        </div>

        <div className="line w-[100%] h-[10px] bg-white rounded-[5px] overflow-hidden">
          <div
            className="bg-green-500"
            style={{ width: progressWidth, height: "10px" }}
          ></div>
        </div>
      </div>
      <button
        className="flex p-2 items-center justify-center w-fit bg-[#1f1f1f] border
         border-[#666] rounded-[5px] mt-2 sm:hover:border-[#999]"
      >
        <a href="/">Back to start</a>
      </button>
    </>
  );
};

export default Results;
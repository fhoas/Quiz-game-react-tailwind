import React from 'react';

const Results = ({ score, amountValue, loading, setLoading}) => {
  const progressWidth = `${(score / amountValue) * 100}%`;

  return (
    <>
    <div className='flex gap-6 p-12 items-center justify-center flex-col max-w-lg min-w-fit bg-[#343a40] rounded-lg'>
      <div className='font-bold text-xl'>Your score is {score}/{amountValue}</div>
      <div className='line w-[500px] h-[10px] bg-white rounded overflow-hidden'>
        <div className='bg-green-500' style={{ width: progressWidth, height: '10px' }}></div>
      </div>
      </div>
    </>
  );
};

export default Results;

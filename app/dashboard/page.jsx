import React from 'react';
import AddNewInterview from './_components/AddNewInterview';
import InterviewList from './_components/interviewList'; 



function Dashboard() {
  return (
    <div className='p-10'>
      <h1 className='font-bold text-2xl'>Dashboard</h1>
      <h2 className='text-gray-500'>Create and start your AI mock interview</h2>

      <div className='grid grid-cols-1 md:grid-cols-3 '>
        <AddNewInterview />
      </div>



      <InterviewList/>
    </div>
  );
}

export default Dashboard;

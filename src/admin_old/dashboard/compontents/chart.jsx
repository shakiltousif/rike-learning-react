import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale,PointElement, LineElement, Title, Tooltip, Legend);

const ChartComponent = ({context}) => {
  const total_active_students = context[0];
  const totalMonths = context[1];
  const totalMonthlyEnroll = context[2];
  const totalYears = context[3];
  const totalYearlyEnroll = context[4];

  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Enrollment Data',
      },
    },
  };

  const data = {
    labels: totalMonths,
    datasets: [
      {
        fill: true,
        label: 'Total Monthly Enroll',
        data: totalMonthlyEnroll,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        fill: true,
        label: 'Total Yearly Enroll',
        data: totalYearlyEnroll,
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default ChartComponent;

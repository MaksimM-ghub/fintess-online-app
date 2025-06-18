import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { FC } from "react";
import { Doughnut } from "react-chartjs-2";

interface DoughnutChartProp {
  protein: number;
  fats: number;
  carbohydrates: number;
}

// Регистрация необходимых элементов Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const CalorieChart: FC <DoughnutChartProp> = ({ protein, fats, carbohydrates }) => {
  const data = {
    labels: ["Белки", "Жиры", "Углеводы"],
    datasets: [
      {
        // label: 'Пример данных',
        data: [protein, fats, carbohydrates],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div
      className="calorie__result-chart"
      style={{ width: "200px", height: "200px" }}
    >
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default CalorieChart;
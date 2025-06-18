import { useSelector } from "react-redux";
import CalorieChart from "../CalorieChart/CalorieChart";
import { initialStateType } from "../../store/purposeCalorie/purposeCalorieSlice";

interface statePurposeCalorie {
  purposeCalorie: initialStateType;
}

const ResultCalcCalories = () => {
  const { calorie, protein, fats, carbohydrates } = useSelector(
    (state: statePurposeCalorie) => state.purposeCalorie
  );

  return (
    <div className="calorie__result-chart">
      <p className="calorie__result-chart-title">
        Ваша суточная норма калорий: <span className="calorie__result-cal">{calorie}</span> 
      </p>
      <CalorieChart
        protein={protein}
        fats={fats}
        carbohydrates={carbohydrates}
      />
    </div>
  );
};

export default ResultCalcCalories;

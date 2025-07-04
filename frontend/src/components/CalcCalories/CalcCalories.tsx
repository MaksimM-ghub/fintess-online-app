import { useState, ChangeEvent } from "react";
import RadioGender from "../RadioGender/RadioGender";
import UserParamsForm from "../UserParamsForm/UserParamsForm";
import RengePal from "../RangePAL/RangePAL";
import RadioPurpose from "../RadioPurpose/RadioPurpose";
import "./CalcCalories.scss";
import {
  calcCalories,
  calcImt,
  calcPFC,
  Gender,
  Purpose,
} from "../../utils/calcCalories";
import { Button } from "../Button/Button";
import { useDispatch } from "react-redux";
import {
  setCalorie,
  setPFC,
} from "../../store/purposeCalorie/purposeCalorieSlice";
import ResultCalcIMT from "../ResultCalcIMT/ResultCalcIMT";
import ResultCalcCalories from "../ResultCalcCalories/ResultCalcCalories";

const CalcCalorie = () => {
  const [formData, setFormData] = useState({
    gender: "male" as Gender | string,
    age: null as number | null,
    height: null as number | null,
    weight: null as number | null,
    palIdx: 0,
    purpose: "deficit" as Purpose | string,
  });

  const [showResult, setShowResult] = useState<boolean>(false);
  const [imt, setImt] = useState<number>(0);

  const dispatch = useDispatch();

  const handleInputChange =
    (field: keyof typeof formData) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const value =
        field === "palIdx" ? Number(event.target.value) : event.target.value;
      setFormData({ ...formData, [field]: value });
    };

  const handleCalc = () => {
    const { gender, weight, height, age, palIdx, purpose } = formData;
    const totalCalories = calcCalories(
      gender,
      weight,
      height,
      age,
      palIdx,
      purpose
    );

    const calculatedIMT = calcImt(weight, height);

    dispatch(setCalorie(totalCalories));

    if (totalCalories && purpose) {
      dispatch(setPFC(calcPFC(totalCalories, purpose)));
    }

    setShowResult(true);
    setImt(calculatedIMT);
  };

  return (
    <section className="calorie">
      <div className="container">
        <div className="calorie__wrapper">
          <div className="calorie__form">
            <RadioGender
              gender={formData.gender}
              onChange={handleInputChange("gender")}
            />
            <UserParamsForm
              age={formData.age}
              onAgeChange={handleInputChange("age")}
              height={formData.height}
              onHeightChange={handleInputChange("height")}
              weight={formData.weight}
              onWeightChange={handleInputChange("weight")}
            />
            <RengePal
              palIdx={formData.palIdx}
              onPalChange={handleInputChange("palIdx")}
            />
            <RadioPurpose
              purpose={formData.purpose}
              onPurposeChange={handleInputChange("purpose")}
            />
            <Button className="btn-reset calorie__btn-calc btn-primary" onClick={handleCalc}>
              Рассчитать
            </Button>
          </div>
          {showResult && (
            <>
              <ResultCalcIMT imt={imt} />
              <ResultCalcCalories />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default CalcCalorie;

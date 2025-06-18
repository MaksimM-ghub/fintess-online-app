import { FC, ChangeEvent } from "react";
import FormField from "../FormField/FormField";

type Props = {
  palIdx: number;
  onPalChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const palLevels = [
  { value: 1.2, label: "Минимальный (сидячий)" },
  {
    value: 1.375,
    label: "Небольшая активность (легкие тренировки 1-3 дня в неделю)",
  },
  {
    value: 1.55,
    label: "Средняя активность (умеренные тренировки 3-5 дней в неделю)",
  },
  {
    value: 1.725,
    label: "Высокая активность (интенсивные тренировки 6-7 дней в неделю)",
  },
  {
    value: 1.9,
    label: "Максимальная активность (очень тяжелый физический труд или спорт)",
  },
];

const RengePal: FC<Props> = ({ palIdx, onPalChange }) => (
  <div className="calorie__active-wrapper">
    <FormField title="Дневная активность" classWrapper="calorie__input-range-wrapper">
      <input
        className="input-reset calorie__input-range"
        type="range"
        min="0"
        max="4"
        step="1"
        value={palIdx}
        onChange={onPalChange}
      />
    </FormField>
    <p className="calorie__active-text">{palLevels[palIdx]?.label}</p>
  </div>
);

export default RengePal;

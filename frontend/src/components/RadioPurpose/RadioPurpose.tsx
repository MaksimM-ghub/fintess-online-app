import { FC, ChangeEvent } from "react";

type Props = {
  purpose: string;
  onPurposeChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const RadioPurpose: FC<Props> = ({ purpose, onPurposeChange }) => (
  <div className="calorie__purpose-wrapper">
    <input
      id="deficit"
      className="input-reset calorie__input-radio"
      type="radio"
      onChange={onPurposeChange}
      value="deficit"
      checked={purpose === "deficit"}
    />
    <label htmlFor="deficit" className="calorie__label-radio">
      Похудение
    </label>
    <input
      id="surplus"
      className="input-reset calorie__input-radio"
      type="radio"
      onChange={onPurposeChange}
      value="surplus"
      checked={purpose === "surplus"}
    />
    <label htmlFor="surplus" className="calorie__label-radio">
      Набор мышечной массив
    </label>
    <input
      id="weightMaintenance"
      className="input-reset calorie__input-radio"
      type="radio"
      onChange={onPurposeChange}
      value="weightMaintenance"
      checked={purpose === "weightMaintenance"}
    />
    <label htmlFor="weightMaintenance" className="calorie__label-radio">
      Поддержание веса
    </label>
  </div>
);

export default RadioPurpose;

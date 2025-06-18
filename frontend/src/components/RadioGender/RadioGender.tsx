import { FC, ChangeEvent } from "react";

type Props = {
  gender: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const RadioGender: FC<Props> = ({ gender, onChange }) => (
  <div className="calorie__gender-wrapper">
    <input
      id="male"
      className="input-reset calorie__input-radio"
      type="radio"
      onChange={onChange}
      value="male"
      checked={gender === "male"}
    />
    <label htmlFor="male" className="calorie__label-radio">
      Мужской
    </label>
    <input
      id="female"
      className="input-reset calorie__input-radio"
      type="radio"
      onChange={onChange}
      value="female"
      checked={gender === "female"}
    />
    <label htmlFor="female" className="calorie__label-radio">
      Женский
    </label>
  </div>
);

export default RadioGender;

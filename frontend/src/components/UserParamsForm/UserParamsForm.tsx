import { FC, ChangeEvent } from "react";
import FormField from "../FormField/FormField";

type Props = {
  age: number | null;
  onAgeChange: (event: ChangeEvent<HTMLInputElement>) => void;
  height: number | null;
  onHeightChange: (event: ChangeEvent<HTMLInputElement>) => void;
  weight: number | null;
  onWeightChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const UserParamsForm: FC<Props> = ({
  age,
  onAgeChange,
  height,
  onHeightChange,
  weight,
  onWeightChange,
}) => (
  <div className="calorie__params">
    <FormField
      htmlFor="age"
      title="Возраст"
      className="label-primary calorie__params-label"
    >
      <input
        id="age"
        className="input-reset input-primary calorie__params-input"
        type="number"
        onChange={onAgeChange}
        value={age ?? ""}
      />
    </FormField>
    <FormField
      htmlFor="height"
      title="Рост, см"
      className="label-primary calorie__params-label"
    >
      <input
        id="height"
        className="input-reset input-primary calorie__params-input"
        type="number"
        onChange={onHeightChange}
        value={height ?? ""}
      />
    </FormField>
    <FormField
      htmlFor="weight"
      title="Вес, кг"
      className="label-primary calorie__params-label"
    >
      <input
        id="weight"
        className="input-reset input-primary calorie__params-input"
        type="number"
        onChange={onWeightChange}
        value={weight ?? ""}
      />
    </FormField>
  </div>
);

export default UserParamsForm;

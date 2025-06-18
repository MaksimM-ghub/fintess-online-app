import FormField from "../FormField/FormField";

const RangeIMT = () => {
  return (
    <div className="calorie__imt-wrapper">
      <FormField title="Ваш индекс массы тела">
        <input
          type="range"
          className="calorie__active-range"
          min="0"
          max="5"
          readOnly
          style={{ pointerEvents: "none" }}
        />
      </FormField>
    </div>
  );
};

export default RangeIMT;

import { FC, useState } from "react";
import ModalImtResult from "../ModalImtResult/ModalImtResult";

interface ResultCalcIMTProp {
  imt: number;
}

const ResultCalcIMT: FC<ResultCalcIMTProp> = ({ imt }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="calorie__imt-wrapper">
      <span className="calorie__result-imt">Ваш индекс массы тела: {imt}</span>
      <input
        className="input-reset calorie__range-imt"
        type="range"
        value={imt}
      />
      <button onClick={handleClick} className="btn-reset calorie__imt-info">
        <svg width="24" height="24" viewBox="0 0 24 24">
          <g fill="none" stroke="white" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <path stroke-linecap="round" d="M12 7h.01" />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10 11h2v5m-2 0h4"
            />
          </g>
        </svg>
      </button>
      {isOpen && <ModalImtResult setIsOpen={setIsOpen} />}
    </div>
  );
};

export default ResultCalcIMT;

import React, { ChangeEvent, FC, useState, useRef } from 'react';


interface BpmRangeFilterProps {
  min: number;
  max: number;
  getResultRangeBpm: (value: [number, number]) => void;
}

export const BpmRangeFilter: FC<BpmRangeFilterProps> = (props) => {
  const [minVal, setMinVal] = useState(props.min);
  const [maxVal, setMaxVal] = useState(props.max);
  const minValRef = useRef(props.min);
  const maxValRef = useRef(props.max);

  function handleChange() {
    props.getResultRangeBpm([minVal, maxVal]);
  }

  return (
    <div className="range">
        <input
          type="range"
          step="10"
          min={props.min}
          max={props.max}
          value={minVal}
          onChange={(event: ChangeEvent<HTMLInputElement>) => { 
            const value = Math.min(Number(event.target.value), maxVal);
            setMinVal(value);
            minValRef.current = value;
          }}
          className="range__thumb range__thumb--left"
        />
        <input
          type="range"
          step="10"
          min={props.min}
          max={props.max}
          value={maxVal}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {  
            const value = Math.max(Number(event.target.value), minVal);
            setMaxVal(value);
            maxValRef.current = value;
          }}
          className="range__thumb range__thumb--right"
        />

        <div className="flex range__slider">
          <div className="range__slider__track"></div>
          <div className="range__slider__left-value">bpm min: {minVal}</div>
          <div className="range__slider__right-value">bpm max: {maxVal}</div>
          <button className="range__slider__button mx-auto rounded-md mt-4" onClick={handleChange}>Filtrer</button>

        </div>
      </div>
  );
};



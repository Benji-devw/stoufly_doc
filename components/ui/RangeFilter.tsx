import { Router, useRouter } from 'next/router';
import React, { ChangeEvent, FC, useState, useRef } from 'react';


interface BpmRangeFilterProps {
  min: number;
  max: number;
  getResultRangeBpm: (value: [number, number]) => void;
}

export const BpmRangeFilter: FC<BpmRangeFilterProps> = (props) => {
  const router = useRouter()
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
          className="range__thumb range__thumb--left shadow-md"
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
          className="range__thumb range__thumb--right shadow-md"
        />

        <div className="flex range__slider">
          <div className="range__slider__track dark:bg-zinc-100 bg-orange-700 shadow-md"></div>
          <div className="range__slider__left-value">bpm min: {!minVal ? router.query.BpmMin : minVal}</div>
          <div className="range__slider__right-value">bpm max: {!minVal ? router.query.BpmMax : maxVal}</div>
          <button className="range__slider__button mx-auto rounded-md mt-4 shadow-md" onClick={handleChange}>Filtrer</button>

        </div>
      </div>
  );
};



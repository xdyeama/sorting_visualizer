import React, { useState, useEffect } from 'react';
import getMergeSortAnimations from '../../algorithms/mergeSort';
import getQuickSortAnimations from '../../algorithms/quickSort';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 10;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 310;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

const randomIntFromInterval: (min: number, max: number) => number = (
  min,
  max
) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const SortingVisualizer: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);

  const resetArray: () => void = () => {
    const array: number[] = [];
    for (let i = 0; i < 350; i++) {
      array.push(randomIntFromInterval(5, 500));
    }
    setArray(array);
  };

  const mergeSort = () => {
    const animations = getMergeSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName(
        'array-bar'
      ) as HTMLCollectionOf<HTMLDivElement>;
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const animation: [a: number, b: number] = animations[i];
        const barOneStyle = arrayBars[animation[0]].style;
        const barTwoStyle = arrayBars[animation[1]].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  };

  const quickSort = () => {
    const animations = getQuickSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName(
        'array-bar'
      ) as HTMLCollectionOf<HTMLDivElement>;
      const isColorChange = i % 3 !== 1;
      if (isColorChange) {
        const animation: [a: number, b: number] = animations[i];
        const barOneStyle = arrayBars[animation[0]].style;
        const barTwoStyle = arrayBars[animation[1]].style;
        const color = i % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * 2 * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, barTwoIdx] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          let tempHeight = barTwoStyle.height;
          barTwoStyle.height = `${barOneStyle.height}px`;
          barOneStyle.height = `${tempHeight}px`;
        }, i * 2 * ANIMATION_SPEED_MS);
      }
    }
  };

  const heapSort = () => {};

  const bubbleSort = () => {};

  useEffect(() => {
    resetArray();
  }, []);

  return (
    <>
      <div className='array-container'>
        {array.map((value, id) => (
          <div
            className='array-bar'
            key={id}
            style={{ height: `${value}px` }}></div>
        ))}
      </div>
      <div className='button-container'>
        <button onClick={() => resetArray()}>Generate new array</button>
        <button onClick={() => mergeSort()}>Merge Sort</button>
        <button onClick={() => quickSort()}>Quick Sort</button>
        <button onClick={() => heapSort()}>Heap Sort</button>
        <button onClick={() => bubbleSort()}>Bubble Sort</button>
      </div>
    </>
  );
};

export default SortingVisualizer;

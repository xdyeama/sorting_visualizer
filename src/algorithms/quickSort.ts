import { Animations } from './mergeSort';

const getQuickSortAnimations: (array: number[]) => Animations = (array) => {
  const animations: Animations = [];
  quickSort(array, 0, array.length - 1, animations);
  return animations;
};

export const quickSort: (
  array: number[],
  left: number,
  right: number,
  animations: Animations
) => number[] = (array, left, right, animations) => {
  let index;
  if (array.length > 1) {
    index = partition(array, left, right, animations); //index returned from partition
    if (left < index - 1) {
      //more elements on the left side of the pivot
      quickSort(array, left, index - 1, animations);
    }
    if (index < right) {
      //more elements on the right side of the pivot
      quickSort(array, index, right, animations);
    }
  }
  return array;
};

const swap: (array: number[], left: number, right: number, animations: Animations) => void = (
  array,
  left,
  right,
  animations
) => {
    animations.push([left, right])
  let temp = array[left];
  array[left] = array[right];
  array[right] = temp;
};

const partition: (
  array: number[],
  left: number,
  right: number,
  animations: Animations
) => number = (array, left, right, animations) => {
  let pivot = array[Math.floor((right + left) / 2)], //middle element
    i = left, //left pointer
    j = right; //right pointer
  while (i <= j) {
    while (array[i] < pivot) {
      i++;
    }
    while (array[j] > pivot) {
      j--;
    }
    if (i <= j) {
      swap(array, i, j, animations); //swap two elements
      i++;
      j--;
    }
  }
  return i;
};

export default getQuickSortAnimations;

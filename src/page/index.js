import React from 'react';

export default function App() {
  /**
   *  冒泡排序
   */
  // const sort = (num) => {
  //   if (num.length <= 1) {
  //     return num;
  //   }
  //   for (let i = 0; i < num.length - 1; i++) {
  //     for (let j = 0; j < num.length - 1 - i; j++) {
  //       if (num[j] > num[j + 1]) {
  //         [num[j], num[j + 1]] = [num[j + 1], num[j]];
  //       }
  //     }
  //   }
  //   return num;
  // };
  // console.log(sort([2, 3, 1, 5]));

  /**
   * 快速排序
   */
  // const sortArray = function (nums) {
  //   let len = nums.length;
  //   if (len === 1) {
  //     return nums;
  //   }

  //   quickSort(nums, 0, len - 1);

  //   function quickSort(nums, left, right) {
  //     if (left < right) {
  //       let pivot = partition(nums, left, right);
  //       console.log(pivot, nums, '111');
  //       quickSort(nums, left, pivot - 1);
  //       quickSort(nums, pivot + 1, right);
  //     }
  //   }

  //   function partition(nums, left, right) {
  //     let i = left,
  //       j = right + 1;
  //     let pivot = nums[left];

  //     while (1) {
  //       // 这个循环结束的条件就是 nums[++i]>=pivot
  //       // nums[--j]<=pivot
  //       while (nums[++i] < pivot) {
  //         if (i === right) {
  //           break;
  //         }
  //       }
  //       while (pivot < nums[--j]) {
  //         if (j === left) {
  //           break;
  //         }
  //       }
  //       console.log('oo', i, j);
  //       if (i >= j) {
  //         break;
  //       }
  //       [nums[i], nums[j]] = [nums[j], nums[i]];
  //     }
  //     [nums[left], nums[j]] = [nums[j], nums[left]];
  //     console.log(i, '11');
  //     return i;
  //   }

  //   return nums;
  // };
  // console.log(sortArray([2, 3, 1, 5, 8, 12, 4, 0]));

  /**
   * 选择排序
   */
  // const arraySort = (num) => {
  //   if (num.length <= 1) {
  //     return num;
  //   }
  //   for (let i = 0; i < num.length - 1; i++) {
  //     for (let j = i + 1; j < num.length; j++) {
  //       if (num[j] < num[i]) {
  //         [num[j], num[i]] = [num[i], num[j]];
  //       }
  //     }
  //   }
  //   return num;
  // };
  // console.log(arraySort([2, 3, 1, 5, 8, 12, 4, 0]));

  /**
   * 插入排序
   */
  // const arraySort = (nums) => {
  //   const len = nums.length;
  //   if (len <= 1) return nums;
  //   for (let i = 1; i < len; i++) {
  //     for (let j = i; j > 0 && nums[j] < nums[j - 1]; j--) {
  //       [nums[j], nums[j - 1]] = [nums[j - 1], nums[j]];
  //     }
  //   }
  //   return nums;
  // };
  // console.log(arraySort([2, 3, 1, 5, 8, 12, 4, 0]));

  /**
   *
   */
  return <></>;
}

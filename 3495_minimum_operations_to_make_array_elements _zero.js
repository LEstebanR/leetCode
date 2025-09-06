/*
You are given a 2D array queries, where queries[i] is of the form [l, r]. Each queries[i] defines an array of integers nums consisting of elements ranging from l to r, both inclusive.

In one operation, you can:

Select two integers a and b from the array.

Replace them with floor(a / 4) and floor(b / 4).

Your task is to determine the minimum number of operations required to reduce all elements of the array to zero for each query. Return the sum of the results for all queries.
*/

/**
 * @param {number[][]} queries
 * @return {number}
 */
var minOperations = function (queries) {
  // Helper function to calculate operations needed for a single number
  function operationsForNumber(n) {
    if (n === 0) return 0;
    let ops = 0;
    while (n > 0) {
      n = Math.floor(n / 4);
      ops++;
    }
    return ops;
  }

  // Calculate sum of operations for range [l, r] efficiently
  function sumOperationsInRange(l, r) {
    let totalOps = 0;

    // Group numbers by the number of operations they need
    // Numbers 1-3 need 1 operation
    // Numbers 4-15 need 2 operations
    // Numbers 16-63 need 3 operations, etc.

    let current = l;
    while (current <= r) {
      let opsNeeded = operationsForNumber(current);

      // Find the upper bound for numbers that need the same number of operations
      let upperBound = Math.pow(4, opsNeeded) - 1;
      let rangeEnd = Math.min(r, upperBound);

      // Count numbers in this range
      let count = rangeEnd - current + 1;
      totalOps += count * opsNeeded;

      current = rangeEnd + 1;
    }

    return totalOps;
  }

  let result = 0;
  for (let i = 0; i < queries.length; i++) {
    let [l, r] = queries[i];
    let totalOps = sumOperationsInRange(l, r);

    // Since we can pair numbers in operations, we need ceil(totalOps / 2) operations
    result += Math.ceil(totalOps / 2);
  }
  return result;
};

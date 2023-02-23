/**
# 20. Valid Parentheses
Easy

Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
Every close bracket has a corresponding open bracket of the same type.
 

Example 1:

Input: s = "()"
Output: true
Example 2:

Input: s = "()[]{}"
Output: true
Example 3:

Input: s = "(]"
Output: false
 

Constraints:

1 <= s.length <= 104
s consists of parentheses only '()[]{}'.
 * 
 */

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  const stack = [];
  const brackets = {
    '(': ')',
    '{': '}',
    '[': ']'
  };
  for (let i = 0; i < s.length; i++) {
    const char = s.charAt(i);
    if (brackets[char]) { // push an opening bracket onto the stack
      stack.push(char);
    } else if (char === ')' || char === '}' || char === ']') { // check if a closing bracket matches the top of the stack
      const top = stack.pop();
      if (brackets[top] !== char) {
        return false;
      }
    }
  }
  return stack.length === 0;
};
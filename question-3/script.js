/**
 * On this module you should write your answer to question #3.
 * This file would be executed with the following command:
 * $ node scritp.js 'a * (b + c)'
 */

const args = process.argv.slice(-1);
console.log(`Running question #3 with args ${args}`)

/**
 * Check if a string has correct use of parenthesis.
 * 
 * @param {String} str - String to be evaluated
 * @returns {Boolean} Returns true if string is valid.
 */
function parenthesisChecker(str) {

  let opening = ['(', '{', '['];
  let closing = { ')': '(', '}': '{', ']': '[' }

  let validation = [];
  let response = true;

  str = str.split('')

  str.forEach(char => {
    if (opening.includes(char)) validation.unshift(char)
    else if (closing[char] === validation[0]) validation.shift()
    else response = false
  })

  return response
}

const isValid = parenthesisChecker("({})");
console.log(`parenthesisChecker("${args}") = ${isValid}`);


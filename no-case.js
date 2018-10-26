var lowerCase = require('lower-case')

var NON_WORD_REGEXP = require('./vendor/non-word-regexp')
var CAMEL_CASE_REGEXP = require('./vendor/camel-case-regexp')
var CAMEL_CASE_UPPER_REGEXP = require('./vendor/camel-case-upper-regexp')
var CAMEL_CASE_WITH_NUMBERS = require('./vendor/camel-case-with-numbers-regexp')

/**
 * Sentence case a string.
 *
 * @param  {string}  str
 * @param  {string}  locale
 * @param  {string}  replacement
 * @param  {object}  options
 * @param  {string}  options.ignoredCharacters
 * @param  {boolean} options.splitNumbers
 * @return {string}
 */
module.exports = function (
  str,
  locale,
  replacement,
  options = { ignoredCharacters: '', splitNumbers: false }
) {
  if (str == null) {
    return ''
  }

  replacement = typeof replacement !== 'string' ? ' ' : replacement

  function replace (match, index, value) {
    // don't replace characters that are desired to be ignored
    if (options.ignoredCharacters && options.ignoredCharacters.includes(match)) {
      return match
    }

    if (index === 0 || index === (value.length - match.length)) {
      return ''
    }

    return replacement
  }

  str = String(str)
    // Support camel case ("camelCase" -> "camel Case").
    .replace(CAMEL_CASE_REGEXP, '$1 $2')
    // Support odd camel case ("CAMELCase" -> "CAMEL Case").
    .replace(CAMEL_CASE_UPPER_REGEXP, '$1 $2')

  if (options.splitNumbers) {
    str = str
      // Support always treating a number sequence as a new word ("camelCase123" -> "camel Case 123").
      .replace(CAMEL_CASE_WITH_NUMBERS, '$1 $2')
  }

  str = str
    // Remove all non-word characters and replace with user specified replacement or single space by default
    .replace(NON_WORD_REGEXP, replace)

  // Lower case the entire string.
  return lowerCase(str, locale)
}

/**
 * Truncates a string to a specified maximum length, adding " ...." if it exceeds that length.
 *
 * @param {string} txt - The string to shorten.
 * @param {number} [max=50] - The maximum length. Default is 50.
 * @returns {string} - The shortened string with " ...." if too long, or the original string.
 */
export function txtSlicer(txt: string, max: number = 50) {
  if (txt.length >= max) return `${txt.slice(0, max)} ....`;
  return txt;
}

/**
 *
 * @param {string} x - The numeric string to be formatted.
 * @returns {string} A formatted version of the input numeric string with commas as thousand separators.
 *
 */
export function numberWithCommas(x: string): string {
  return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

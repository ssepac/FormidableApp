/**
 * Returns the result of a parsed network call.
 * @param {*} flag The flag constant pertaining to the request; values less than 0 indicate a successful request.
 * @param {*} content The content to return if the result was successful. 
 * @returns 
 */
export const respond = (flag, content) => {
  return flag >= 0
    ? { error: true, errorObject: flag }
    : { error: false, result: content };
};

'use strict';

/**
 * $decode Helper
 * 
 * Syntax:
 * <% $decode(pass, pointer); %>
 * pass -> encoded string
 * pointer -> encode pointer (appid's length)
 */

module.exports = (pass, pointer) => {
  if (isNaN(pointer)) return {
    appid: '',
    appkey: ''
  };
  let result = '';
  let temp = pass.split(':');
  if (temp[1]) {
    let even = temp[1].substr(0, parseInt(temp[0])).split('');
    let odd = temp[1].substr(parseInt(temp[0])).split('');
    for (let i = 0; i < temp[1].length; i++) {
      if (i % 2 === 0) {
        result += even.shift();
      } else {
        result += odd.shift();
      }
    }
  }
  return {
    appid: result.substr(0, pointer),
    appkey: result.substr(pointer)
  };
};
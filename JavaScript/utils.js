/**
 * Utils
 * 
 * Examples:
 * 
 * @author jinyaoMa 2020-04-07
 * 
 */


const utils = {
  mobileRegex: /(phone|pad|tablet|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i,
  delay(time, callback) {
    window.setTimeout(callback, time);
  },
  runOnMobile(callback) {
    if (this.mobileRegex.test(window.navigator.userAgent)) {
      typeof callback === 'function' && callback(window.navigator.userAgent);
    }
  },
  runOnDesktop(callback) {
    if (!this.mobileRegex.test(window.navigator.userAgent)) {
      typeof callback === 'function' && callback(window.navigator.userAgent);
    }
  },
  forEach(array, callback) {
    if (array instanceof Array && array.length) {
      for (let i = 0; i < array.length; i++) {
        if (typeof callback === 'function' && callback(array[i], i)) {
          break;
        }
      }
    }
  },
  forIn(object, callback) {
    if (object instanceof Object) {
      for (const key in object) {
        if (typeof callback === 'function' && callback(object[key], key)) {
          break;
        }
      }
    }
  },
  getRequest() {
    let result = {};
    let url = window.location.search;
    if (url.indexOf("?") != -1) {
      let temp = url.substr(1);
      let pairs = temp.split("&");
      for (var i = 0; i < pairs.length; i++) {
        let pair = pairs[i].split("=");
        if (pair.length === 2) {
          result[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        }
      }
    }
    return result;
  }
};


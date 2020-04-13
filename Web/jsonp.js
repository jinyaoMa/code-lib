/**
 * Jsonp
 * 
 * Example: https://github.com/jinyaoMa/code-lib/blob/master/test_JavaScript_jsonp.js.html
 * 
 * @author jinyaoMa 2020-04-07
 * 
 */

const jsonp = (url, params, callback, flush = false, timeout = 30000) => {
  let script = document.createElement('script');
  let data = '';
  let cb = null;
  let result = null;
  let isTimeout = true;
  let isNotResulted = true;
  if (params) {
    for (const key in params) {
      const value = params[key];
      if (data === '') {
        data += '?' + key + '=' + value;
      } else {
        data += '&' + key + '=' + value;
      }
      if (/(jsonp|callback)/.test(key.toLowerCase())) {
        cb = value;
      }
    }
  }
  if (cb) {
    window[cb] = function (obj) {
      result = obj;
    };
  }
  script.onload = function () {
    if (result && isNotResulted) {
      isTimeout = false;
      typeof callback === 'function' && callback(result);
    }
    flush && script.remove();
  }
  script.onerror = function (e) {
    if (isNotResulted) {
      isTimeout = false;
      typeof callback === 'function' && callback(e);
    }
    flush && script.remove();
  }
  window.setTimeout(o => {
    if (isTimeout) {
      isNotResulted = false;
      typeof callback === 'function' && callback(null);
    }
  }, timeout);
  script.src = url + data;
  document.head.appendChild(script);
};
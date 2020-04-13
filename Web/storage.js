/**
 * Storage
 * 
 * Examples:
 * storage.get('key');
 * storage.set('key', ['value']);
 * storage.clear();
 * 
 * @author jinyaoMa 2020-04-07
 * 
 */

const storage = {
  get(key) {
    let value = window.localStorage.getItem(key);
    if (value) {
      try {
        value = JSON.parse(value);
      } catch (error) {
        if (!isNaN(value)) {
          value = parseFloat(value);
        }
      }
    }
    return value;
  },
  set(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      window.localStorage.setItem(key, value);
    }
  },
  clear() {
    window.localStorage.clear();
  }
};
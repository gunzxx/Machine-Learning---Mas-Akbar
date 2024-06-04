const queryString = (obj: object) => Object.keys(obj).map(function(key) {
  return key + '=' + obj[key];
}).join('&');

export const qs = queryString; 
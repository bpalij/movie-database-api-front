export default function (base, params = {}) {
  let result;
  if (typeof (base) === 'string') {
    result = base;
    if (typeof (params) === 'object') {
      if (Object.keys(params).length) {
        result += '?';
        const entries = Object.entries(params);
        for (let i = 0; i < entries.length; i += 1) {
          if (i) { result += '&'; }
          result += `${entries[i][0]}=${entries[i][1]}`;
        }
      }
    }
  }
  console.log(result);
  return result;
}

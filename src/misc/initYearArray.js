export default function (minYear) {
  const arr = [{ value: '', text: 'any' }];
  // year-- is banned by airbnb eslint
  for (let year = (+((new Date()).getFullYear())); year >= (+minYear); year -= 1) {
    arr.push({ value: `${year}`, text: `${year}` });
  }
  return arr;
}

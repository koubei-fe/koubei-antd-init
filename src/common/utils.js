export const sillyRandomId = () => {
  const now = new Date().getTime().toString();
  return now.slice(-7) + Math.floor(Math.random() * 90 + 10);
};

export const formatTime = (timestamp) => {
  const now = new Date(timestamp);
  return now.getFullYear()
    + '-'
    + _autoPrefix(now.getMonth() + 1)
    + '-'
    + _autoPrefix(now.getDate())
    + ' '
    + _autoPrefix(now.getHours())
    + ':'
    + _autoPrefix(now.getMinutes())
    + ':'
    + _autoPrefix(now.getSeconds())
};

function _autoPrefix(num) {
  if (num < 10) {
    return '0' + num;
  }
  return num;
}

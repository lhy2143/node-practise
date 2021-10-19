// 初次触发的节流函数
function debounce(func, time) {
  let timer = null;
  let isFirst = true;
  return function (...args) {
    console.log(timer, isFirst);
    if (timer) {
      clearTimeout(timer);
    }
    if (isFirst) {
      func.call(this, ...args);
      isFirst = false;
    }
    timer = setTimeout(() => {
      func.call(this, ...args);
      isFirst = true;
    }, time);
  };
}

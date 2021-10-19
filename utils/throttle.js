function throttle(func, time) {
  let timer = null;
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(this, args);
        timer = null;
      }, timer);
    }
  };
}

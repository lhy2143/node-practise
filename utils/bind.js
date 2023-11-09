// 返回一个新函数，该函数可以new可以直接调用，所以要判断一下
Function.prototype.bind2 = function (vm, ...args) {
  let func = this;
  return function newFun(...innerArgs) {
    if (this instanceof newFun) {
      return new func(...args, ...innerArgs);
    }
    return func.apply(vm, [...args, ...innerArgs]);
  };
};

Function.prototype.callPolyfill = function(context, ...args) {
	context ||= window;
    const key = Symbol('fn');
  context[key] = this;
  const result = context[key](...args);
  delete context[key];
  return result;
}

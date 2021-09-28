// 返回对象白名单属性
function only(obj, keys) {
  obj = obj || {};
  return keys.reduce(function (ret, cur) {
    if (obj[cur] === null) return ret;
    ret[cur] = obj[cur];
    return ret;
  }, {});
}

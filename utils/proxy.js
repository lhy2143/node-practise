// API网关两个重要功能
// 请求转发 和 跨域JSONP支持

// 请求转发
var http = require('http');
var url = require('url');

var server = http.createServer(function (req, res) {
  var url_parts = url.parse(req.url);
  var opts = {
    host: req.host,
    port: 8090,
    headers: req.headers,
    path: url_parts.pathname,
    agent: false,
  };
  var creq = http.get(opts, function (cres) {
    // 浏览器请求该代理服务器也存在跨域问题,因此设置access-control-allow-origin字段
    // 代理服务器到接口服务器不受浏览器的跨域限制
    // 应用场景是：当接口服务器没有配置cros，需要前端自己来代理一次
    res.setHeader('access-control-allow-origin', '*');
    res.writeHead(cres.statusCode, cres.headers);
    // 将res放到cres流里，完成代理功能
    cres.pipe(res);
  });

  // 使得req有了新的代理请求
  req.pipe(creq);
});

server.listen(3000, function () {
  // const port = app.address().port;
  console.log('3000');
});

// 跨域jsonp支持

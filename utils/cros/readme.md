`node 服务代理`
./proxy.js 作为代理服务器
tomatoClock/server/index.js为接口服务器

`nginx代理`

`nginx`作为代理服务器，配置文件：./nginx.conf
tomatoClock/server/index.js为接口服务器

使用nginx代理的注意事项：
- 当前端配置withCredentials=true时, 后端配置Access-Control-Allow-Origin不能为*, 必须是相应地址
- 当配置withCredentials=true时, 后端需配置Access-Control-Allow-Credentials
- 当前端配置请求头时, 后端需要配置Access-Control-Allow-Headers为对应的请求头集合
- 预检请求不做jwt验证,app.use(jwt({ secret: 'shared-secret' }).unless({ method: 'OPTIONS' }));

`jwt`
tomatoClock/server/index.js为服务器


webpack 代理
webpack 配置中的 devServer/proxy,底层利用 http-proxy-middleware 来转发请求。

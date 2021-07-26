const Koa = require('koa')

const KoaRouter = require('koa-router')

const app = new Koa();

const router = new KoaRouter();

function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time * 1000));
}

app
  .use(router.routes())
  .use(router.allowedMethods())

app.use(async function(ctx, next) {
  console.log('middleware1 start', new Date().getTime());
  await sleep(1).then(next);
  console.log('middleware1 end', new Date().getTime());
})

app.use(async function(ctx, next) {
  console.log('middleware2 start', new Date().getTime());
  await sleep(1.5).then(next);
  console.log('middleware2 end', new Date().getTime());
})

router.use(function(ctx, next) {
  console.log('app.use koa start');
  next();
  console.log('app.use koa end')
})

router.get('/', (ctx, next) => {
  console.log('/');
  ctx.body = 'hello world';
});

app.listen(8888, function() {
  console.log('server start');
})
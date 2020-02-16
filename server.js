const koa = require("koa");
const next = require("next");
// 识别是处在什么状态，开发的时候不需要热加载？？？？？
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
// 处理http请求的响应
const handle = app.getRequestHandler();
// 等到pages下的页面编译完成之后再启动服务处理请求
app.prepare().then(() => {
  const server = new koa();
  server.use(async (ctx, next) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.listen(3000, () => {
    console.log("koa listen 3000");
  });
});

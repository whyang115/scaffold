const Koa = require("koa");
const app = new Koa();
const cp = require("child_process");

const readFile = require("./middleWares/readFile");

const port = 3000;

app.use(async ctx => {
  ctx.response.type = "html";
  ctx.response.body = await readFile("./index.html");
});

app.listen(port);
cp.exec(`start http://localhost:${port}`);

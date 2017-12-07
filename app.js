const Koa = require("koa");
const serve = require("koa-static");
const cp = require("child_process");
const path = require("path");

const readFile = require("./middleWares/readFile");

const app = new Koa();

app.use(serve(path.resolve(__dirname, "build")));
app.use(async ctx => {
  ctx.type = "text/html";
  const htmlFile = await readFile("./build/index.html");
  ctx.body = htmlFile;
});

app.listen(3000);
console.log("server is running 3000 port");
cp.exec(`start http://localhost:${3000}`);

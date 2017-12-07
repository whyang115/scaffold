import "../styles/index.scss";
import indexTpl from "../../views/index.hbs";
import $ from "jquery";
if (module.hot) {
  module.hot.accept(err => err && console.error("can't apply hot update"));
}
class Me {
  constructor(name) {
    this.name = name;
  }
}
var me = new Me("yang");
var proxy = new Proxy(me, function() {
  console.log("proxy");
});
proxy.name = "whyang";
console.log($);
console.log(me);
console.log(proxy);
console.log(indexTpl);
document.body.innerHTML = indexTpl(me);

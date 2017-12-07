import "../styles/index.scss";
import "../styles/main.scss";
import "../styles/index.css";
import "../styles/main.css";
import "../scripts/index.ts";
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
console.log(me);
console.log(proxy);

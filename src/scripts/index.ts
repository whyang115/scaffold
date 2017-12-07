import "../styles/ts.css";
import "../styles/ts.scss";
interface Student {
  name: string;
}

class Boy implements Student {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

const jack = new Boy("jack");

console.log(jack);

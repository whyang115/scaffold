const fs = require("fs");
module.exports = function readFile(src) {
  return new Promise((res, rej) => {
    fs.readFile(src, (err, data) => {
      if (err) {
        rej(err);
      }
      res(data);
    });
  });
};

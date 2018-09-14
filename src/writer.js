const log = require("./logger.js");

const { createWriteStream } = require("fs");

const write = function(fileName, stream) {
  return new Promise((resolve, reject) => {
    const ws = createWriteStream(`${fileName}`, {
      flags: "w",
      encoding: "utf8"
    });

    log.debug(`Writing data to file ${fileName}`);

    stream
      .on("finish", () => resolve())
      .on("error", err => reject(err))
      .pipe(ws);
  });
};

const decorate = stream => {
  return {
    write: fileName => write(fileName, stream)
  };
};

module.exports = { decorate };

const fs = require("fs");
const path = require("path");
const axios = require("axios").default;
const decompress = require("decompress");
require("dotenv").config;
const url = process.argv[2];
const urlPattern =
  /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

async function download() {
  const url =
    process.argv[2] ||
    "https://s3-us-west-2.amazonaws.com/com.guild.us-west-2.public-data/project-data/the-movies-dataset.zip";

  if (!urlPattern.test(url)) throw new Error("invalid url provided");
  const p = path.resolve(__dirname, "the-movies-dataset.zip");
  const writer = fs.createWriteStream(p);

  console.log(`downloading ${url}`);
  let response;
  try {
    response = await axios.get(url, {
      method: "get",
      responseType: "stream",
    });
  } catch {
    throw new Error(`Something went wrong downloading the file`);
  }

  if (response.status !== 200)
    throw new Error(`Something went wrong downloading the file`);

  response.data.pipe(writer);
  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
}

async function unzip() {
  decompress("./db/seed/the-movies-dataset.zip", "./db/seed").then((files) => {
    console.log("done!");
  });
}

download()
  .then(() => {
    unzip();
  })
  .catch(console.log);

const express = require("express");
const app = express();
const fs = require("fs");
const { getVideoDurationInSeconds } = require('get-video-duration')
const ufs = require("url-file-size");
const got = require("got");
const https = require('https');
const stream = require("stream");
const { promisify } = require("util");
const pipeline = promisify(stream.pipeline);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/video", function (req, res) {
  // Ensure there is a range given for the video
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }

  // get video stats (about 61MB)
  const videoPath = "https://gateway.ap1.storjshare.io/palsncity/video%3Aa69f992995944c6630e9cfb6a3ccac5c.MOV?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=jufzazdfdaathvx7hwa5wf6iewga%2F20220715%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220715T163526Z&X-Amz-Expires=604800&X-Amz-Signature=848ffeb874eb628f15c8dc08d7280b9c70c6b4c810d876f124b4fa0e34c7581c&X-Amz-SignedHeaders=host";
  // const url = new URL(videoPath);
  // let videoSize;
  // ufs(videoPath)
  //   .then(data => {
  //     videoSize = data
  //   }) // 1416
  //   .catch(error => console.error('error', error));
  //   console.log('::', videoSize)
  // const videoSize = fs.statSync(videoPath).size;



  // Parse Range
  // Example: "bytes=32324-"
  // const CHUNK_SIZE = 10 ** 6; // 1MB
  // const start = Number(range.replace(/\D/g, ""));
  // const end = Math.min(Number(start + CHUNK_SIZE, videoSize - 1));

  // Create headers
  // const contentLength = end - start + 1;
  // const headers = {
  //   "Content-Range": `bytes ${start}-${end}/${videoSize}`,
  //   "Accept-Ranges": "bytes",
  //   "Content-Length": contentLength,
  //   "Content-Type": "video/mp4",
  // };

  // HTTP Status 206 for Partial Content
  // res.writeHead(206, headers);

  // create video read stream for this particular chunk
  // const videoStream = fs.createReadStream(videoPath, { start, end });
  got.stream(videoPath).pipe(res);
//   https.get(videoPath, (stream) => {
//     stream.pipe(res);
// });

  // Stream the video chunk to the client
  // videoStream.pipe(res);


  // *********
  // const fileName = "video.mp4";
  // const downloadStream = got.stream(videoPath);
  // const fileWriterStream = fs.createWriteStream(fileName);
  
  // downloadStream.on("downloadProgress", ({ transferred, total, percent }) => {
  //   const percentage = Math.round(percent * 100);
  //   console.error(`progress: ${transferred}/${total} (${percentage}%)`);
  // });
  
  // pipeline(downloadStream, fileWriterStream)
  //   .then(() => console.log(`File downloaded to ${fileName}`))
  //   .catch((error) => console.error(`Something went wrong. ${error.message}`));
});

app.listen(8000, function () {
  console.log("Listening on port 8000!");
});

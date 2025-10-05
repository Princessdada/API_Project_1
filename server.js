const http = require("http");
const fs = require("fs");
const path = require("path");
const PORT = 3000;
// define server
const server = http.createServer((req, res) => {
  let filePath;

  if (req.url === "/" || req.url === "/index.html") {
    filePath = path.join(__dirname, "index.html");
  } else {
    filePath = path.join(__dirname, "404.html");
  }

  //read file
  fs.readFile(filePath, "utf-8", (err, studentPage) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/html" });
      return res.end("<h1>500 - Internal Server Error</h1>");
    } else {
      res.writeHead(path.basename(filePath) === "404.html" ? 404 : 200, {
        "Content-Type": "text/html",
      });
      res.end(studentPage, "utf-8");
    }
  });
});

// listen on port
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

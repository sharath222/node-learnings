const fs = require("fs");

const requesthandler = (request, response) => {
  const url = request.url;
  const method = request.method;
  if (url === "/") {
    response.write("<html>");
    response.write("<head><title>Enter Message</title></head>");
    response.write(
      '<body><form action="/message" method="POST"><input name="message" type="text" style="margin-right:20px;"><button type="submit">Send</button></form></body>'
    );
    response.write("<html>");
    return response.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    request.on("data", (chunk) => {
      body.push(chunk);
    });
    return request.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        response.statusCode = 302;
        response.setHeader("Location", "/");
        return response.end();
      });
    });
  }
  response.setHeader("content-type", "text/html");
  response.write("<html>");
  response.write("<body><h1>Yoo</h1></body>");
  response.write("<html>");
  response.end();
};

module.exports = {
    handler: requesthandler,
};

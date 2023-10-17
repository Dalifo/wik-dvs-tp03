import { createServer, IncomingMessage, ServerResponse } from "http";
import os from "os";

const requestListener = function (req: IncomingMessage, res: ServerResponse) {
  try {
    if (req.method === "GET" && req.url === "/ping") {
      res.setHeader("Content-Type", "application/json");

      const hostname = os.hostname();

      const response = { hostname, headers: req.headers };
      res.write(JSON.stringify(response));
      res.end();

      console.log(`Hostname: ${hostname}`);
    } else {
      res.statusCode = 404;
      res.end();
    }
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end();
  }
};

try {
  const server = createServer(requestListener);
  server.listen(process.env.PING_LISTEN_PORT ?? 8080);
  const serverAddressInfo = server.address();
  if (!serverAddressInfo) {
    throw new Error("No server address info");
  }
  if (typeof serverAddressInfo === 'string') {
    console.log(`Server listening : ${serverAddressInfo}`);
  } else {
    console.log(`Server listening : ${serverAddressInfo.address}:${serverAddressInfo.port}`);
  }
} catch (err) {
  console.error(err);
  process.exit(1);
}

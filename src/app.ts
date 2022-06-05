import { createServer } from "http";
import { requestHandler } from "./routes";

const server = createServer(requestHandler);

server.listen(3000);
import cors from "cors";
import express, { Express } from "express";
import pixRoutes from "./routes/pix";

let server: Express = express();

server.use(cors());

server.use(express.json());

server.use(pixRoutes);

export default {
  start() {
    server.listen(3000, () => {
      console.log(`Server started on port 3000`);
    });
  },
};

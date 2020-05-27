import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as cors from "cors";
import * as colors from "colors";
import routes from "./routes";
import { RequestInfo } from "./middlewares/RequestInfo";

createConnection().then(() => {
  console.log(colors.blue("TypeORM: Database Connected!\n"));
}).catch(error => {
  console.log(colors.red("TypeORM: " + error));
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use("/", RequestInfo, routes);

const server = app.listen('3001', () => {
  console.log(colors.green("Listening on port 3001"));
});

export default server;
import { Application } from "express";
import express from "express";
import cors from "cors";
import { appRoutes } from "./routes";
import dotnv from "dotenv";
import { wLogger } from "./middleware/wiston-logger";

dotnv.config();

function helperMiddleware(app: Application) {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(wLogger);
  app.use(appRoutes.routes());
}

function start() {
  try {
    const port = process.env.PORT;
    const app = express();
    helperMiddleware(app);
    // connect database

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();

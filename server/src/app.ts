import express, { Request, Response } from "express";

import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";

import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

import { ApiRoutes } from "./routes";
import { options } from "./utils/swagger/swagger.options";
import { logger } from "./utils/logging/winston/winston.logger";

export class Server {
  private specs = swaggerJsDoc(options);

  public static bootstrap(): Server {
    return new Server();
  }

  public app: express.Application;

  constructor() {
    // Create express.js application
    this.app = express();

    // configure application
    this.config();

    // add routes
    this.routes();
  }

  public config() {
    // mount logger
    this.app.use(
      // ':method :url :status :res[content-length] - :response-time ms',
      morgan("tiny", {
        stream: {
          write: (message: string) => logger.info(message.trim()),
        },
      })
    );

    // mount json form parser
    this.app.use(express.json());

    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(compression());

    // catch 404 and forward to error handler
    this.app.use(
      (
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        err.status = 404;
        next(err);
      }
    );
  }

  private routes() {
    this.app.get("/", (req: Request, res: Response) => {
      res.redirect("/docs");
    });
    // Configure Swagger Route
    this.app.use("/docs", swaggerUI.serve, swaggerUI.setup(this.specs));

    // use router middleware
    this.app.use(ApiRoutes.path, ApiRoutes.router);
  }
}

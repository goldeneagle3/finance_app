import dotenv from "dotenv";

import { Server } from "./app";
import { connectToDb } from "./database";
import { logger } from "@utils/logging/winston/winston.logger";
import { InfoMessages } from "./core/utils/messages/info.messages";

dotenv.config();

export const app = Server.bootstrap().app;

export const server = async () => {
  try {
    await connectToDb;
    logger.info(InfoMessages.mongoConnection);
    app.listen(8000, () =>
      logger.info(InfoMessages.startServer(process.env.PORT))
    );
  } catch (error) {
    logger.error(error.message);
  }
};

server();

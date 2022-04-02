import { Request, Response } from "express";
import { authManager } from "../business/auth.manager";
import { logger } from "../utils/logging/winston/winston.logger";

export class AuthController {
  async signin(req: Request, res: Response) {
    try {
      const result = await authManager.signin(req.body);
      res.cookie("jwt", result.auth_token, {
        httpOnly: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({ auth_token: result.auth_token });
    } catch (error) {
      logger.error(error);
      return res
        .status(error?.statusCode ? error.statusCode : 500)
        .json({ message: error.message });
    }
  }
}

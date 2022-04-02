import { Request, Response } from "express";
import { userManager } from "../business/user.manager";
import { logger } from "../utils/logging/winston/winston.logger";
import { Validation } from "../utils/validation/validation.utils";

export class UserController {
  async create(req: Request, res: Response) {
    try {
      Validation.passwordValidation(req.body.password);
      const data = await userManager.create(req.body);
      return res.status(201).json(data);
    } catch (error) {
      logger.error(error);
      return res
        .status(error?.statusCode ? error.statusCode : 500)
        .json({ message: error.message });
    }
  }

  async list(_, res: Response) {
    try {
      const datas = await userManager.list();
      return res.status(200).json(datas);
    } catch (error) {
      logger.error(error);
      return res
        .status(error?.statusCode ? error.statusCode : 500)
        .json({ message: error.message });
    }
  }

  async read(_, res: Response) {
    try {
      const result = await userManager.read(res.locals.user.id);
      return res.status(200).json(result);
    } catch (error) {
      logger.error(error);
      return res
        .status(error?.statusCode ? error.statusCode : 500)
        .json({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const result = await userManager.update(req.body, res.locals.user.id);
      return res.status(200).json(result);
    } catch (error) {
      return res
        .status(error?.statusCode ? error.statusCode : 500)
        .json({ message: error.message });
    }
  }

  async remove(_, res: Response) {
    try {
      const result = await userManager.remove(res.locals.user.id);
      return res.status(200).json({ message: result });
    } catch (error) {
      logger.error(error);
      return res
        .status(error?.statusCode ? error.statusCode : 500)
        .json({ message: error.message });
    }
  }
}

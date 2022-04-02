import { NextFunction, Response } from "express";

import { AuthorizationErrors } from "@core/error/Authorization.error";

export class IsOwner {
  static isUser(_, res: Response, next: NextFunction) {
    try {
      const isMatch: boolean =
        res.locals?.user?._id?.toString() === res.locals.auth?.id;
      if (!isMatch) throw new AuthorizationErrors();
      next();
    } catch (error) {
      return res
        .status(error?.statusCode ? error.statusCode : 403)
        .json({ message: error.message });
    }
  }

  static isExpenser(_, res: Response, next: NextFunction) {
    try {
      const isMatch: boolean =
        res.locals?.expense?.recorded_by?.toString() === res.locals.auth?.id;
      if (!isMatch) throw new AuthorizationErrors();
      next();
    } catch (error) {
      return res
        .status(error?.statusCode ? error.statusCode : 403)
        .json({ message: error.message });
    }
  }
}

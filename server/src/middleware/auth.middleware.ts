import { NextFunction, Request, Response } from "express";

import { JWTUtils } from "@utils/encryption/jwt.utils";
import { AuthorizationErrors } from "@core/error/Authorization.error";

export const requireSignin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    throw new AuthorizationErrors();
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = JWTUtils.verify(token, process.env.TOKEN);

    if (!decoded) {
      throw new AuthorizationErrors();
    }
    res.locals.auth = decoded;
    next();
  } catch (error) {
    return res
      .status(error?.statusCode ? error.statusCode : 500)
      .json({ message: error.message });
  }
};

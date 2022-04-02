import { NextFunction, Response } from "express";

import { userManager } from "@business/user.manager";
import { expenseManager } from "@business/expense.manager";

import { BadRequest } from "@core/error/BadRequest.error";
import { ErrorMessages } from "@core/utils/messages/error.messages";

export class Params {
  static async expenseByID(_, res: Response, next: NextFunction, id) {
    try {
      let expense = await expenseManager.read(id);
      if (!expense) throw new BadRequest(ErrorMessages.paramIdError("Expense"));
      res.locals.expense = expense;
      next();
    } catch (error) {
      return res
        .status(404)
        .json({ message: ErrorMessages.paramIdError("Expense") });
    }
  }

  static async userByID(_, res: Response, next: NextFunction, id) {
    try {
      let user = await userManager.read(id);
      if (!user) throw new BadRequest(ErrorMessages.paramIdError("User"));
      res.locals.user = user;
      next();
    } catch (error) {
      return res
        .status(404)
        .json({ message: ErrorMessages.paramIdError("User") });
    }
  }
}

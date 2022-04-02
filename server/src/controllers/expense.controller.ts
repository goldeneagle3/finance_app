import { Request, Response } from "express";
import { expenseManager } from "../business/expense.manager";
import { logger } from "../utils/logging/winston/winston.logger";

export class ExpenseController {
  async create(req: Request, res: Response) {
    try {
      const data = await expenseManager.create({
        ...req.body,
        recorded_by: res.locals.auth.id,
      });
      return res.status(201).json(data);
    } catch (error) {
      logger.error(error);
      return res
        .status(error?.statusCode ? error.statusCode : 500)
        .json({ message: error.message });
    }
  }

  async listByUser(req: Request, res: Response) {
    try {
      // TEST DATA
      // let date = new Date();
      // let yes = date.setDate(date.getDate() - 1);
      // let tom = date.setDate(date.getDate() + 1);
      let data = {
        firstDay: req.body.firstDay,
        lastDay: req.body.lastDay,
      };
      const datas = await expenseManager.listByUser(data, res.locals.auth.id);
      return res.status(200).json(datas);
    } catch (error) {
      logger.error(error);
      return res
        .status(error?.statusCode ? error.statusCode : 500)
        .json({ message: error.message });
    }
  }

  async currentMonthPreview(req: Request, res: Response) {
    try {
      const expensePreview = await expenseManager.currentMonthly(
        res.locals.auth.id
      );
      return res.status(200).json(expensePreview);
    } catch (error) {
      logger.error(error);
      return res
        .status(error?.statusCode ? error.statusCode : 500)
        .json({ message: error.message });
    }
  }

  async expenseByCategory(req: Request, res: Response) {
    try {
      const categoryMonthlyAvg = await expenseManager.expenseByCategory(
        res.locals.auth.id
      );
      return res.status(200).json(categoryMonthlyAvg);
    } catch (error) {
      logger.error(error);
      return res
        .status(error?.statusCode ? error.statusCode : 500)
        .json({ message: error.message });
    }
  }

  async plotExpenses(req: Request, res: Response) {
    try {
      const categoryMonthlyAvg = await expenseManager.plotExpenses(
        req.query.month,
        res.locals.auth.id
      );
      return res.status(200).json(categoryMonthlyAvg);
    } catch (error) {
      logger.error(error);
      return res
        .status(error?.statusCode ? error.statusCode : 500)
        .json({ message: error.message });
    }
  }

  async averageCategories(req: Request, res: Response) {
    try {
      const categoryMonthlyAvg = await expenseManager.averageCategories(
        { firstDay: req.query.firstDay, lastDay: req.query.lastDay },
        res.locals.auth.id
      );
      return res.status(200).json(categoryMonthlyAvg);
    } catch (error) {
      logger.error(error);
      return res
        .status(error?.statusCode ? error.statusCode : 500)
        .json({ message: error.message });
    }
  }

  async yearlyExpenses(req: Request, res: Response) {
    try {
      const categoryMonthlyAvg = await expenseManager.yearlyExpenses(
        req.query.year,
        res.locals.auth.id
      );
      return res.status(200).json(categoryMonthlyAvg);
    } catch (error) {
      logger.error(error);
      return res
        .status(error?.statusCode ? error.statusCode : 500)
        .json({ message: error.message });
    }
  }

  async read(_, res: Response) {
    return res.status(200).json(res.locals.expense);
  }

  async update(req: Request, res: Response) {
    try {
      const result = await expenseManager.update(
        { ...req.body, updated: Date.now() },
        res.locals.user.id
      );
      return res.status(200).json(result);
    } catch (error) {
      return res
        .status(error?.statusCode ? error.statusCode : 500)
        .json({ message: error.message });
    }
  }

  async remove(_, res: Response) {
    try {
      const result = await expenseManager.remove(res.locals.user.id);
      return res.status(200).json({ message: result });
    } catch (error) {
      logger.error(error);
      return res
        .status(error?.statusCode ? error.statusCode : 500)
        .json({ message: error.message });
    }
  }
}

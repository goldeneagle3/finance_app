import { Router } from "express";

import { logger } from "@utils/logging/winston/winston.logger";
import { ExpenseController } from "@controllers/expense.controller";
import { Params } from "@middleware/param.middleware";
import { requireSignin } from "@middleware/auth.middleware";
import { IsOwner } from "@middleware/owner.middleware";

export class ExpenseRoute {
  public static path = "/expenses";
  private static instance: ExpenseRoute;
  private expenceCtrl = new ExpenseController();
  private router = Router();

  private constructor() {
    logger.info("[ExpenseRoute] Creating expenses route.");

    this.router.param("userId", Params.userByID);
    this.router.param("expenseId", Params.userByID);

    this.router.post("/", this.create);
    this.router.get("/", this.listByUser);
    this.router.get("/current/preview", this.currentMonthPreview);
    this.router.get("/by/category", this.expenseByCategory);
    this.router.get("/plot", this.plotExpenses);
    this.router.get("/category/averages", this.averageCategories);
    this.router.get("/yearly", this.yearlyExpenses);
    // this.router.get("/:expenseId", requireSignin, this.read);
    this.router.patch(
      "/:expenseId",
      requireSignin,
      IsOwner.isExpenser,
      this.update
    );
    this.router.delete(
      "/:expenseId",
      requireSignin,
      IsOwner.isExpenser,
      this.remove
    );
  }

  static get router() {
    if (!ExpenseRoute.instance) {
      ExpenseRoute.instance = new ExpenseRoute();
    }
    return ExpenseRoute.instance.router;
  }

  private create = this.expenceCtrl.create;
  private listByUser = this.expenceCtrl.listByUser;
  private currentMonthPreview = this.expenceCtrl.currentMonthPreview;
  private expenseByCategory = this.expenceCtrl.expenseByCategory;
  private plotExpenses = this.expenceCtrl.plotExpenses;
  private averageCategories = this.expenceCtrl.averageCategories;
  private yearlyExpenses = this.expenceCtrl.yearlyExpenses;
  // private read = this.expenceCtrl.read;
  private update = this.expenceCtrl.update;
  private remove = this.expenceCtrl.remove;
}

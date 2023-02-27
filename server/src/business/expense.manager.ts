import { Request } from "express";

import { ExpenseDao } from "@dal/expense.dao";
import { IManager } from "./interface.manager";

class ExpenseManager implements IManager {
  private expenseDao = new ExpenseDao();

  async create(body) {
    return this.expenseDao.create(body);
  }

  listByUser(data, param: string) {
    return this.expenseDao.listByUser(data, param);
  }

  currentMonthly(param: string) {
    const date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth();
    const firstDay = new Date(y, m, 1);
    const lastDay = new Date(y, m + 1, 0);

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const tomorrow = new Date();
    tomorrow.setUTCHours(0, 0, 0, 0);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const yesterday = new Date();
    yesterday.setUTCHours(0, 0, 0, 0);
    yesterday.setDate(yesterday.getDate() - 1);

    let data = {
      firstDay,
      lastDay,
      today,
      tomorrow,
      yesterday,
    };

    return this.expenseDao.currentMonthly(data, param);
  }

  expenseByCategory(param: string) {
    const date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth();
    const firstDay = new Date(y, m, 1);
    const lastDay = new Date(y, m + 1, 0);

    let data = {
      firstDay,
      lastDay,
    };

    return this.expenseDao.expenseByCategory(data, param);
  }

  plotExpenses(month: string | any, param: string) {
    const date = new Date(month),
      y = date.getFullYear(),
      m = date.getMonth();
    const firstDay = new Date(y, m, 1);
    const lastDay = new Date(y, m + 1, 0);

    let data = {
      firstDay,
      lastDay,
    };

    return this.expenseDao.plotExpenses(data, param);
  }

  async averageCategories(data, param) {
    return this.expenseDao.averageCategories(data, param);
  }

  async yearlyExpenses(query, param) {
    const firstDay = new Date(query, 0, 1);
    const lastDay = new Date(query, 12, 0);
    return this.expenseDao.yearlyExpenses({ firstDay, lastDay }, param);
  }

  read(param: string) {
    return this.expenseDao.read(param);
  }

  update(body: Request<Body>, param: string) {
    return this.expenseDao.update(body, param);
  }

  remove(param: string) {
    return this.expenseDao.remove(param);
  }
}

export const expenseManager = new ExpenseManager();

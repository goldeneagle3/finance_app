import { Types } from "mongoose";

import { DaoBaseRepository } from "@core/dao/mongoose/DaoBaseRepo";
import { Expense } from "@entity/expense.model";

export type Days = {
  firstDay: Date;
  lastDay: Date;
  today?: Date;
  yesterday?: Date;
  tomorrow?: Date;
};

export class ExpenseDao extends DaoBaseRepository {
  constructor() {
    super(Expense);
  }

  async read(param) {
    let expense = await Expense.findById(param)
      .populate("recorded_by", "_id username")
      .exec();
    return expense;
  }

  async listByUser(data: Days, param: string) {
    let expenses = await Expense.find({
      $and: [
        { incurred_on: { $gte: data.firstDay, $lte: data.lastDay } },
        { recorded_by: param },
      ],
    })
      .sort("incurred_on")
      .populate("recorded_by", "_id username");
    return expenses;
  }

  async currentMonthly(data: Days, param: string) {
    let currentPreview = await Expense.aggregate([
      {
        $facet: {
          month: [
            {
              $match: {
                incurred_on: { $gte: data.firstDay, $lt: data.lastDay },
                recorded_by: new Types.ObjectId(param),
              },
            },
            {
              $group: { _id: "currentMonth", totalSpent: { $sum: "$amount" } },
            },
          ],
          today: [
            {
              $match: {
                incurred_on: { $gte: data.today, $lt: data.tomorrow },
                recorded_by: new Types.ObjectId(param),
              },
            },
            { $group: { _id: "today", totalSpent: { $sum: "$amount" } } },
          ],
          yesterday: [
            {
              $match: {
                incurred_on: { $gte: data.yesterday, $lt: data.today },
                recorded_by: new Types.ObjectId(param),
              },
            },
            { $group: { _id: "yesterday", totalSpent: { $sum: "$amount" } } },
          ],
        },
      },
    ]);
    let expensePreview = {
      month: currentPreview[0].month[0],
      today: currentPreview[0].today[0],
      yesterday: currentPreview[0].yesterday[0],
    };

    return expensePreview;
  }

  async expenseByCategory(data: Days, param) {
    let categoryMonthlyAvg = await Expense.aggregate([
      {
        $facet: {
          average: [
            { $match: { recorded_by: new Types.ObjectId(param) } },
            {
              $group: {
                _id: {
                  category: "$category",
                  month: { $month: "$incurred_on" },
                },
                totalSpent: { $sum: "$amount" },
              },
            },
            {
              $group: {
                _id: "$_id.category",
                avgSpent: { $avg: "$totalSpent" },
              },
            },
            {
              $project: {
                _id: "$_id",
                value: { average: "$avgSpent" },
              },
            },
          ],
          total: [
            {
              $match: {
                incurred_on: { $gte: data.firstDay, $lte: data.lastDay },
                recorded_by: new Types.ObjectId(param),
              },
            },
            { $group: { _id: "$category", totalSpent: { $sum: "$amount" } } },
            {
              $project: {
                _id: "$_id",
                value: { total: "$totalSpent" },
              },
            },
          ],
        },
      },
      {
        $project: {
          overview: { $setUnion: ["$average", "$total"] },
        },
      },
      { $unwind: "$overview" },
      { $replaceRoot: { newRoot: "$overview" } },
      { $group: { _id: "$_id", mergedValues: { $mergeObjects: "$value" } } },
    ]).exec();

    return categoryMonthlyAvg;
  }

  async plotExpenses(data: Days, param) {
    let totalMonthly = await Expense.aggregate([
      {
        $match: {
          incurred_on: { $gte: data.firstDay, $lt: data.lastDay },
          recorded_by: new Types.ObjectId(param),
        },
      },
      { $project: { x: { $dayOfMonth: "$incurred_on" }, y: "$amount" } },
    ]).exec();

    return totalMonthly;
  }

  async averageCategories(data: Days, param) {
    let categoryMonthlyAvg = await Expense.aggregate([
      {
        $match: {
          incurred_on: { $gte: data.firstDay, $lte: data.lastDay },
          recorded_by: new Types.ObjectId(param),
        },
      },
      {
        $group: {
          _id: { category: "$category" },
          totalSpent: { $sum: "$amount" },
        },
      },
      { $group: { _id: "$_id.category", avgSpent: { $avg: "$totalSpent" } } },
      { $project: { x: "$_id", y: "$avgSpent" } },
    ]).exec();
    return { monthAVG: categoryMonthlyAvg };
  }

  async yearlyExpenses(data: Days, param) {
    let totalMonthly = await Expense.aggregate([
      {
        $match: {
          incurred_on: { $gte: data.firstDay, $lt: data.lastDay },
          recorded_by: new Types.ObjectId(param),
        },
      },
      {
        $group: {
          _id: { $month: "$incurred_on" },
          totalSpent: { $sum: "$amount" },
        },
      },
      { $project: { x: "$_id", y: "$totalSpent" } },
    ]).exec();

    return { monthTot: totalMonthly };
  }
}

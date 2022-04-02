import { Schema, model } from "mongoose";

import { IExpense } from "@entity/interfaces/expense.interface";

const ExpenseSchema = new Schema<IExpense>({
  title: {
    type: String,
    trim: true,
    required: [true, "Title is required"],
  },
  category: {
    type: String,
    trim: true,
    required: [true, "Category is required"],
  },
  amount: {
    type: Number,
    min: 0,
    required: [true, "Amount is required"],
  },
  incurred_on: {
    type: Date,
    default: Date.now,
  },
  notes: {
    type: String,
    trim: true,
  },
  recorded_by: { type: Schema.Types.ObjectId, ref: "User" },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

const Expense = model<IExpense>("Expense", ExpenseSchema);

export { Expense };

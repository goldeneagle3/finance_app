import { Schema } from "mongoose";

export interface IExpense {
  title: string;
  category: string;
  amount: number;
  incurred_on: Date;
  updated: Date;
  created: Date;
  notes: string;
  recorded_by: Schema.Types.ObjectId;
}

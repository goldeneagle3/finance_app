import { Schema, model } from "mongoose";
import { IUser } from "./interfaces/user.interface";

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
      required: true,
    },
    password: {
      type: String,
      minlength: 8,
      required: true,
    },
  },
  { timestamps: true }
);

const User = model<IUser>("User", userSchema);

export { User };

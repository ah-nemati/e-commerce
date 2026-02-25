
import mongoose, { Document, Model } from "mongoose";

const Schema = mongoose.Schema;

export interface IUser extends Document {
  email: string;
  password?: string;
  role: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User: Model<IUser> = mongoose.models.user || mongoose.model<IUser>("user", userSchema);

export default User;

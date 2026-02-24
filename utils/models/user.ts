import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSechma = new Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: Boolean,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.models.user || mongoose.model("user", userSechma);

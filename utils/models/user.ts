export interface IUser extends Document {
  email: string;
  password?: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

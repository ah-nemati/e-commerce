import { NextApiRequest, NextApiResponse } from "next";
import users from "../../utils/models/users";
import ConnectDB from "../../utils/mongodb";

ConnectDB();

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ status: "error", error: "Please enter all fields" });
  }

  const user = await users.findOne({ email });

  if (user && user.password === password) {
    return res.status(200).json({ status: "success", data: user });
  } else {
    return res.status(401).json({ status: "error", error: "email or password is not correct" });
  }
}

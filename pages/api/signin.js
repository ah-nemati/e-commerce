import bcrypt from "bcrypt";
import { readDB } from "../../utils/db";

export default async function signin(req, res) {
  try {
    const { email, password } = req.body;

    const users = await readDB("users.json");

    const findUser = users.find((user) => user.email === email);

    if (!findUser) {
      return res.json({ status: "error" });
    }

    const isCorrectPassword = await bcrypt.compare(password, findUser.password);

    if (!isCorrectPassword) {
      return res.json({ status: "error" });
    }

    const { password: _, ...safeUser } = findUser;

    return res.status(200).json(safeUser);
  } catch (error) {
    return res.status(500).json({ status: "error" });
  }
}

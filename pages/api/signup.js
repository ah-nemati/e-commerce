import bcrypt from "bcrypt";
import { readDB, writeDB } from "../../utils/db";

export default async function signup(req, res) {
  try {
    const { email, password } = req.body;

    const users = await readDB("users.json");

    const findUser = users.find((user) => user.email === email);

    if (findUser) {
      return res.json({ error: "user exists!" });
    }

    const newUser = {
      id: Date.now(),
      email,
      password: await bcrypt.hash(password, 12),
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    users.push(newUser);

    await writeDB("users.json", users);

    return res.json({ success: "signed up!" });
  } catch (error) {
    return res.status(500).json({ status: "error" });
  }
}

import fs from "fs/promises";
import path from "path";

export const readDB = async (fileName: string) => {
  const filePath = path.join(process.cwd(), "data", fileName);
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
};

export const writeDB = async (fileName: string, data: object) => {
  const filePath = path.join(process.cwd(), "data", fileName);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};

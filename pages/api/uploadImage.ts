import { NextApiRequest, NextApiResponse } from "next";
import formidable, { File } from "formidable";
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";

// ✅ Disable Next.js default body parser for multipart/form-data
export const config = {
  api: { bodyParser: false },
};

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  // Create upload dir if it doesn't exist
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }

  const form = formidable({
    uploadDir: UPLOAD_DIR,
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024, // 5MB
    filter: ({ mimetype }) => !!mimetype?.startsWith("image/"),
    filename: (_name, ext) => `${randomUUID()}${ext}`,
  });

  try {
    const [, files] = await form.parse(req);
    const uploaded = files.image?.[0] as File | undefined;

    if (!uploaded) {
      return res
        .status(400)
        .json({ success: false, message: "فایل تصویر ارسال نشده است" });
    }

    // Return the public URL path
    const fileName = path.basename(uploaded.filepath);
    const publicPath = `/uploads/${fileName}`;

    return res.status(200).json({ success: true, url: publicPath });
  } catch (error: any) {
    console.error("Upload error:", error);
    return res.status(500).json({
      success: false,
      message: error.message?.includes("maxFileSize")
        ? "حجم فایل بیشتر از ۵ مگابایت است"
        : "خطا در آپلود تصویر",
    });
  }
}

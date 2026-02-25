// lib/db.ts   یا   utils/connectDB.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('متغیر محیطی MONGODB_URI تعریف نشده است');
}

// Cache اتصال (برای جلوگیری از اتصال‌های تکراری در hot-reload و serverless)
let cachedConnection: typeof mongoose | null = null;

const connectDB = async (): Promise<typeof mongoose> => {
  // اگر قبلاً وصل بودیم → همان اتصال رو برگردون
  if (cachedConnection?.connection.readyState === 1) {
    console.log('→ قبلاً به MongoDB وصل بودیم');
    return cachedConnection;
  }

  try {
    // تنظیمات پیشنهادی جدید (بدون گزینه‌های منسوخ)
    const conn = await mongoose.connect(MONGODB_URI, {
      // این گزینه‌ها هنوز گاهی مفیدند (اختیاری):
      // serverSelectionTimeoutMS: 5000,   // حداکثر ۵ ثانیه صبر برای پیدا کردن سرور
      // socketTimeoutMS: 45000,           // اگر ۴۵ ثانیه جوابی نیومد قطع کن
      // family: 4,                        // اگر ipv6 مشکل داشت → فقط ipv4
    });

    cachedConnection = conn;

    console.log(`→ MongoDB Atlas متصل شد | Host: ${conn.connection.host}`);

    // اگر خواستید وقتی قطع شد دوباره وصل بشه (توصیه می‌شود)
    conn.connection.on('disconnected', () => {
      console.warn('→ اتصال به MongoDB قطع شد ... تلاش مجدد');
      connectDB(); // تلاش دوباره
    });

    return conn;
  } catch (error) {
    console.error('× خطا در اتصال به MongoDB:', error);
    throw error; // یا می‌تونی retry logic بذاری
  }
};

export default connectDB;
// 把参考模板视频上传到 Supabase 公开桶，并打印可直接用作
// BULIN47_TEMPLATE_VIDEO_URL 的公开地址。
//
// 用法：
//   npm run upload-template -- "D:\path\to\template.mp4"
//   npm run upload-template -- "D:\path\to\template.mp4" bulin47-main.mp4
//
// 需要的环境变量（可以放在 .env.local，脚本会自动读取）：
//   NEXT_PUBLIC_SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY
// 可选：
//   TEMPLATE_BUCKET（默认 templates）

import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { basename, resolve } from "node:path";
import { createClient } from "@supabase/supabase-js";

// Node 20.12+ 可以直接读 .env.local，与本地开发保持一致。
try {
  process.loadEnvFile(".env.local");
} catch {
  // 没有 .env.local 也没关系，用外部注入的环境变量即可。
}

const input = process.argv[2];
if (!input) {
  console.error('用法: npm run upload-template -- "<视频路径>" [对象名]');
  process.exit(1);
}

const filePath = resolve(input);
if (!existsSync(filePath)) {
  console.error(`找不到文件: ${filePath}`);
  process.exit(1);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "缺少 NEXT_PUBLIC_SUPABASE_URL 或 SUPABASE_SERVICE_ROLE_KEY（检查 .env.local 或环境变量）。",
  );
  process.exit(1);
}

const bucket = process.env.TEMPLATE_BUCKET || "templates";
const objectName = process.argv[3] || basename(filePath);
const contentType = objectName.toLowerCase().endsWith(".mov")
  ? "video/quicktime"
  : "video/mp4";

const file = await readFile(filePath);
const sizeMb = (file.byteLength / 1024 / 1024).toFixed(1);
console.log(`上传 ${objectName} (${sizeMb} MB) 到桶 "${bucket}" ...`);

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const { error } = await supabase.storage.from(bucket).upload(objectName, file, {
  contentType,
  upsert: true,
});

if (error) {
  console.error("上传失败:", error.message);
  console.error(
    "如果提示桶不存在，先在 Supabase 里建一个公开桶，或执行 supabase/migrations/0002_public_template_bucket.sql。",
  );
  process.exit(1);
}

const { data } = supabase.storage.from(bucket).getPublicUrl(objectName);
console.log("");
console.log("上传成功。公开地址：");
console.log(data.publicUrl);
console.log("");
console.log(
  "下一步：把这个地址填到 Vercel 环境变量 BULIN47_TEMPLATE_VIDEO_URL，然后重新部署。",
);

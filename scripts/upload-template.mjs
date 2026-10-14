// 把参考模板视频上传到 Supabase 公开桶，并打印可直接用作
// BULIN47_TEMPLATE_VIDEO_URL / BULIN47_TEMPLATE_VIDEO_URLS 的公开地址。
//
// 用法：
//   npm run upload-template -- "D:\桌面\bulin47-templates-5s"
//   npm run upload-template -- "D:\a.mp4" "D:\b.mp4"
//
// 传目录时会自动上传目录下所有 .mp4 / .mov。
//
// 需要的环境变量（可以放在 .env.local，脚本会自动读取）：
//   NEXT_PUBLIC_SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY
// 可选：
//   TEMPLATE_BUCKET（默认 video）

import { existsSync, readdirSync, statSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { basename, join, resolve } from "node:path";
import { createClient } from "@supabase/supabase-js";

const MAX_FILE_BYTES = 200 * 1024 * 1024;

// Node 20.12+ 可以直接读 .env.local，与本地开发保持一致。
try {
  process.loadEnvFile(".env.local");
} catch {
  // 没有 .env.local 也没关系，用外部注入的环境变量即可。
}

const args = process.argv.slice(2);
if (!args.length) {
  console.error(
    '用法: npm run upload-template -- "<文件夹或视频路径>" ["<另一个视频>"]',
  );
  process.exit(1);
}

const files = [];
for (const arg of args) {
  const path = resolve(arg);
  if (!existsSync(path)) {
    console.error(`找不到路径: ${path}`);
    process.exit(1);
  }
  if (statSync(path).isDirectory()) {
    for (const entry of readdirSync(path).sort()) {
      if (/\.(mp4|mov)$/i.test(entry)) files.push(join(path, entry));
    }
  } else {
    files.push(path);
  }
}

if (!files.length) {
  console.error("没有找到可上传的 .mp4 / .mov 文件。");
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

const bucket = process.env.TEMPLATE_BUCKET || "video";
const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const uploaded = [];

for (const filePath of files) {
  const objectName = basename(filePath);
  const contentType = objectName.toLowerCase().endsWith(".mov")
    ? "video/quicktime"
    : "video/mp4";
  const file = await readFile(filePath);

  if (file.byteLength > MAX_FILE_BYTES) {
    console.error(
      `跳过 ${objectName}：${(file.byteLength / 1024 / 1024).toFixed(1)}MB 超过 200MB 上限。`,
    );
    continue;
  }

  const sizeMb = (file.byteLength / 1024 / 1024).toFixed(2);
  process.stdout.write(`上传 ${objectName} (${sizeMb}MB) ... `);

  const { error } = await supabase.storage
    .from(bucket)
    .upload(objectName, file, { contentType, upsert: true });

  if (error) {
    console.log("失败");
    console.error(`  ${error.message}`);
    console.error(
      `  如果提示桶不存在，先在 Supabase 建一个名为 "${bucket}" 的公开桶，或执行 supabase/migrations/0002_public_template_bucket.sql。`,
    );
    continue;
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(objectName);

  // 上传后确认公开地址真的能匿名访问。
  let reachable = "未验证";
  try {
    const res = await fetch(data.publicUrl, { method: "HEAD" });
    reachable = `${res.status} ${res.headers.get("content-type") ?? ""}`.trim();
  } catch (error) {
    reachable = `HEAD 失败: ${error.message}`;
  }

  console.log("完成");
  uploaded.push({ objectName, publicUrl: data.publicUrl, reachable });
}

if (!uploaded.length) {
  process.exit(1);
}

console.log("\n=== 公开地址 ===");
for (const item of uploaded) {
  console.log(`${item.objectName}  [${item.reachable}]`);
  console.log(`  ${item.publicUrl}`);
}

const [primary, ...extras] = uploaded;
console.log("\n=== 直接粘到 Vercel 环境变量 ===");
console.log(`BULIN47_TEMPLATE_VIDEO_URL=${primary.publicUrl}`);
console.log(
  `BULIN47_TEMPLATE_VIDEO_URLS=${extras
    .slice(0, 2)
    .map((item) => item.publicUrl)
    .join(",")}`,
);
console.log(
  "\n注意：MiniMax H3 最多 3 个参考视频且合计 <= 15 秒，所以上面只取前 3 个（主视频 + 2 个额外）。",
);

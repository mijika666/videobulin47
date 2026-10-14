-- 0002: 公开模板桶
--
-- 用途：存放 Bulin 47 的参考模板视频，供 BULIN47_TEMPLATE_VIDEO_URL 引用。
-- 注意：公开桶意味着任何拿到 URL 的人都能读取，所以这里只放模板素材，
-- 用户上传的照片和生成的视频必须继续留在私有的 uploads / renders 桶里。

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'templates',
  'templates',
  true,
  209715200, -- 200MB，与 fal.ai 参考视频上限一致
  array['video/mp4', 'video/quicktime']
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- 公开桶允许匿名读取；写入只通过 service_role（绕过 RLS），因此无需 insert 策略。
drop policy if exists "templates_public_read" on storage.objects;
create policy "templates_public_read"
  on storage.objects for select
  using (bucket_id = 'templates');

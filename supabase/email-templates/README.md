# Supabase 邮件模板

这三个文件是 VideoBulin47 的认证邮件模板，配色和站点一致
（底色 `#f4f0e8`、深色 `#090a09`、荧光绿 `#c9ff3f`、橙色 `#ff5722`）。

| 文件 | 对应 Supabase 里的模板 | 触发场景 |
|---|---|---|
| `magic-link.html` | **Magic link** | 用户在登录页点「Email me a sign-in link」 |
| `confirm-signup.html` | **Confirm signup** | 邮箱注册后需要确认地址 |
| `reset-password.html` | **Reset password** | 用户请求重置密码 |

## 怎么改

1. 打开 <https://supabase.com/dashboard>，选 `zbborkvogvoqglfxtjdk` 这个项目。
2. 左侧 **Authentication → Emails**（旧版是 Settings → Auth → Email Templates）。
3. 在左侧列表选中对应模板（Magic link / Confirm signup / Reset password）。
4. 把 **Subject** 和 **Message body** 换成下面的内容。
5. 点 **Save**，然后去站点登录页实测一封。

### 建议的主题行

| 模板 | Subject |
|---|---|
| Magic link | `Your VideoBulin47 sign-in link` |
| Confirm signup | `Confirm your VideoBulin47 account` |
| Reset password | `Reset your VideoBulin47 password` |

### 正文怎么填

把对应的 `.html` 文件内容**整段**复制到 Message body 里。
Supabase 的正文编辑器只接受 HTML，不认 Markdown，直接粘贴即可。

## 可用变量

| 变量 | 含义 |
|---|---|
| `{{ .ConfirmationURL }}` | 一次性验证/登录链接（**必填**，删掉用户就没法登录） |
| `{{ .Token }}` | 6 位数字验证码（如果用验证码流程） |
| `{{ .Email }}` | 收件人邮箱 |
| `{{ .SiteURL }}` | 站点地址 |
| `{{ .RedirectTo }}` | 回跳地址 |

## 改发件人名称

**Authentication → Emails → SMTP Settings**（或 Settings → Auth → SMTP）里有
**Sender name** 和 **Sender email**。把名称改成 `VideoBulin47`，
这样收件箱里显示的是品牌名而不是一串默认地址。

> 注意：发件地址取决于你在 SMTP 里配的账号。用 Supabase 默认发信器时，
> 发件人仍然是 Supabase 的地址，改不了。

## 几个坑

- **样式必须全部内联**。Gmail 和 Outlook 会剥离 `<style>` 标签，
  用 class 选择器的模板在这些客户端里会变成一片白底黑字的裸 HTML。
  这三个模板已经全部用内联样式写好。
- **别删 `{{ .ConfirmationURL }}`**。按钮的 `href` 和下面的备用链接都用它。
- 邮件里的链接必须是绝对地址，模板里已经固定写成
  `https://www.videobulin47.net`。
- 改完模板**不影响已发出的邮件**，只对新邮件生效。

## 重要：模板解决不了送达率

换模板只改变**外观**，不改变**能不能进收件箱**。

站点目前用的是 Supabase 的默认发信器，它有两个硬限制：
每小时发送量很小、发件人是 Supabase 的域名。所以：

- 登录页已经把 **Google 登录放在主位**，邮箱登录是折叠在
  「Sign in with email instead」里的备选路径；
- 如果你以后想让邮箱登录真正可用，还是需要接一个自有发信服务
  （Resend / SendGrid / Postmark），再把凭据填到 Supabase 的 SMTP 里。

## 自测清单

1. 打开 <https://www.videobulin47.net/login>
2. 点「Sign in with email instead」
3. 填一个你能收到信的邮箱，点「Email me a sign-in link」
4. 检查收件箱（也顺手看下垃圾箱）：
   - 顶部是深色条 + 绿点 + `VIDEOBULIN47`
   - 主标题是 `Your sign-in link`
   - 黑色按钮 `Sign in to VideoBulin47`
   - 按钮下方有一行备用链接
5. 点按钮应能跳回站点并完成登录

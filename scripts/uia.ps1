# 轻量级 Windows UI 自动化辅助脚本（Computer Use 运行时的替代方案）。
# 用法： . .\scripts\uia.ps1

Add-Type -AssemblyName UIAutomationClient
Add-Type -AssemblyName UIAutomationTypes
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

Add-Type @"
using System;
using System.Text;
using System.Runtime.InteropServices;
public class Win32 {
  public delegate bool EnumWindowsProc(IntPtr hWnd, IntPtr lParam);
  [DllImport("user32.dll")] public static extern bool EnumWindows(EnumWindowsProc cb, IntPtr lParam);
  [DllImport("user32.dll")] public static extern bool IsWindowVisible(IntPtr hWnd);
  [DllImport("user32.dll")] public static extern int GetWindowTextLength(IntPtr hWnd);
  [DllImport("user32.dll", CharSet=CharSet.Unicode)] public static extern int GetWindowText(IntPtr hWnd, StringBuilder s, int max);
  [DllImport("user32.dll")] public static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint pid);
  public static string Title(IntPtr hWnd) {
    int n = GetWindowTextLength(hWnd);
    var sb = new StringBuilder(n + 2);
    GetWindowText(hWnd, sb, sb.Capacity);
    return sb.ToString();
  }
  public static System.Collections.Generic.List<string> VisibleTitles() {
    var list = new System.Collections.Generic.List<string>();
    EnumWindows(delegate(IntPtr h, IntPtr l) {
      if (IsWindowVisible(h)) {
        string t = Title(h);
        if (t.Length > 0) {
          uint pid; GetWindowThreadProcessId(h, out pid);
          list.Add(pid + "|" + h.ToInt64() + "|" + t);
        }
      }
      return true;
    }, IntPtr.Zero);
    return list;
  }
  [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr hWnd);
  [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
  [DllImport("user32.dll")] public static extern bool IsIconic(IntPtr hWnd);
  [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr hWnd, out RECT r);
  [DllImport("user32.dll")] public static extern bool SetCursorPos(int X, int Y);
  [DllImport("user32.dll")] public static extern void mouse_event(uint flags, uint dx, uint dy, uint data, UIntPtr info);
  [DllImport("user32.dll")] public static extern bool SetProcessDPIAware();
  [StructLayout(LayoutKind.Sequential)] public struct RECT { public int Left, Top, Right, Bottom; }
  public const uint MOUSEEVENTF_LEFTDOWN = 0x0002;
  public const uint MOUSEEVENTF_LEFTUP = 0x0004;
  public static void Click(int x, int y) {
    SetCursorPos(x, y);
    System.Threading.Thread.Sleep(60);
    mouse_event(MOUSEEVENTF_LEFTDOWN, 0, 0, 0, UIntPtr.Zero);
    System.Threading.Thread.Sleep(40);
    mouse_event(MOUSEEVENTF_LEFTUP, 0, 0, 0, UIntPtr.Zero);
  }
}
"@

[void][Win32]::SetProcessDPIAware()

function Get-VisibleWindows {
  $edgePids = (Get-Process msedge -ErrorAction SilentlyContinue).Id
  [Win32]::VisibleTitles() | ForEach-Object {
    $parts = $_ -split '\|', 3
    [pscustomobject]@{ Pid = [int]$parts[0]; Hwnd = [IntPtr][int64]$parts[1]; Title = $parts[2]; IsEdge = ($edgePids -contains [int]$parts[0]) }
  }
}

function Focus-Window([IntPtr]$Hwnd) {
  if ([Win32]::IsIconic($Hwnd)) { [void][Win32]::ShowWindow($Hwnd, 9) }
  [void][Win32]::SetForegroundWindow($Hwnd)
  Start-Sleep -Milliseconds 350
}

function Get-WindowRect([IntPtr]$Hwnd) {
  $r = New-Object Win32+RECT
  [void][Win32]::GetWindowRect($Hwnd, [ref]$r)
  return $r
}

function Save-Screenshot([string]$Out = "shot.png", [IntPtr]$Hwnd = [IntPtr]::Zero) {
  if ($Hwnd -eq [IntPtr]::Zero) {
    $b = [System.Windows.Forms.SystemInformation]::VirtualScreen
    $bmp = New-Object System.Drawing.Bitmap($b.Width, $b.Height)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.CopyFromScreen($b.Left, $b.Top, 0, 0, $bmp.Size)
  } else {
    $r = Get-WindowRect $Hwnd
    $w = $r.Right - $r.Left; $h = $r.Bottom - $r.Top
    $bmp = New-Object System.Drawing.Bitmap($w, $h)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.CopyFromScreen($r.Left, $r.Top, 0, 0, $bmp.Size)
  }
  $bmp.Save($Out, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose(); $bmp.Dispose()
  return $Out
}

function Click-ScreenPoint([int]$X, [int]$Y) { [Win32]::Click($X, $Y) }

function Get-ElementsByType([IntPtr]$Hwnd, $ControlType) {
  $root = [System.Windows.Automation.AutomationElement]::FromHandle($Hwnd)
  $cond = New-Object System.Windows.Automation.PropertyCondition(
    [System.Windows.Automation.AutomationElement]::ControlTypeProperty, $ControlType)
  return $root.FindAll([System.Windows.Automation.TreeScope]::Descendants, $cond)
}

function Get-EdgeTabs([IntPtr]$Hwnd) {
  $i = 0
  foreach ($t in (Get-ElementsByType $Hwnd ([System.Windows.Automation.ControlType]::TabItem))) {
    $r = $t.Current.BoundingRectangle
    if ($r.Y -lt 40) {
      [pscustomobject]@{ Index = $i; Name = $t.Current.Name; Rect = $r.ToString(); Element = $t }
      $i++
    }
  }
}

function Select-EdgeTab([IntPtr]$Hwnd, [int]$Index) {
  $tabs = @(Get-EdgeTabs $Hwnd)
  if ($Index -lt 0 -or $Index -ge $tabs.Count) { throw "tab index out of range ($Index / $($tabs.Count))" }
  $el = $tabs[$Index].Element
  try { $el.GetCurrentPattern([System.Windows.Automation.SelectionItemPattern]::Pattern).Select() }
  catch { Invoke-Element $el }
  Start-Sleep -Milliseconds 600
}

function Select-EdgeTabByName([IntPtr]$Hwnd, [string]$Match) {
  $i = 0
  foreach ($t in @(Get-EdgeTabs $Hwnd)) {
    if ($t.Name -like $Match) { Select-EdgeTab $Hwnd $i; return $true }
    $i++
  }
  return $false
}

function Open-Url([IntPtr]$Hwnd, [string]$Url, [switch]$NewTab) {
  Focus-Window $Hwnd
  if ($NewTab) { [System.Windows.Forms.SendKeys]::SendWait("^t") } else { [System.Windows.Forms.SendKeys]::SendWait("^l") }
  Start-Sleep -Milliseconds 700
  Set-Clipboard -Value $Url
  [System.Windows.Forms.SendKeys]::SendWait("^v")
  Start-Sleep -Milliseconds 300
  [System.Windows.Forms.SendKeys]::SendWait("{ENTER}")
  Start-Sleep -Milliseconds 1500
}

function Get-Address([IntPtr]$Hwnd) {
  $f = Find-Edit $Hwnd { param($c, $r) $c.Name -match '地址和搜索栏|Address and search' }
  if ($f) { return $f.GetCurrentPattern([System.Windows.Automation.ValuePattern]::Pattern).Current.Value }
  return $null
}

function Find-Button([IntPtr]$Hwnd, [string]$Name) {
  foreach ($t in (Get-ElementsByType $Hwnd ([System.Windows.Automation.ControlType]::Button))) {
    if ($t.Current.Name -eq $Name) { return $t }
  }
  return $null
}

function Find-Edit([IntPtr]$Hwnd, [scriptblock]$Match) {
  foreach ($t in (Get-ElementsByType $Hwnd ([System.Windows.Automation.ControlType]::Edit))) {
    $c = $t.Current; $r = $c.BoundingRectangle
    if ($r.Width -gt 0 -and (& $Match $c $r)) { return $t }
  }
  return $null
}

function Find-ByName([IntPtr]$Hwnd, [string]$Name) {
  $root = [System.Windows.Automation.AutomationElement]::FromHandle($Hwnd)
  $cond = New-Object System.Windows.Automation.PropertyCondition(
    [System.Windows.Automation.AutomationElement]::NameProperty, $Name)
  return $root.FindFirst([System.Windows.Automation.TreeScope]::Descendants, $cond)
}

function Invoke-Element($El) {
  $r = $El.Current.BoundingRectangle
  Click-ScreenPoint ([int]($r.X + $r.Width / 2)) ([int]($r.Y + $r.Height / 2))
}

# 小六壬在线排盘系统

一个基于 Vue 3 和 Tailwind CSS 开发的小六壬在线排盘系统。

## 在线预览

[点击访问在线演示](https://wuhaohao1234.github.io/xiao-liu-web/#/)

### 系统截图

![](imgs/2025-01-02-21-57-58.png)
![](imgs/2025-01-02-21-58-14.png)
![](imgs/2025-01-02-21-58-41.png)

## 项目简介

小六壬是中国传统文化中的一种重要占卜方法，具有悠久的历史传承。本项目提供了一个简单易用的在线排盘工具，帮助用户快速了解事情的发展趋势。

## 技术栈

- Vue 3 + Vite
- Tailwind CSS
- lunar-javascript (农历计算库)
- Vue 3 `<script setup>` SFCs

## 功能特点

- 支持当前时间和手动输入农历时间两种模式
- 自动计算月神、日神、时神
- 提供详细的六神解释和断语
- 响应式设计，支持各种设备访问

## 安装和运行

1. 克隆项目
```bash
git clone https://github.com/wuhaohao1234/xiao-liu-web.git
```

2. 安装依赖
```bash
npm install
```

3. 本地运行
```bash
npm run dev
```

4. 构建生产版本
```bash
npm run build
```

## 使用说明

1. 选择时间模式：
   - 使用当前时间
   - 手动输入农历时间

2. 输入占事内容

3. 点击"开始排盘"，系统会显示：
   - 月神（代表当前状态）
   - 日神（代表发展过程）
   - 时神（代表最终结果）

## 六神说明

- 大安：大吉大利，事事顺遂
- 留连：进展缓慢，需要耐心
- 速喜：喜事临门，进展迅速
- 赤口：口舌是非，需要谨慎
- 小吉：小事可成，大事难成
- 空亡：诸事不宜，宜守不宜进

## 注意事项

- 月神代表当前状态和整体趋势
- 日神代表事情的发展过程
- 时神代表最终的结果
- 三神结合起来看，才能全面理解事情的发展

## IDE 支持

本项目推荐使用 VSCode 进行开发。更多关于 Vue 的 IDE 支持信息，请参考 [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support)。

## 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助改进项目。

## 许可证

MIT License

## 联系方式

[微信：wh18329723317](wechat://gh_9459263d3bd9_414722911)

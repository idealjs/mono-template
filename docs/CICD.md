# 教程（Tutorial）

## 前提

已安装 Node.js、git、并在仓库根目录可运行 `npx lerna`（或全局安装的 `lerna`）。已配置远程仓库并有推送权限。

## 快速步骤

1. 拉取最新代码并切到主分支：`git checkout main && git pull`。
2. 在本地更新版本
   - 自动交互式（更简单）：`npx lerna version`，按提示选择 `major` / `minor` / `patch` 或输入精确版本号。
3. 将变更和 tag 推送到远程：`git push --follow-tags`（若 `lerna version` 已自动推送，则此步可跳过）。
4. 观察 CI（例如 GitHub Actions）在收到 `vX.Y.Z` 风格的 tag 后触发，等待构建和发布完成。

# 指南（How-To）

## 常见任务

### 版本不要回退

版本一旦发布后不应在仓库或历史中做版本号回退。如果某个已发布版本的包出现问题，应通知管理员对该版本进行下架处理，而不是在仓库中回退或重新使用相同版本号。

### 分支上的 revert 与发布触发

在分支上对提交做 `revert` 并不会自动触发打包或发布。仅当创建并推送带 `v` 前缀的 Git tag（例如 `v1.2.3`）时，CI 才会根据 tag 规则启动发布流程。因此只要不创建/推送 tag，就不会产生相关的打包/发布产物。

### 单包升级与版本控制由工具负责

如果需要单独升级某个包的版本，应由 Lerna 控制版本变更（例如使用 `npx lerna version --independent`），而不是手动修改 `package.json` 去控制版本号。我们期望版本变更由工具产生并同步生成对应的 Git commit 与 tag。

# 参考指南（Reference Guide）

## 关键原理

- 版本策略：采用语义化版本（SemVer）: `major.minor.patch`。在本地用 `lerna version` 来升级版本。
- Lerna 行为：`lerna version` 会更新 package.json 中的版本、提交变更、并创建对应的 Git tag（例如 `v1.2.3`）。
- CI 触发：CI（例如 GitHub Actions）通过监听 push 到 tag（如 `v*`）来启动发布流水线。
- 发布产物：CI 在成功构建并运行测试之后，会根据 tag 将构建产物发布到目标平台（例如 npm、GitHub Releases、私有仓库等）。

## 示例：触发规则（示意）

```yaml
on:
  push:
    tags:
      - "v*"
```

该规则确保只有当 repo 推送带 `v` 前缀的 tag 时，发布工作流才会运行。

# 方案说明（Explanation）

## 为什么使用 Lerna + tag 驱动 CI

- 单一入口：通过统一的 `lerna version` 命令，开发者可以在本地按统一规则进行版本管理，降低出错概率。
- 可审计的发布点：Git tag 是不可篡改的历史记录，CI 使用 tag 作为发布触发点可以保证发布操作与代码快照严格对应。
- 自动化与可复现：CI 根据 tag 自动运行相同的构建与发布步骤，保证产物可复现且发布记录清晰。
- 适配多包仓库：Lerna 提供了 monorepo 下的版本管理与发布协调能力，适合本仓库的多包结构。

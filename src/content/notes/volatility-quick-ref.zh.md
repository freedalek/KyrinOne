---
title: "Volatility 3 快速参考"
description: "内存取证分析常用的 Volatility 3 命令。"
pubDate: 2025-11-20
tags: ["取证", "Volatility", "内存分析", "参考"]
lang: "zh"
langLink: "/en/notes/volatility-quick-ref/"
---

## 安装

```bash
# 通过 pip 安装
pip install volatility3

# 或从源码安装
git clone https://github.com/volatilityfoundation/volatility3.git
cd volatility3
python setup.py install
```

## 常用命令

### 操作系统检测

```bash
# 识别操作系统
vol -f memory.dump windows.info

# 列出运行进程
vol -f memory.dump windows.pslist

# 进程树视图
vol -f memory.dump windows.pstree
```

### 网络分析

```bash
# 网络连接
vol -f memory.dump windows.netscan

# Socket 信息
vol -f memory.dump windows.sockets
```

### 文件系统

```bash
# 列出 MFT 中的文件
vol -f memory.dump windows.mft

# 导出特定文件
vol -f memory.dump windows.dumpfiles --virtaddr 0x...
```

### 注册表

```bash
# 打印注册表配置单元列表
vol -f memory.dump windows.hivelist

# 导出注册表
vol -f memory.dump windows.dumpregistry
```

## 提示

- 始终先运行 `windows.info` 验证配置文件
- 使用 `--output json` 获取机器可读输出
- 对于大文件转储（>4GB），使用 `--single-location` 标志以获得更好的性能

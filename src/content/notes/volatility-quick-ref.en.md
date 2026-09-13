---
title: "Volatility 3 Quick Reference"
description: "Common Volatility 3 commands for memory forensics analysis."
pubDate: 2025-11-20
tags: ["forensics", "volatility", "memory-analysis", "reference"]
lang: "en"
langLink: "/zh/notes/volatility-quick-ref/"
---

## Installation

```bash
# Via pip
pip install volatility3

# Or from source
git clone https://github.com/volatilityfoundation/volatility3.git
cd volatility3
python setup.py install
```

## Common Commands

### OS Detection & Info

```bash
# Identify the operating system
vol -f memory.dump windows.info

# List running processes
vol -f memory.dump windows.pslist

# Process tree view
vol -f memory.dump windows.pstree
```

### Network Analysis

```bash
# Network connections
vol -f memory.dump windows.netscan

# Sockets
vol -f memory.dump windows.sockets
```

### File System

```bash
# List files in MFT
vol -f memory.dump windows.mft

# Dump a specific file
vol -f memory.dump windows.dumpfiles --virtaddr 0x...
```

### Registry

```bash
# Print registry hive list
vol -f memory.dump windows.hivelist

# Dump registry
vol -f memory.dump windows.dumpregistry
```

## Tips

- Always run `windows.info` first to verify the profile
- Use `--output json` for machine-readable output
- For large dumps (>4GB), use the `--single-location` flag for better performance

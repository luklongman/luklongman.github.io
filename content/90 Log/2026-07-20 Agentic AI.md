---
title:
description:
permalink:
aliases:
publish: "false"
tags:
date: 2026-07-16
status:
created: 2026-07-16T13:03
updated: 2026-07-20T14:55
---
- Agent Skills standards: 
- [Using it in VS code](https://code.visualstudio.com/docs/agent-customization/agent-skills)
- Using it in Claude /.claude 
- Project based Skill or System based skill /.copilot or /.github

## SKILLS vs INSTRUCTIONS

| Feature         | Agent Skills                                               | Custom Instructions                    |
| --------------- | ---------------------------------------------------------- | -------------------------------------- |
| **Purpose**     | Teach specialized capabilities and workflows               | Define coding standards and guidelines |
| **Portability** | Works across VS Code, Copilot CLI, and Copilot cloud agent | VS Code and GitHub.com only            |
| **Content**     | Instructions, scripts, examples, and resources             | Instructions only                      |
| **Scope**       | Task-specific, loaded on-demand                            | Always applied (or via glob patterns)  |
| **Standard**    | Open standard ([agentskills.io](https://agentskills.io))   | VS Code-specific                       |

my-skill/
├── SKILL.md          # Required: metadata + instructions
├── scripts/          # Optional: executable code
├── references/       # Optional: documentation
├── assets/           # Optional: templates, resources
└── ...               # Any additional files or directories


## What Skills are Essential for building my Obsidian Wiki?

1. https://github.com/kepano/obsidian-skills
2. Check out [anthropics/skills](https://github.com/anthropics/skills/). Like Marketplace for skills.algorithmic-art
	1. brand-guidelines, canvas-design, claude-api, doc-coauthoring, docx, frontend-design,internal-comms,mcp-builder,pdf,pptx,skill-creator,slack-gif-creator,theme-factory,web-artifacts-builder,webapp-testing,xIsx
3. https://awesome-copilot.github.com/skills/

![Install obsidian skill to github repo belike.png|235](https://pub-b5fd5637194140da82aab38eadc4a60e.r2.dev/attachments/png/8e/8e055103c2270a64d752a493644121d4dc6fb1137e1cd6056487f4402efb74f5.png)

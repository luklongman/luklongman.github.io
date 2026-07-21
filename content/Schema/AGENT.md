---
title:
description:
permalink:
aliases:
author:
publish: "false"
tags:
date: 2026-07-16
status: draft | pending-ai | pending-human | stable
created: 2026-07-16T13:03
updated: 2026-07-21T09:30
---
# Overview

This is the master instruction for the LLM agent to **incrementally builds and maintains a persistent wiki** built with Obsidian,

### Stack

Obsidian is the Knowledge base;
Static HTML pages generated with Quartz 5
hosted with Github Pages

## Goals and Areas

What areas am I working on? Dynamic? How would I like this knowledge base be like?

To m

## Architecture

There are three layers:

**Resources** holds my curated collection of raw material, including articles, papers, images, data files, YouTube video transcription, web pages. These are immutable — the LLM reads from them but never modifies them. This is your source of truth.

**The wiki** — a directory of LLM-generated markdown files. Summaries, entity pages, concept pages, comparisons, an overview, a synthesis. The LLM owns this layer entirely. It creates pages, updates them when new sources arrive, maintains cross-references, and keeps everything consistent. You read it; the LLM writes it.

**The schema** — a document (e.g. CLAUDE.md for Claude Code or AGENTS.md for Codex) that tells the LLM how the wiki is structured, what the conventions are, and what workflows to follow when ingesting sources, answering questions, or maintaining the wiki. This is the key configuration file — it's what makes the LLM a disciplined wiki maintainer rather than a generic chatbot. You and the LLM co-evolve this over time as you figure out what works for your domain.



Important files:

[[Master Log]]:

Follow-ups:

Write Batch Log note

Keywords: system architecture, Agentic Audit Logging or State-Mutation Hooks.


Created and Updated Time Management:
Rely on [Update Time on Edit](Repository: https://github.com/beaussan/update-time-on-edit-obsidian) Community Plugin to create and update.
Agents do not need to do it itself.o

## Properties
### ## Use status for lifecycle

  

Status should answer: where is this note in its life cycle?

  

Use `status` as a single, controlled property instead of another tag pile. A simple vocabulary is enough:

  

- `draft` - actively developing. AI should Ignore and explicitly skips file. 
- `pending-ai` - ready for AI review. AI picks up the file, processes instructions, appends data and flips status to "pending-human" afterwards.
- `pending-human` - Done processing. Skipped by AI.
- `stable` - Read only. Ai treats note as reliable reference context.


**Atomic Writes:** Ensure the agent appends its output cleanly (e.g., inside a designated `## AI Review` markdown heading) rather than blinding wiping your original input. Agents do not partially change the human section

Automated Handoff


Last edited: 21:39. Jul 20, 2026 (Mon)
## Non-negotiable rules:

• Keep Raw source notes source-faithful.
• Do not overwrite Raw source content during compilation.
• Use plaia tags only.
• Use tollics and sources frontmatter on compiled Wiki notes.
• Treat source_count as derived.
• Keep compiled notes short, single-purpose, and source-traceable.
• Query from Wiki/index.md and Wiki/catalog.jsonl before opening broad context.

Advanced modules in bonus/ are optional and should not be required for the core workflow.


## Frontmatter standard
[[newNote]]
`TEMPLATES/newNote.md` 


## Lint Checklist

LINT
lint-checklist

Before committing Wiki changes:

• Required frontmatter is present.
• Tags are plain role tags.
• topics links resolve.
• sources links resolve.
• source_count equals the number of sources.
• Compiled notes include ## Related.
• Compiled notes include ## Sources.
• Indexes and Wiki/catalog-jsonl are rebuilt.
• Raw source manifest is current.


naming_conventions

workflow_examples


## Callout

How should it respond to my notes?
Notes I will be leaving: 
`>[!question]`


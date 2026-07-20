---
title: Tags and Status for Knowledge Management
aliases:
  - Tag and status policy
  - AI knowledge lifecycle
tags:
  - ai
  - second-brain
  - obsidian
  - knowledge-management
  - metadata
status: evergreen
created: 2026-07-20
updated: 2026-07-20T21:05
publish: "true"
---
## Tags and Status for Knowledge Management

Based on the second-brain and LLM wiki notes, I would use `tags` and `status` for two different jobs.

## Use tags for classification

Tags should answer: what is this note about, and how should I group it with other notes?

Use tags for stable categories that help you search, filter, and cluster notes across the vault:

- subject area: `ai`, `obsidian`, `knowledge-management`
- note type: `clipping`, `synthesis`, `reference`, `guide`
- source family: `youtube`, `article`, `research`
- workflow role: `schema`, `raw`, `wiki`, `maintenance`

Keep tags small and reusable. If a value is temporary or note-specific, it probably should not be a tag.

## Use status for lifecycle

Status should answer: where is this note in its life cycle?

Use `status` as a single, controlled property instead of another tag pile. A simple vocabulary is enough:

- `draft` for something being shaped
- `pending-ai` for something that needs checking or cleanup
- `pending-human` for a stable note you trust and want to reuse
- `stable` for notes that are kept for history but no longer active

This matches the architecture we found in the clips: raw material comes in, the agent processes it, the wiki gets structured, and maintenance keeps it healthy. `status` is the quick signal for where the note sits in that pipeline.

## Recommended split

Use tags to classify along multiple dimensions. Use status to track one primary state.

That means a note can be:

- tagged as `ai`, `obsidian`, and `clipping`
- marked `status: draft` while it is still being refined
- later moved to `status: evergreen` once it is stable

This is cleaner than using tags to represent lifecycle, because lifecycle changes over time while topics usually do not.

## A practical vault policy

For this vault, I would treat the metadata like this:

1. `tags` = what the note is about, what source family it came from, and what part of the workflow it belongs to.
2. `status` = whether the note is still raw, being edited, ready for reuse, or archived.
3. Only one `status` value per note.
4. Prefer a small shared vocabulary so the agent can apply the rules consistently.

## Example pattern

```yaml
---
title: Example Note
tags:
  - ai
  - obsidian
  - clipping
status: review
created: 2026-07-20
updated: 2026-07-20
---
```

This would mean: the note is about AI and Obsidian, it came from a clipping, and it still needs review before it becomes a stable reference.

## How this helps the agent

When the agent is building or maintaining the wiki, metadata should reduce ambiguity:

- tags help the agent place the note in the right cluster
- status tells the agent whether it should edit, refine, or leave the note alone
- together they support ingestion, query, and maintenance without overcomplicating the vault

## My recommendation

Use tags for meaning. Use status for workflow.

That separation keeps the vault readable for you and easier for an agent to maintain over time.

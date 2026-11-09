# Project audit — 2026-10-28

## Locations
- **Original:** Claude Code session ran in a temporary scratch workspace (`~/Library/Application Support/Claude/scratch-workspaces/…/scratch-2026-10-28-e18857`, empty). Project data lived in `~/SimpleMedia`, `~/.simple-media/work`, `~/.claude/skills/ai-influencer`, Claude memory (`~/.claude/projects/<scratch>/memory`), and `~/Desktop/Julie Anderson Vids`.
- **Canonical project:** `~/SimpleMedia`, organized in place. Nothing was moved, because the skill hard-codes `Kits/`, `Videos/_work/` and `~/.simple-media/work`.
- **Backup:** `~/Desktop/AI-Influencer-Backup` (Stop hook).
- **Safety snapshot:** `~/AI-Influencer-Snapshots/2026-10-28_2128` (551 MB, 637 files, `MANIFEST.sha256`, permissions 700). It contains the raw transcripts, which include a Discord bot token; keep it private.

## Created (new files; no originals overwritten except as noted)
`HANDOFF.md`, `README.md`, `knowledge-base/{decisions,lessons-learned,project-history,content-log}.md`, `knowledge-base/skill-changes-2026-10-28.diff`, `knowledge-base/claude-memory/*` (copies), `knowledge-base/session-extractions/*` (user messages, secrets redacted), `content-guidelines/julia-content-rules.md`, `workflows/talking-head-video.md`, `archive/ai-influencer-skill-original-2026-10-28.zip` (copy of the Desktop zip), and the sweet potato banana bread working folder's `prompts-final.md`.

**Edited** (originals preserved in the snapshot): `CLAUDE.md` (rewritten with session-start rules and the exact backup rule), `Kits/Characters/Julia Anderson/bible.md` (added place 6), `~/.claude/hooks/ai-influencer-backup.sh` (hardened), `~/.claude/settings.json` (hook command no longer discards output).

**Backup cleanup:** the Desktop backup's `project-config/settings.txt` held live tokens. It was replaced with `settings.REDACTED.txt`.

## Migration manifest
No files were moved or renamed. All new files are additive; the full map is in the README.

## Session histories
| Transcript | Inspected | Extracted |
|---|---|---|
| Main AI influencer session 2026-10-28 (`f4cf463a`) | Yes | 94 user messages, 7 artifact links, the compaction summary |
| Video Database setup 2026-10-14 (`4bd6b1f0`) | Yes | 5 user messages (bot token redacted) |
| 6 sessions in `~` (May–June 2026: Arcads, ads research, apartment walkthrough, products) | First messages only | Not extracted; judged unrelated |
| Assistant replies | Kept only in the raw snapshot copy | Not summarized message by message |

## Gaps (could not be recovered)
- How `Julia_RedLentilWraps_*.mp4` (2026-10-17) were made.
- The tomato drink v1 working folder (only v2 exists locally).
- Any platform or posting rules: none exist.
- Exact Flow credit spend (estimates only).

## Verification
- Snapshot: all 637 checksums pass. Source vs snapshot checksum diff shows only the intended edits and new files, plus regenerated `__pycache__`. No snapshot file is missing at its source (0 missing).
- Skill scripts compile; `storage.py status` and `stitch.py --help` run; `vidtools` paths unchanged.
- Backup tests:
  - JSON valid; script syntax OK; a run takes under 1 s.
  - The test file arrived with a matching SHA-256.
  - After deleting the source, the backup kept its copy (no `--delete`).
  - An unreadable file was logged to `.backup.log` with a `.BACKUP-FAILED` flag, and the flag cleared on the next good run.
  - Exit code is always 0, so there's no Stop loop.
  - The hook fired after a real Claude response earlier (`.last-sync` 21:14:31).
- Secrets scan of the backup and the project docs found nothing.

## Risks / next steps
- Disk is 94% full.
- Transcripts auto-delete after about 30 days; the snapshot keeps them.
- The Stop hook is event-driven, not a real-time watcher.
- `~/.claude/CLAUDE.md` imports a missing `@shared/CLAUDE.md`.
- Open future sessions in `~/SimpleMedia`.
- Add platform rules.

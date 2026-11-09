# HANDOFF — AI Influencer / SimpleMedia

_Last updated: 2026-10-28. Read this first in any new session, then the files it links._

## 1. What this is
A file-based workspace for making AI influencer short-form videos. The main character is **Julia Anderson**, a 43-year-old Marin County wellness mom. The videos remix proven recipe reels from the Video Database into talking-head videos made in Google Flow (Nano Banana Pro images + Omni video), then stitched locally.

## 2. Goal
Produce consistent, natural-looking Julia recipe/health videos fast and grow her page. Longer term: more characters, product videos and skits (the skill already supports these).

## 3. Canonical locations
| What | Where |
|---|---|
| **Project root (open Claude Code here)** | `~/SimpleMedia` |
| Skill (method, rules, scripts) | `~/.claude/skills/ai-influencer/` |
| Character kits | `~/SimpleMedia/Kits/Characters/<name>/` (bible.md, locks/, outfits/) |
| Per-video working folders | `~/.simple-media/work/<Character>/<YYYY-MM>/<Topic>/` |
| Pulled reels (DB rows / links) | `~/SimpleMedia/Videos/_work/` |
| Finished Julia videos | `~/Desktop/Julie Anderson Vids/Julia_<Topic>_FINAL.mp4` |
| Google Drive | Videos folder → `Not Posted Videos/` (URL in `~/.simple-media/storage.json`) |
| Settings + secrets | `~/SimpleMedia/settings.txt` (never copy into docs/backups) |
| Knowledge base | `~/SimpleMedia/knowledge-base/` |
| Live backup | `~/Desktop/AI-Influencer-Backup/` |
| Private safety snapshots | `~/AI-Influencer-Snapshots/<timestamp>/` |

## 4. Current state (2026-10-28)
- Skill installed and customized (diff: `knowledge-base/skill-changes-2026-10-28.diff`).
- Video Database sheet connected; Drive storage set up.
- Three Julia videos finished this session (tomato drink, Greek yogurt cheesecake, sweet potato banana bread). None are recorded as posted. See `knowledge-base/content-log.md`.

## 5. Characters
- **Julia Anderson** (active): `Kits/Characters/Julia Anderson/bible.md`. 5 outfits; 6 places, including the new beach-deck outdoor kitchen. Voice: relaxed Northern California, warm, slightly raspy.

## 6. Workflow
`workflows/talking-head-video.md` (summary) → skill `/ai-influencer`. Generation runs in Google Flow through the built-in browser; the project is `flow.google.com/project/655a0343-a030-4661-9015-314648a0116d`.

## 7. Rules that matter most
- Quote the credit cost and wait for a yes before generating clips.
- She talks while doing the action, about that action, in whole sentences; no dead air.
- Every named ingredient visibly goes in on its word; props in their real state.
- Copy the original's framing; face-to-object moves use the Start + End push-in.
- Standard CTA: "If you liked this video, comment YES, and follow me for more health tips."
- Bible §8: no medical titles, no cure claims, no instant results.
- Drive: final video only, only when asked.
Details: `content-guidelines/julia-content-rules.md`, `knowledge-base/decisions.md`, `knowledge-base/lessons-learned.md`.

## 8. Architecture decisions
`~/SimpleMedia` was organized in place and nothing was moved, because the skill's scripts hard-code `~/SimpleMedia/Kits`, `~/SimpleMedia/Videos/_work` and `~/.simple-media/work`. Documentation was added around the existing layout.

## 9. Done
Setup, sheet + Drive, three videos, the rules captured in the skill and memory, the backup hook, and this audit (`documentation/PROJECT-AUDIT.md`).

## 10. Unfinished
- Banana bread clip 2b: optional trim of the ~2 s gap.
- Banana bread prompt page (artifact) still shows the old clip 1/2 prompts; the final prompts are in the working folder's `prompts-final.md`.
- The tomato drink copy on Drive is an older version.
- No posting plan or platform rules exist yet (`content-guidelines/` notes the gap).

## 11. Known issues
- Disk was 94% full (12 GB free) on 2026-10-28.
- Claude Code deletes session transcripts after about 30 days; raw copies are kept in `~/AI-Influencer-Snapshots/`.
- Flow sometimes fails generations (they're refunded); retry.
- System Python 3.9 breaks the skill scripts; use `/opt/homebrew/bin/python3.12`.
- **Discord bot token needs rotating (you do this; not done).** It appears in plain text in 4 transcript files: the 2026-10-14 and 2026-10-28 session `.jsonl` files under `~/.claude/projects/`, and their copies in `~/AI-Influencer-Snapshots/2026-10-28_2128/transcripts/`. It is not in the project, docs or Desktop backup. The live bot reads it from `~/video-database-bot/settings.txt` (`DISCORD_BOT_TOKEN`, loaded by `bot.py` via dotenv), and the LaunchAgent `com.videodatabase.bot.270de9` keeps it running. `~/SimpleMedia/settings.txt` has `DISCORD_BOT_TOKEN` blank (unused). The Apps Script deployment ID/URL is also in those transcripts (lower risk).
- `~/video-database-bot/settings.txt` is mode 644 (others can read it); `chmod 600` is recommended.
- Leftover test files in the backup: `kits/backup-hook-test.txt`, `project/knowledge-base/backup-test-*.txt` (harmless; not deleted).

**Resolved 2026-10-28 (repair session):**
- The 6 feedback rules load in every `~/SimpleMedia` session through `@` imports in `CLAUDE.md` (source: `knowledge-base/claude-memory/`). They were checked against the skill and are all built in there too.
- The broken `@shared/CLAUDE.md` import was removed from `~/.claude/CLAUDE.md`. That file is a copy of `~/arcads-claude-code/CLAUDE.md`, and the import only resolves inside that repo, which still loads it itself. The Arcads rules were kept and marked as Arcads-only. Original: `~/.claude/CLAUDE.md.bak-2026-10-28`.
- The backup hook also copies `~/.claude/projects/-Users-dylanleyes-SimpleMedia/memory/` → `project-config/memory-simplemedia/`. Original script: `~/.claude/hooks/ai-influencer-backup.sh.bak-2026-10-28`.

## 12. Next steps
1. Rotate the Discord bot token (steps in `knowledge-base/decisions.md` → Security, 2026-10-28).
2. Decide the posting platforms and rules; record them in `content-guidelines/`.
3. Next video: `/ai-influencer` → Julia → next DB row.
4. Free up disk space.

## 13. Backup
A Claude Code **Stop hook** (`~/.claude/settings.json`) runs `~/.claude/hooks/ai-influencer-backup.sh` after every Claude response, in the background. It rsyncs (no `--delete`) the project, skills, memory (old scratch memory and the SimpleMedia memory), kits and working files into `~/Desktop/AI-Influencer-Backup/`, skipping video files and secrets. Log: `~/Desktop/AI-Influencer-Backup/.backup.log`. This is event-driven, **not** a real-time file watcher: edits you make outside Claude are backed up at the next Claude response.

## 14. Resuming
Open `~/SimpleMedia` in Claude Code, which loads `CLAUDE.md` automatically. Read this file and the linked docs for the task. Save every new decision to files, update this handoff when the state changes, and log each video in `knowledge-base/content-log.md`.

# AI Influencer project (SimpleMedia)

## Start of every session
1. Read `HANDOFF.md` (state, rules, locations, next steps).
2. For the task at hand, read the linked source: the character bible (`Kits/Characters/<name>/bible.md`), `content-guidelines/`, `workflows/`, `knowledge-base/decisions.md` and `lessons-learned.md`.
3. Videos are made with the skill `/ai-influencer` (`~/.claude/skills/ai-influencer/`).

## Locations
- Skill: `~/.claude/skills/ai-influencer/` (parts, rules, scripts). Run its scripts with `/opt/homebrew/bin/python3.12`.
- Characters, products, side characters: `Kits/`. Video Database link and keys: `settings.txt` (secret).
- Per-video working folders: `~/.simple-media/work/<Character>/<YYYY-MM>/<Topic>/`.
- Finished Julia videos: `~/Desktop/Julie Anderson Vids/Julia_<Topic>_FINAL.mp4`.
- Do not move `Kits/`, `Videos/_work/` or `~/.simple-media/work/`; the skill's scripts depend on these paths.

## Standing feedback rules (always apply)
Your six feedback rules from 2026-10-28, recovered from the old scratch-workspace memory. They are also built into the skill (`parts/omni-storyboard.md`, `parts/script-remix.md`, `parts/setup-storage.md`, `rules/METHOD.md` #21–26). Imported here so every session in this folder loads them:

@knowledge-base/claude-memory/ai-influencer-speech-sync.md
@knowledge-base/claude-memory/visuals-match-words.md
@knowledge-base/claude-memory/omni-start-end-pushin.md
@knowledge-base/claude-memory/standard-cta.md
@knowledge-base/claude-memory/drive-upload-final-video-only.md
@knowledge-base/claude-memory/julia-videos-desktop-folder.md

Claude's own memory for this workspace is `~/.claude/projects/-Users-dylanleyes-SimpleMedia/memory/`. When a new rule is saved there, also copy it into `knowledge-base/claude-memory/` and add an import line above.

## Backup rule
Whenever I add new context, rules, notes, or files, or we change the skill, save it as a file in this project (not just in chat) so the backup hook picks it up. Update ~/Desktop/AI-Influencer-Backup/README.md with any meaningful change and a dated changelog entry.

The backup is a Claude Code Stop hook (`~/.claude/settings.json` → `~/.claude/hooks/ai-influencer-backup.sh`) that rsyncs (no `--delete`) into `~/Desktop/AI-Influencer-Backup/` after every response.

## Keeping knowledge in files
- Save meaningful decisions to `knowledge-base/decisions.md` (dated, with source).
- Keep character bibles updated when a character gains an outfit, place, voice change or rule.
- Update `HANDOFF.md` when important project state changes; log every finished video in `knowledge-base/content-log.md`.
- Preserve references and provenance: note where a fact or rule came from (session date, file).
- Never leave critical project knowledge only in chat or only in Claude memory; copy new memory rules into `knowledge-base/claude-memory/`.
- Update existing documents instead of creating duplicates.
- Never copy secrets (`settings.txt` values, tokens, API keys) into docs or the backup.

# Lessons learned

What went wrong or right, and the rule it produced. Source: main session 2026-10-28 (`session-extractions/2026-10-28_ai-influencer-main-session.md`) unless noted. The rules themselves live in the skill (`~/.claude/skills/ai-influencer/`) and in `claude-memory/`.

## Video quality (from your feedback)
1. **"That video was terrible"** (tomato drink v1). She did the action, then talked 1–2.4 s later; words described the next step; sentences split across clips left odd pauses. → Talk-while-acting prompt format, whole sentences per clip, words match the clip's own action, Whisper-check clip 1 before running the rest, stitch trims dead air.
2. **Framing matters.** The tomato squash shot came out too wide; the original was a tight palm-up close-up over the counter. → Compare every generated image side by side with the original frame.
3. **Start + End frame push-in** ("That was fucking amazing"). Face start frame → close-up end frame, talking from frame one. Same price as start-only.
4. **Hooks:** holding props far from camera isn't captivating. The winning hook was "Four things in everyone's kitchen that can fix your 3PM crash" with the produce pushed to the lens.
5. **CTA:** the copied "save and share" ending was awkward and the tone was off. → Fixed CTA, warm and relaxed.
6. **Bananas with the peel on / eggs that just appear** (banana bread). → Every named ingredient goes in on camera on its word; prop state stated in the prompt.
7. **List lines pause.** "peanut butter, two eggs, and a little baking powder" got 1.3 s gaps timed to the spooning. → One breath, or split into two clips.

## Tooling
- Nano Banana won't reliably lower hands to a bowl from text alone (3 tries + an edit on the cheesecake hook). Workarounds: fix it in the clip prompt (worked), or upload the original frame as a pose reference.
- Omni sometimes returns "Failed" (refunded). Resubmitting the same clip works; a knife/cutting prompt went through when simplified.
- Omni sometimes adds an ad-lib before the line ("I love sharing this with you"). → Trim with ffmpeg to 0.15 s before the first scripted word.
- Flow's asset picker reorders; always verify the attached image by the ID in its `src`, not by position or name.
- Use `/opt/homebrew/bin/python3.12` for skill scripts (system Python 3.9 breaks `vidtools.py`/`sheet.py`).
- The Video Database row numbers shift when new rows are added; check the row's content, not just its number (row 2 changed three times on 2026-10-28).

## Process
- Uploading the whole working folder to Drive was "so much stuff". → Final video only.
- A file saved under a different name than the folder's convention looked "missing". → Match `Julia_<Topic>_FINAL.mp4` and reveal in Finder.
- Settings with secrets were copied into the Desktop backup by the first version of the hook. → Backup now copies a redacted `settings.REDACTED.txt` only.

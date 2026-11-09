# Workflow: Julia talking-head recipe video (Google Flow)

The authoritative steps are the skill (`/ai-influencer`, `~/.claude/skills/ai-influencer/SKILL.md` → `parts/talking-head.md`, `parts/omni-storyboard.md`). This is the proven sequence from 2026-10-28.

1. **Pick the reel:** a Video Database row (`vidtools.py fetch-row N`; check the row's content, rows shift) or a link (`vidtools.py fetch-link URL row2` when the DB is still processing).
2. **Folder:** `storage.py folder "Julia Anderson" "<Topic>"` → `~/.simple-media/work/Julia Anderson/<YYYY-MM>/<Topic>/`.
3. **Script:** remix one action per clip with whole sentences and the standard CTA, then show it for approval.
4. **Ask** about the outfit (bible §5) and then the location (bible §6), one question each.
5. **Plan + prompt page:** `omni-plan.json` → `omni_board.py` → publish as an artifact.
6. **Images in Flow** (Nano Banana Pro, 9:16, 0 credits): image 1 first and compare it with the original frame; then the rest, chained off image 1 (face lock + image 1 in the box; close-ups use image 1 only).
7. **Quote credits, get a yes.** Clip 1 first (Omni 1.1 Flash, Frames, 720p). Whisper-check it: first word ≈ 0.00 s, exact line, gaps ≤ 0.4 s; check the frame strip.
8. **Remaining clips:** set the length per clip; push-ins use Start + End; verify attached frames by Flow asset ID. Retry "Failed" tiles.
9. **Check every clip:** transcript, gaps, ad-libs, each named item going in on its word.
10. **Stitch:** `stitch.py clips… --script script.txt --out final.mp4` (python3.12).
11. **Save:** `~/Desktop/Julie Anderson Vids/Julia_<Topic>_FINAL.mp4`, `open -R`. Upload to Drive only when asked, final video only.
12. **Record:** add the video to `knowledge-base/content-log.md`; save any new rule to the skill + `knowledge-base/`.

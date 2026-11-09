# Decisions

Dated record of project decisions. Newest decision wins; superseded ones stay listed and are marked.
Provenance: `S` = main session 2026-10-28 (`session-extractions/2026-10-28_ai-influencer-main-session.md`, timestamps UTC), `M` = Claude memory file in `claude-memory/`, `K` = skill file in `~/.claude/skills/ai-influencer/`.

## Setup and storage
| Date | Decision | Status | Source |
|---|---|---|---|
| 2026-10-28 | Install the ai-influencer skill to `~/.claude/skills/ai-influencer` (from `AI Influencer final.zip`, archived in `archive/`) | Current | S 08:24 |
| 2026-10-28 | Connect the existing Video Database Google Sheet (not a new one); Apps Script gained a `videos()` endpoint and was redeployed to the same deployment ID | Current | S |
| 2026-10-28 | Storage mode = Google Drive (`~/.simple-media/storage.json`), local working copy in `~/.simple-media/work/` | Current | S |
| 2026-10-28 | Drive: create a `Not Posted Videos` subfolder; upload **only the final stitched video**, only when asked | Current | S, M `drive-upload-final-video-only` |
| 2026-10-28 | Save finished Julia videos to `~/Desktop/Julie Anderson Vids/` as `Julia_<TopicCamelCase>_FINAL.mp4`, reveal in Finder | Current (supersedes plain-topic naming) | S, M `julia-videos-desktop-folder` |
| 2026-10-28 | "Leave Drive as is, the Desktop copy is enough" — later videos were not uploaded to Drive | Current | S |
| 2026-10-28 | Live backup to `~/Desktop/AI-Influencer-Backup` via a Claude Code Stop hook (rsync -a, no --delete) | Current | S 04:12Z+ |
| 2026-10-28 | `~/SimpleMedia` is the canonical project folder; organized in place (nothing moved) | Current | this audit |

## Character
| Date | Decision | Status | Source |
|---|---|---|---|
| 2026-10-28 | Use Julia Anderson (kit in `Kits/Characters/Julia Anderson/`) for talking-head recipe videos | Current | S 08:35 |
| 2026-10-28 | Locations used: her beachfront kitchen (bible place 1) and a new beach-house deck outdoor kitchen (added to bible §6 as place 6) | Current | S |

## Production method (Google Flow / Omni)
| Date | Decision | Status | Source |
|---|---|---|---|
| 2026-10-28 | Generate in Google Flow (Omni 1.1 Flash, Frames mode, 720p, 9:16; images with Nano Banana Pro, 0 credits) driven through the built-in browser | Current | S |
| 2026-10-28 | Always state the credit cost and wait for a yes before generating clips | Current | S |
| 2026-10-28 | Old Omni prompt ("…as she drops X. She says: …") | **Superseded** — made her act first, talk later | S 09:27, M `ai-influencer-speech-sync` |
| 2026-10-28 | Omni format: "From the very first frame she is already talking while she <action>…" | Current | K `parts/omni-storyboard.md` |
| 2026-10-28 | One clip = one action = whole sentences about that action; never copy the original's word lag | Current | K `parts/script-remix.md`, METHOD #21–23 |
| 2026-10-28 | Copy the original's shot framing (close-ups stay close-ups) | Current (replaces "face always on camera") | K METHOD #25 |
| 2026-10-28 | Face-to-close-up moves use Start + End frames (push-in) | Current, proven | M `omni-start-end-pushin`, K METHOD #26 |
| 2026-10-28 | Standard CTA: "If you liked this video, comment YES, and follow me for more health tips." warm, 6 s | Current | M `standard-cta`, K `parts/script-remix.md` |
| 2026-10-28 | Every ingredient she names visibly goes in on its word; props in real state (bananas peeled) | Current | M `visuals-match-words`, K `parts/omni-storyboard.md` |
| 2026-10-28 | List lines said in one breath; split a crowded line into two clips (banana bread clip 2 → 2a/2b) | Current | K `parts/omni-storyboard.md` |
| 2026-10-28 | Stitch trims to 0.15 s before the first word and 0.3 s after the last (`stitch.py --lead`) | Current | K `scripts/stitch.py`, `parts/stitch.md` |

## Configuration and security
| Date | Decision | Status | Source |
|---|---|---|---|
| 2026-10-28 | The 6 feedback rules are loaded through `@knowledge-base/claude-memory/*.md` imports in `CLAUDE.md`, not copied into Claude memory; new memory rules get copied there and imported | Current | repair session 2026-10-28 |
| 2026-10-28 | Removed the broken `@shared/CLAUDE.md` import from `~/.claude/CLAUDE.md`; kept the Arcads rules and marked them Arcads-only | Current | repair session; original at `~/.claude/CLAUDE.md.bak-2026-10-28` |
| 2026-10-28 | Backup hook also copies the SimpleMedia project memory to `project-config/memory-simplemedia/` | Current | repair session |
| 2026-10-28 | Discord bot token must be rotated by the user (it was exposed in session transcripts) | **Open** | alignment review |

### How to rotate the Discord bot token
1. Go to https://discord.com/developers/applications, pick the Video Database bot's application, then **Bot** → **Reset Token** (confirm, and enter 2FA if asked). Copy the new token. Discord shows it only once.
2. Open `~/video-database-bot/settings.txt` in a text editor and replace the value after `DISCORD_BOT_TOKEN=` (no quotes or spaces). Don't paste it into Claude or any chat.
3. Restart the bot: `launchctl kickstart -k gui/$(id -u)/com.videodatabase.bot.270de9`. Between the reset and this restart, the old token stops working and the LaunchAgent keeps retrying.
4. Check it: `tail -20 ~/video-database-bot/bot.log` should show it logged in. Then drop a test link in the Discord channel.
5. Optional: `chmod 600 ~/video-database-bot/settings.txt`.
The old token in the transcripts and snapshot is useless once it's reset, so those files don't need editing.

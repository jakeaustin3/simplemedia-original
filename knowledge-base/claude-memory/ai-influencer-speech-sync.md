---
name: ai-influencer-speech-sync
description: "AI influencer videos — the character must talk while doing the action, about that same action, in natural unbroken sentences"
metadata:
  node_type: memory
  type: feedback
  originSessionId: f4cf463a-837e-4cd1-b640-712ba761dbc0
  modified: 2026-10-28T09:29:31.755Z
---

For AI influencer / talking-head videos, the character's speech must happen at the same time as the action and describe that exact action. She must sound natural, with no odd pauses.

**Why:** On 2026-10-28 the user called Julia Anderson's first video (Videos row 2 remake, Google Omni in Flow) "terrible". (1) She did each action, then talked 1–2.4 s later. (2) The words described the next step, not the one on screen, because I copied the original reel's lagging offset. (3) Pauses were unnatural: sentences were split across clips, and stitching left silence at the start of clips.

**How to apply:**
- Each clip = one action + whole sentences about that action. Never carry an original video's word/action offset, and never split a sentence across clips.
- Omni prompts say she is already talking from the first frame, during the action.
- Whisper-check the first generated clip (first word within ~0.3 s) before running the rest.
- Stitch with leading-silence trim (`stitch.py --lead`).

These rules are also written into the skill: `parts/omni-storyboard.md`, `parts/script-remix.md`, `rules/METHOD.md` #21–24 and `scripts/stitch.py`. Related: [[drive-upload-final-video-only]]

**Framing (added 2026-10-28):** copy the original's shot framing, not just the action. Its tomato shot is a tight close-up of her palm-up hand squashing the tomato over the counter, face out of frame. Put the original frame beside each generated image before moving on.

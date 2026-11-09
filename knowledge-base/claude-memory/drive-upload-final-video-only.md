---
name: drive-upload-final-video-only
description: "When saving an ai-influencer video to Google Drive, upload only the final stitched video, not the whole working folder"
metadata:
  node_type: memory
  type: feedback
  originSessionId: f4cf463a-837e-4cd1-b640-712ba761dbc0
  modified: 2026-10-28T09:24:18.678Z
---

When the ai-influencer skill's "save to Drive" step runs, upload only the final stitched video (stitched.mp4), into Videos/Not Posted Videos/<Character>/<YYYY-MM>/<Video topic>/. Do not upload clips, images, scripts, JSON or storyboards.

**Why:** On 2026-10-28 I uploaded all 39 working files for Julia Anderson's first video and the user said it was too much; they only wanted the finished video.

**How to apply:** Skip `storage.py save` (it uploads the whole folder); upload just the stitched file. Ask before deleting the local working copy, since Drive will no longer hold the clips and images. Related: [[ai-influencer-setup]]

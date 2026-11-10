---
name: new-character
description: Make a new character in one run, three parts - (1) the look - an AI influencer or a transformation (before-and-after) character; asks her name, age and niche, then blends two reference photos (or one, or a description) into a face lock and a full-body lock on a white wall in tight clothes; for transformation it makes the AFTER first from the photos, then builds the BEFORE from that face (heavier, older skin, whatever the niche needs); (2) the voice - described for ElevenLabs (recommended) or cloned; (3) the character bible - location, features, outfits, places, voice and the never-say list. Use when the student says "/new-character", "new character", "create a character", "make my AI influencer", "before and after character".
---

# /new-character

Three parts, one run, in order. When a part is done, say so in one line and offer the next:
"Her look is saved. Ready to make her voice?" Never skip ahead, never stop between parts unless the
student says so.

1. **The look** · `parts/look.md`
2. **The voice** · `parts/voice.md`
3. **The character bible** · `parts/bible.md`

**Rules for every part**
- One question per message. Offer your best guess.
- Ask nothing you can already see in a photo or already know.
- One prompt goes in the chat as a copy block, with the reference images to attach listed right above
  it. Never hand a prompt over as a file.
- Reference images the student needs go in `~/Downloads/`, numbered in the order to attach them.
- Before anything that costs credits, say the cost and wait for a yes.

**First time only:** if `~/SimpleMedia/Kits/Characters/` is missing, make it (one line to the student):
`mkdir -p ~/SimpleMedia/Kits/Characters ~/SimpleMedia/Kits/Products "~/SimpleMedia/Kits/Side Characters" ~/SimpleMedia/Videos`.
Once you have her name, make her folder: `mkdir -p ~/SimpleMedia/Kits/Characters/<name>/{locks,source,outfits,environments}`.

**Where it's saved:** `~/SimpleMedia/Kits/Characters/<name>/`
```
locks/          01_front_full_body.jpg · 02_front_close_up.jpg
                (transformation: locks/after/ and locks/before/, same two names in each)
outfits/        NN_<outfit>.jpg          (optional, part 3)
environments/   NN_<place>.jpg           (optional, part 3)
source/         the reference photos they gave
character.md    the lines pasted into every prompt, in exactly this shape:
                  Face: …   Body: …   Voice line: …
                  (transformation: AFTER Face/Body, BEFORE Face/Body, then Voice line)
bible.md        the character bible (part 3)
```

---
name: visuals-match-words
description: Every ingredient she names must be visibly added on screen at that moment; props must look right (bananas peeled)
metadata:
  node_type: memory
  type: feedback
  originSessionId: f4cf463a-837e-4cd1-b640-712ba761dbc0
  modified: 2026-10-29T03:35:25.281Z
---

When the character names an ingredient, the viewer must see it go in at that moment: cracking or pouring the eggs, scooping the powder. Things must never just appear in the bowl. Props must also be in their real recipe state, for example bananas fully peeled with no peel on.

**Why:** On 2026-10-28 the user reviewed Julia's sweet potato banana bread video. Clip 1 dropped bananas in with the peel on ("It's supposed to be off"). In clip 2 she said "two eggs", but the eggs were already in the bowl and never cracked in. The user said "make everything sync with her lips."

**How to apply:**
- One clip per added ingredient, or a clip whose action shows each item going in as it's named. Don't put a later ingredient in a start or end frame before she says it.
- In image prompts, say "fully peeled, no peel" (and the equivalent for other props).
- Check frame strips against the word timestamps: each named item appears at its word.

Related: [[ai-influencer-speech-sync]]

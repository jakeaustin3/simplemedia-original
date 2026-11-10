# Part 3 · The character bible

A short Q&A, one question at a time, skipping anything parts 1 and 2 already know:
Name, age and niche were asked in part 1: don't ask again.
1. **Where she lives**, and what she does, in one line.
2. **Anything distinctive:** a mole, glasses, a tattoo, a signature look.
3. **Outfits:** "Want me to make some outfits for her?" Yes: propose 5 that fit her (they edit the list).
   Each one can be just a description, a prompt they run themselves, or a picture Claude makes
   (reference: `locks/01_front_full_body.jpg`; prompt: `Same character, same wall, floor and light, full
   body front, wearing [outfit]. Nothing else changes.`). Save pictures as `outfits/NN_<outfit>.jpg`.
4. **Places:** "Want me to suggest places she films in?" Yes: propose 3 to 5 (her kitchen, a store
   aisle, her car…). Same three choices: description, prompt, or picture (no people in it). Save as
   `environments/NN_<place>.jpg`.

Then write `bible.md`:

```
# <Name> · character bible

## 1 · Who she is
Name · Age · From · Niche · Lives in · What she does · Distinctive features

## 2 · Face
<face description from part 1>   (transformation: AFTER face, then BEFORE face)

## 3 · Body
<body line>   (transformation: AFTER body, then BEFORE body)

## 4 · Locks
locks/02_front_close_up.jpg · locks/01_front_full_body.jpg
(transformation: also locks/after/ and locks/before/)

## 5 · Outfits
| # | Outfit | Description | File |

## 6 · Places
| # | Place | Description | File |

## 7 · Voice
Accent / voice line: <the same Voice line as character.md, word for word>
ElevenLabs voice: <name> (designed / cloned)

## 8 · Never in her scripts
- No medical titles (she is never a doctor, nurse or pharmacist).
- No cure or disease claims.
- No promise of instant results.
- Every later script stays inside these rules.
```

Show it, let them change anything, save it. Then: "<Name> is ready." If this skill was started from a video skill (AI Influencer, Transformation, Long Form), go straight back to that video. Otherwise name the next step: "Next: make her first video with `/ai-influencer`, `/transformation` or `/long-form`."

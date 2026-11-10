# Part 1 · The look

## 1. What kind of character?
"Is this an **AI influencer**, or a **transformation** (before-and-after) character?"

## 2. Tell me about her
"Tell me a little about her: her **name**, her **age**, **where she's from**, and her **niche** (weight loss, skincare, fitness,
a life change…)." One message is enough. Use the niche to decide what the transformation changes.

## 3. Do you have reference images?
- **Yes, two photos (recommended):** "Send me two photos of people you like. I'll blend them into one new
  person, so your character doesn't copy anyone."
- **Yes, one photo:** fine; say once that two photos make her more her own.
- **No:** "Describe how she looks: hair, skin, build, the vibe." Up to three short follow-ups if
  something's missing.
Save the photos in `source/`.

**Transformation: the photos are always for her AFTER look.** Whatever they send, take the face
structure from it and make her the after: slim, model-esque, beautiful, at her age. Say so in one line:
"I'll make her after look first from these, then build her before from that same face."

## 4. Make them yourself, or should I?
"Do you want to make the pictures yourself in Google Flow (Nano Banana Pro), or should I make them for
you in Higgsfield?"
- **By hand:** copy the reference photos to `~/Downloads/` numbered. Give one prompt at a time in the
  chat, with "Attach: 01_…, 02_…" listed right above it, wait for the picture, then the next one.
- **Claude makes them:** check the Higgsfield connector is connected first (if not, offer the by-hand route). Say the cost: about 2 credits per image on Nano Banana Pro, two versions of each lock (check with `get_cost: true`). Wait for a yes; they pick.

**The standard for every lock:** plain clean white wall, soft even daylight, vertical 9:16, real-photo
realism. Full-body locks wear **tight clothing that shows some skin** (a fitted crop top and leggings,
black by default). Outfits come later in the bible, so keep these simple.

---

## AI influencer: two locks

**1 · Face lock** (references: the two photos, or the one photo). Fill every bracket from the photos and
from what you know about her; never leave a line generic.
```
Create a photorealistic portrait of a NEW original character by blending features from the two reference images. BLEND INSTRUCTIONS: Take roughly equal influence from both references. The result must be a distinct new person — not recognizable as either reference individual.

* Face shape: blend [what photo 1 brings] of reference 1 with [what photo 2 brings] of reference 2
* Age: [her age]
* Hair: [length, texture, color, how it falls]
* Eyes: [color, shape, fine lines]
* Skin: natural skin with real texture — visible pores, [fine lines, freckles, unevenness as fits her age]. Absolutely no plastic or airbrushed look.
* Expression: soft closed-mouth smile, relaxed, warm, looking directly into the camera
* Makeup: [minimal and natural, lip color]
* Build: [build]

FRAMING:
* Full frame portrait, head and upper shoulders fill the frame
* Subject centered, facing camera directly
* Shot at eye level
* Vertical 9:16 aspect ratio

BACKGROUND:
* Plain clean white wall
* Even, soft, natural lighting with no harsh shadows
* Background slightly out of focus but not heavily blurred — avoid the artificial bokeh look

CLOTHING:
* Simple fitted top, plain black, scoop neck
* No busy patterns

TECHNICAL:
* Extremely high realism, shot on a real camera
* Sharp focus on the eyes and full face
* Natural skin texture and pore detail
* Realistic hair strands with flyaways, not smooth or plastic
* Soft natural daylight quality
* No filter, no beauty smoothing, no oversaturation
* Photojournalistic realism, like an unedited high-resolution phone selfie in good light

OUTPUT: One photorealistic portrait of an original composite character, full frame, sharp, against a white wall.
```
One photo: start with "Create a photorealistic portrait of the person in the reference image" and drop
the blend instructions. No photo: "Create a photorealistic portrait of a new original character" with
the lines filled from their description.

**2 · Body lock** (reference: the face lock just made):
```
Same person as the reference image, identical face, hair and skin: [one-line face recap]. Full body head to toe, standing squared to the camera, relaxed confident posture, arms relaxed at her sides, soft closed-mouth smile, looking directly into the camera. [Her build, e.g. tall, slim, toned, natural curves]. Wearing a tight-fitting black crop top that shows her midriff and black high-waisted leggings, clean white sneakers. Plain clean white wall and a light floor, even soft natural daylight, no harsh shadows. Vertical 9:16, the whole body in frame with a little space above the head and below the feet. Extremely high realism, shot on a real camera, natural skin texture, realistic hair with flyaways, real fabric creases, no filter, no beauty smoothing, like an unedited high-resolution phone photo in good light.
```
Save as `locks/02_front_close_up.jpg` and `locks/01_front_full_body.jpg`.

---

## Transformation: after first, then before (four locks)

The before and the after need **two different faces of the same person**: one face can't be both. So the
**after** is made first from the photos, and the **before** is built from the after's face.

**1 · After face** (references: the photos): the face lock prompt above, with these lines:
`* Age: [her age]` · `* Build: slim, model-esque, healthy` · and add to Skin: `glowing, well rested`.
She looks her best: the after.

**2 · After body** (reference: the after face): the body lock prompt above, with
`slim, toned, model-esque figure with natural curves` as her build, in the tight black crop top and
leggings.

**3 · Ask about the before** (one question): "For her before, anything you want to stand out? For example
how heavy she is, or how aged her skin looks." Offer the default for the niche:

| Niche | The before (exaggerate it) |
|---|---|
| Weight loss | much heavier: fuller round face, double chin, puffy cheeks; a big soft belly, heavy arms and thighs, obese |
| Skincare | aged, tired skin: deep wrinkles, sagging jawline, dark under-eye circles, uneven tone, dull and dry |
| Fitness | soft and out of shape: no muscle tone, slouched posture, a soft belly |
| Life change | worn down: tired eyes, no makeup, unstyled hair, flat expression |

**4 · Before face** (reference: the after face):
```
Same woman as the reference image: the same bone structure, eye color, eye shape, nose and hairline, so she is clearly the same person. Show her BEFORE: [the before for her niche, exaggerated]. [Hair: same color, flatter and less styled]. Tired, flat expression, looking directly into the camera, no makeup. Head and upper shoulders fill the frame, centered, eye level, vertical 9:16. Plain clean white wall, even soft natural daylight, no harsh shadows. Simple black top. Extremely high realism, shot on a real camera, real skin texture and pores, no filter, no beauty smoothing, like an unedited phone selfie in good light.
```

**5 · Before body** (references: the before face first, the after body second):
```
Same woman as the FIRST reference image, identical face. Full body head to toe in the same pose, framing and white wall as the SECOND reference image, but in her BEFORE state: [the before for her niche, exaggerated, e.g. much heavier, a big soft belly hanging over the waistband, heavy arms and thighs]. Wearing a tight black sports bra and tight black leggings that show her shape. Tired, flat expression, looking directly into the camera. Plain clean white wall and a light floor, even soft natural daylight. Vertical 9:16, the whole body in frame. Extremely high realism, natural skin texture, real fabric tension and creases, no filter, no beauty smoothing, like an unedited phone photo.
```
Save the after pair in `locks/after/` and the before pair in `locks/before/`. **Also copy the after pair into `locks/` itself** (same two names): the video skills read `locks/02_front_close_up.jpg` and `locks/01_front_full_body.jpg` by default
(`02_front_close_up.jpg`, `01_front_full_body.jpg` in each).

---

## Check every lock before keeping it
Real pores and lines, the neck matches the face's age, eyes look wet, flyaway hairs, teeth not
bleach-white, the same skin tone on face, neck and hands. Transformation: the before and after must read
as the same person. Fail: redo that one.

Write the face line(s) and body line(s) into `character.md` (transformation: one pair for BEFORE, one for
AFTER).

Then: "Her look is saved. Ready to make her voice?"

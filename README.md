# Ether Image Studio

[Open Ether Image Studio](https://tonyparker1964.github.io/Ether-Image-Studio/)

Explore 30 image styles and 12 3D looks with visual examples. Choose one style or blend 2, 3 or 4, then set the scene, characters, composition, lighting and film look. The studio builds two prompts: one for the still image and a matching motion prompt to animate it. Settings stay in your browser.

## Create an image

1. Choose your styles, describe your scene and pick a location (or type your own).
2. Optionally include **Ether** and **Element**. Pick Element's form (tiger, earth, water, fire, air or a blend) and tick the box if you're attaching a character sheet. Edit the character descriptions under "Edit character looks" to match your sheets.
3. Pick your image tool:
   - **ChatGPT / Gemini** gives a structured natural-language prompt.
   - **Midjourney** gives a one-line prompt with `--ar` and `--no`. Add character sheets with Midjourney's reference feature.
4. Copy the image prompt and paste it into your tool, attaching any character sheets there.

## Animate it

Under **From still to motion**, choose the video tool (Kling, Sora, Higgsfield or any), duration, camera move and pacing, and describe what happens. Copy the motion prompt and use your generated still as the first frame.

## Notes

This public website builds prompts; it does not call an image API or contain API keys. Style thumbnails are illustrative AI-generated examples. 3D looks produce raster image aesthetics, not editable 3D models.

## Files

- `index.html` is the whole app.
- `assets/styles.webp` is the 6 × 7 thumbnail sprite (200 px tiles, one per style, in list order).
- `assets/og.jpg` is the link-preview image.
- `THUMBNAIL_PROMPTS.md` has matching prompts for 30 more styles (slots 42–71) waiting for thumbnails.

## Hosting

Published through GitHub Pages from the main branch, repository root.

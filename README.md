# Ether Image Studio

[Open Ether Image Studio](https://tonyparker1964.github.io/Ether-Image-Studio/)

Explore 105 looks with visual examples: 51 image styles, 21 3D looks and 33 Japanese anime looks. Choose one or blend 2, 3 or 4, then set the scene, characters, location, composition, lighting and film look. The studio builds two prompts: one for the still image and a matching motion prompt to animate it. Settings stay in your browser.

## Pages

- **Image Studio** (`index.html`) builds the prompts.
- **Explore locations** (`locations.html`) browses all 570 locations with previews, search and categories, then sends your pick to the studio.
- **Japanese Anime** (`anime.html`) browses the 33 anime looks by era, genre and visual approach, then sends your pick to the studio.

## Create an image

1. Choose your styles and describe your scene.
2. Pick a location: 570 options in 12 categories (Futuristic, Fantasy, Urban, Space, Exotic, Nature and more), a "Surprise me" button, or type your own.
3. Add characters:
   - **Scene character:** a preset (boy, girl, adult, elder, tiger, fox, robot, fantasy guardian) or your own. Edit the description to match your character.
   - **Ether and Element:** pick Element's form (tiger, earth, water, fire, air or a blend). Edit both under "Edit character looks".
   - Tick the reference box for any character whose sheet you're attaching.
4. Pick your image tool:
   - **ChatGPT / Gemini** gives a structured natural-language prompt.
   - **Midjourney** gives a one-line prompt with `--ar` and `--no`. Add character sheets with Midjourney's reference feature.
5. Copy the image prompt and paste it into your tool, attaching any character sheets there.

## Animate it

Under **From still to motion**, choose the video tool (Kling, Sora, Higgsfield or any), duration, camera move and pacing, and describe what happens. Copy the motion prompt and use your generated still as the first frame.

## Notes

This public website builds prompts; it does not call an image API or contain API keys. Thumbnails are illustrative AI-generated examples. 3D looks produce raster image aesthetics, not editable 3D models.

## Files

- `index.html`, `locations.html`, `anime.html` are the three pages.
- `locations-data.js` holds the 570 locations; `anime-data.js` holds the 33 anime looks.
- `thumbnails.js` maps each location, anime look and character preset to its tile in an atlas, and lazy-loads previews as they scroll into view.
- `assets/styles.webp` holds the first 42 style thumbnails (6 × 7 grid); `assets/styles-new-1.webp` and `-2.webp` hold styles 42–71 (3 × 5 grids).
- `assets/thumbnails/` holds the location, anime and character atlases (WebP, exact grids).
- `assets/og.jpg` is the link-preview image.
- `THUMBNAIL_PROMPTS.md` has the prompts used for styles 42–71.

Atlases must be exact grids: every tile the same size with no gutters, or previews show slivers of neighboring tiles.

## Hosting

Published through GitHub Pages from the main branch, repository root.

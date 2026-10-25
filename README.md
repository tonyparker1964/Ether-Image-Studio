# Ether Image Studio

[Open Ether Image Studio](https://tonyparker1964.github.io/Ether-Image-Studio/)

Explore 146 looks: 51 image styles, 21 3D looks, 33 Japanese anime looks, 10 donghua and fusion looks, 15 world styles from Korea, France, the USA, Africa, Latin America, India, the Philippines and more, and 16 Ether Visions: cinematic, cosmic and spiritual looks such as Kemet Starpilot, Sacred Geometry Cosmos and Silent Monastery. Choose one or blend 2, 3 or 4, then set the scene, characters, location, composition, lighting and film look. The studio builds two prompts: one for the still image and a matching motion prompt to animate it. Settings stay in your browser.

## Pages

- **Image Studio** (`index.html`) builds the prompts.
- **Explore locations** (`locations.html`) browses all 570 locations with previews, search and categories, then sends your pick to the studio.
- **Japanese Anime** (`anime.html`) browses the 33 anime looks by era, genre and visual approach, then sends your pick to the studio.

## Create an image

1. Choose your styles and describe your scene. **🌍 Surprise world blend** picks a world anime look plus one or two anime or donghua looks for you.
2. Pick a location: 570 options in 12 categories (Futuristic, Fantasy, Urban, Space, Exotic, Nature and more), a "Surprise me" button, or type your own.
3. Add characters:
   - **🎲 New random character:** builds an original person by mixing age, heritage, build, face, hair, eyes, outfit, a prop and personality. Tick **New character every time I copy** to get a different character with each prompt. Ether and Element are never changed.
   - **Heritage:** Random, *Match the style's region* (a Korean manhwa look gives a Korean character, Nordic saga a Nordic one, and so on), or a specific heritage from 11 regions. **More appearance options** adds skin tone and hair texture. These shape the people presets and the random character; typing your own description is never overwritten.
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
- `locations-data.js` holds the 570 locations; `anime-data.js` holds the 33 anime looks; `donghua-data.js` holds the donghua looks; `world-data.js` holds the 15 world styles; `visions-data.js` holds the 16 Ether Visions (gradient thumbnails for now).
- `thumbnails.js` maps each location, anime look and character preset to its tile in an atlas, and lazy-loads previews as they scroll into view.
- `assets/styles.webp` holds the first 42 style thumbnails (6 × 7 grid); `assets/styles-new-1.webp` and `-2.webp` hold styles 42–71 (3 × 5 grids).
- `assets/thumbnails/` holds the location, anime and character atlases (WebP, exact grids).
- `assets/og.jpg` is the link-preview image.
- `THUMBNAIL_PROMPTS.md` has the prompts used for styles 42–71.

Atlases must be exact grids: every tile the same size with no gutters, or previews show slivers of neighboring tiles.

## Hosting

Published through GitHub Pages from the main branch, repository root.

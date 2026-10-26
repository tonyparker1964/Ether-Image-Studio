# Ether Image Studio

[Open Ether Image Studio](https://tonyparker1964.github.io/Ether-Image-Studio/)

Explore 146 looks: 51 image styles, 21 3D looks, 33 Japanese anime looks, 10 donghua and fusion looks, 15 world styles from Korea, France, the USA, Africa, Latin America, India, the Philippines and more, and 16 Ether Visions: cinematic, cosmic and spiritual looks such as Kemet Starpilot, Sacred Geometry Cosmos and Silent Monastery. Choose one or blend 2, 3 or 4, then set the scene, characters, location, composition, lighting and film look. The studio builds two prompts: one for the still image and a matching motion prompt to animate it. Settings stay in your browser.

## Pages

- **Image Studio** (`index.html`) builds the prompts.
- **Characters** (`characters.html`) is your saved cast. Build a character sheet (name, heritage, skin, hair, eyes, outfit, signature items, palette, personality), add a reference sheet plus up to 5 more images (drag and drop or paste; the first is the main sheet), copy a turnaround reference-sheet prompt, and send the character to the studio. **My saved references** at the bottom shows every reference image in one gallery, with **Add to this character**. Saved in your browser; **Export all** makes a backup file and **Import** restores it on any device.
- **Explore locations** (`locations.html`) browses all 570 locations with previews, search and categories, then sends your pick to the studio.
- **Japanese Anime** (`anime.html`) browses the 33 anime looks by era, genre and visual approach, then sends your pick to the studio.

## Create an image

1. Choose your styles and describe your scene. **🌍 Surprise world blend** picks a world anime look plus one or two anime or donghua looks for you.
2. Pick a location: 570 options in 12 categories (Futuristic, Fantasy, Urban, Space, Exotic, Nature and more), a "Surprise me" button, or type your own.
3. Add characters:
   - **🎲 New random character:** builds an original person by mixing age, heritage, build, face, hair, eyes, outfit, a prop and personality. Tick **New character every time I copy** to get a different character with each prompt. Ether and Element are never changed.
   - **Heritage:** Random, *Match the style's region* (a Korean manhwa look gives a Korean character, Nordic saga a Nordic one, and so on), or a specific heritage from 11 regions. **More appearance options** adds skin tone, hair texture (including dreadlocks), height, body type, hair color, eye color, facial hair, glasses, skin details (freckles, vitiligo, birthmarks, scars), tattoos and piercings, and mobility aids (wheelchair, prosthetics, hearing aids, cane, crutches, guide dog), with a one-tap reset. These shape the people presets and the random character; typing your own description is never overwritten. Leave skin tone and hair texture on Any to get a natural range for the chosen heritage, and the prompt tells the image tool not to lighten skin or change hair texture to fit the art style.
   - **Scene character:** 140+ presets in 11 groups (people, adventure and action, fantasy people, sci-fi and future, everyday and modern, music dance and sports, myth and spirit, animals, fantasy creatures, robots and tech, companions), with a search box, or your own. People presets take on the heritage you pick; animals, creatures and robots are fixed original designs. Edit any description to match your character.
   - **Ether and Element:** pick Element's form (tiger, earth, water, fire, air or a blend). Edit both under "Edit character looks".
   - **My characters** at the top of the Scene character menu lists your saved sheets (📎 means it has reference images). **💾 Save to My characters** saves whatever character is in the studio.
   - **Reference sheets:** the scene character, Ether and Element each have a **+ Add reference sheet** slot (tap, drag and drop, or paste). Adding one ticks the reference box; **Copy image** or **Download** it to attach in your image tool. A saved character's sheet is shared with the Characters page.
   - **📎 My saved references** (bottom of the Cast step) shows every saved reference image. Tap to view full size, Copy, Download, Delete, or **Use for…** the scene character, Ether or Element.
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

- `index.html`, `characters.html`, `locations.html`, `anime.html`, `donghua.html`, `world.html` are the pages.
- `refs-gallery.js` is the shared "My saved references" gallery.
- `characters-store.js` saves character sheets (details in localStorage, reference images in IndexedDB) and is shared by the studio and the Characters page.
- `locations-data.js` holds the 570 locations; `anime-data.js` holds the 33 anime looks; `donghua-data.js` holds the donghua looks; `world-data.js` holds the 15 world styles; `visions-data.js` holds the 16 Ether Visions (gradient thumbnails for now).
- `thumbnails.js` maps each location, anime look and character preset to its tile in an atlas, and lazy-loads previews as they scroll into view.
- `assets/styles.webp` holds the first 42 style thumbnails (6 × 7 grid); `assets/styles-new-1.webp` and `-2.webp` hold styles 42–71 (3 × 5 grids).
- `assets/thumbnails/` holds the location, anime and character atlases (WebP, exact grids).
- `assets/og.jpg` is the link-preview image.
- `THUMBNAIL_PROMPTS.md` has the prompts used for styles 42–71.

Atlases must be exact grids: every tile the same size with no gutters, or previews show slivers of neighboring tiles.

## Hosting

Published through GitHub Pages from the main branch, repository root.

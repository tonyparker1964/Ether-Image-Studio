# Ether Image Studio

A browser-based creative dashboard with 30 image styles, 12 3D looks, and blends of exactly 2, 3, or 4 styles. Includes visual examples, custom blend weights, cinematic direction, and prompt copying. Settings stay in your browser.

## Run locally

Run `python3 -m http.server 8000` in this folder and open http://localhost:8000.

## Publish on GitHub Pages

1. Create a repository named `ether-image-studio`.
2. Upload `index.html` and `.nojekyll` to the repository root.
3. In repository Settings → Pages, choose Deploy from a branch, select `main` and `/ (root)`, and save.
4. GitHub provides the published URL after deployment.

## Image generation

This static version builds prompts. Copy a prompt into ChatGPT or another image generator to create the image. It does not call an image API or include API keys. Direct generation requires a separately hosted backend that keeps credentials on the server.

Style thumbnails are illustrative AI-generated examples. 3D looks produce image aesthetics, not editable meshes.

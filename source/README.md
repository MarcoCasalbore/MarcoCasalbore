# Profile cover

An eight-second loop of an abstract signal network. It is artwork, not a visualization of experimental results. The name and affiliation stay still. GitHub displays a GIF; the README also provides a PNG and a reduced-motion picture source.

## Edit and render

Requires Node.js 22+, Chromium and FFmpeg. From the repository root:

```sh
npm install --no-save --package-lock=false hyperframes@0.8.185 gsap@3.14.2
node -e "const fs=require('node:fs');fs.mkdirSync('source/assets',{recursive:true});fs.copyFileSync('node_modules/gsap/dist/gsap.min.js','source/assets/gsap.min.js')"
node source/check.mjs
cd source
npx hyperframes check --json
npx hyperframes preview
npx hyperframes render --quality delivery --fps 30 --output ../assets/profile.mp4
cd ..
ffmpeg -y -i assets/profile.mp4 -vf "fps=12,scale=960:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=48:stats_mode=full[p];[b][p]paletteuse=dither=none:diff_mode=rectangle" -loop 0 assets/profile.gif
ffmpeg -y -ss 2 -i assets/profile.mp4 -frames:v 1 assets/profile.png
```

The CLI resolves Inter and IBM Plex Mono through its font cache. Set `DO_NOT_TRACK=1` to disable HyperFrames telemetry. Generated dependency files and local render reports are ignored by Git.

The composition is 1920 × 720. Edit the copy and drawing in [cover.html](compositions/cover.html). The check exercises all drawing frames and verifies that the geometry closes at the loop boundary.

## Content sources

- Biography, research topics, tools and institutional email: [the previous profile README](https://github.com/MarcoCasalbore/MarcoCasalbore/blob/95f65ffbd980979e98bcf078c34423efd48ab5d4/README.md).
- ORCID: the public [GitHub profile](https://github.com/MarcoCasalbore).
- Project description: [Graph Water Recon](https://github.com/MarcoCasalbore/Graph-water-recon).
- Visual reference: [Matteo Di Salvo's profile](https://github.com/matteodisalvo). This cover uses original artwork and layout; no assets or biography were copied.

The former LinkedIn URL contained a space and did not identify a valid profile. It is omitted until a confirmed URL is available.

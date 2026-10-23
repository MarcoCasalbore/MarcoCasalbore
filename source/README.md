# Profile cover

The cover is an animated SVG: a circular shaded sphere, rotating meridians, and a point of light following an orbit. It is decorative artwork, not experimental data. The name and affiliation remain still.

SVG keeps edges sharp at any display size and avoids GIF compression. The README uses `profile-static.svg` when the browser requests reduced motion, and includes a direct link to that still cover.

## Edit

Requires Node.js; no packages or build service are needed.

```sh
node source/make-cover.mjs
```

This generates both SVGs in `assets/`. Edit the typography, colours and geometry in the generator. Its assertions check the loop boundary and reject invalid numeric output or embedded scripts. The sphere's silhouette is a circle with a constant radius; the meridians rotate without changing that radius.

To preview locally, serve the repository with any static HTTP server and open `source/preview.html`. The animation uses SVG SMIL, runs for 16 seconds per loop, and has no external assets or JavaScript in the delivered image.

## Content sources

Biography, institutional email and the original tool badges come from [the previous profile README](https://github.com/MarcoCasalbore/MarcoCasalbore/blob/95f65ffbd980979e98bcf078c34423efd48ab5d4/README.md).

Research topics were checked against the author's `paperi` archive, its bibliography and these manuscripts:

- *Hybrid Quantum-Classical Framework for Anomaly Detection in Time Series with QUBO Formulation and QAOA.*
- *From Telemetry to Network Diagnostics: Supporting Operators in Massive IoT over LoRaWAN.*
- *Predictive Gateway Selection for Downlink Traffic in LoRaWAN Networks.*
- *TwinAI: A Digital Twin and Graph Reinforcement Learning Framework for Real-Time Management of Water Distribution Networks.*

The profile describes research topics without making claims about publication status or results. The archive, manuscripts and CV are not included in this repository. The archive also supplies the [Google Scholar](https://scholar.google.com/citations?user=tQ9WvasAAAAJ) and [Sapienza](https://iris.uniroma1.it/cris/rp/rp351408) profile links.

Visual reference: [Matteo Di Salvo's profile](https://github.com/matteodisalvo). The artwork and implementation here are original.

The previous LinkedIn URL was malformed and remains omitted pending a confirmed address.

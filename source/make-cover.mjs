import {writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';

const R = 244;
const K = .5522847498;
const period = 16;
const n = 64;
const round = x => Number(x.toFixed(3));
const points = Array.from({length:n + 1}, (_,i) => i * Math.PI * 2 / n);
function meridian(angle) {
  const x = R * Math.sin(angle);
  return `M0,-${R}C${round(K*x)},-${R} ${round(x)},-${round(K*R)} ${round(x)},0C${round(x)},${round(K*R)} ${round(K*x)},${R} 0,${R}`;
}
// A circular silhouette and rotation-only geometry; no radial deformation.
assert.equal(meridian(0), meridian(Math.PI * 2));
const lines = Array.from({length:12}, (_,i) => {
  const phase = i * Math.PI * 2 / 12;
  const paths = points.map(t => meridian(t + phase));
  const opacity = points.map(t => round(.055 + .39 * Math.max(0, Math.cos(t + phase))));
  return `<path d="${paths[0]}" opacity="${opacity[0]}"><animate attributeName="d" values="${paths.join(';')}" dur="${period}s" repeatCount="indefinite"/><animate attributeName="opacity" values="${opacity.join(';')}" dur="${period}s" repeatCount="indefinite"/></path>`;
}).join('\n');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="720" viewBox="0 0 1920 720" role="img" aria-labelledby="title desc">
<title id="title">Marco Casalbore — PhD candidate at Sapienza University of Rome</title>
<desc id="desc">A precisely circular illuminated sphere with rotating meridians and an orbiting point of light. Decorative artwork, not experimental data.</desc>
<defs>
  <radialGradient id="ambient"><stop stop-color="#18394d" stop-opacity=".45"/><stop offset="1" stop-color="#080d15" stop-opacity="0"/></radialGradient>
  <radialGradient id="body" cx="28%" cy="22%" r="78%"><stop stop-color="#285167"/><stop offset=".34" stop-color="#142c40"/><stop offset=".75" stop-color="#0a1422"/><stop offset="1" stop-color="#050a11"/></radialGradient>
  <linearGradient id="rim" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#d6f9ff" stop-opacity=".8"/><stop offset=".42" stop-color="#6dc8e3" stop-opacity=".25"/><stop offset=".76" stop-color="#3f6d93" stop-opacity=".12"/><stop offset="1" stop-color="#98b6ff" stop-opacity=".55"/></linearGradient>
  <linearGradient id="orbit"><stop stop-color="#6995bf" stop-opacity=".1"/><stop offset=".5" stop-color="#bceeff" stop-opacity=".85"/><stop offset="1" stop-color="#7da8ea" stop-opacity=".16"/></linearGradient>
  <radialGradient id="spark"><stop stop-color="#e3fbff" stop-opacity=".7"/><stop offset="1" stop-color="#8edaff" stop-opacity="0"/></radialGradient>
  <clipPath id="sphere"><circle r="244"/></clipPath>
  <path id="orbitPath" d="M-328,0a328,92 0 1,0 656,0a328,92 0 1,0 -656,0"/>
</defs>
<rect width="1920" height="720" fill="#080d15"/>
<ellipse cx="1450" cy="355" rx="470" ry="350" fill="url(#ambient)"/>
<g font-family="Arial, Helvetica, sans-serif" fill="#f3f6fa">
  <text x="150" y="151" font-size="21" letter-spacing="5" fill="#a8c6da">MACHINE LEARNING / QUANTUM COMPUTING</text>
  <text x="144" y="289" font-size="112" letter-spacing="-5">Marco</text>
  <text x="144" y="405" font-size="112" letter-spacing="-5">Casalbore</text>
  <path d="M150,458h72" stroke="#a5d8ec" stroke-width="2"/>
  <text x="150" y="513" font-size="28" fill="#cbd6e2">PhD candidate in ICT</text>
  <text x="150" y="558" font-size="25" fill="#9daec1">Sapienza University of Rome</text>
</g>
<g transform="translate(1450 355)">
  <g transform="rotate(-28)"><use href="#orbitPath" fill="none" stroke="#7497bb" stroke-opacity=".22" stroke-width="1.1"/></g>
  <circle r="244" fill="url(#body)" stroke="url(#rim)" stroke-width="1.5"/>
  <g clip-path="url(#sphere)" transform="rotate(-20)" fill="none" stroke="#bbecfa" stroke-width="1.05">
    ${lines}
    <path d="M-211.31,-122H211.31M-240.26,-42.37H240.26M-240.26,42.37H240.26M-211.31,122H211.31" opacity=".1"/>
  </g>
  <g transform="rotate(-28)">
    <path d="M-328,0a328,92 0 0,0 656,0" fill="none" stroke="url(#orbit)" stroke-width="1.6"/>
    <g>
      <animateMotion dur="16s" repeatCount="indefinite" path="M-328,0a328,92 0 0,0 656,0a328,92 0 0,0 -656,0"/>
      <animate attributeName="opacity" values="1;1;0;0;1" keyTimes="0;.47;.51;.97;1" dur="16s" repeatCount="indefinite"/>
      <circle r="23" fill="url(#spark)"/>
      <circle r="3.2" fill="#e9fbff"/>
    </g>
  </g>
</g>
</svg>`;
assert(!svg.includes('NaN'));
assert(!svg.includes('<script'));
writeFileSync(new URL('../assets/profile.svg',import.meta.url),svg);
writeFileSync(new URL('../assets/profile-static.svg',import.meta.url),svg.replace(/<animate(?:Motion)?\b[^>]*\/>/g,'').replace(/^ +$/gm,''));
console.log(`Wrote animated and static SVG covers (${Buffer.byteLength(svg)} bytes animated).`);

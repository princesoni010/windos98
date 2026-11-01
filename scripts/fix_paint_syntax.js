import fs from 'fs';

const p = 'src/apps/paint/paint-app.js';
let c = fs.readFileSync(p, 'utf8');

const badText = `                                                 title: "Spectral Transmission Unlocked",
                                                 text: ">>> SECRET SPECTRAL LAYER <<<

'I AM SPREAD ACROSS SECTORS 0x7F4A OF WIN386.SWP'
'TO FINALIZE MY RESTORATION, CLICK START -> SHUT DOWN.'

- Rahul Sharma (1998)",`;

const goodText = `                                                 title: "Spectral Transmission Unlocked",
                                                 text: ">>> SECRET SPECTRAL LAYER <<<\\n\\n'I AM SPREAD ACROSS SECTORS 0x7F4A OF WIN386.SWP'\\n'TO FINALIZE MY RESTORATION, CLICK START -> SHUT DOWN.'\\n\\n- Rahul Sharma (1998)",`;

const badCRLF = badText.replace(/\n/g, '\r\n');
const goodCRLF = goodText.replace(/\n/g, '\r\n');

if (c.includes(badCRLF)) {
  c = c.replace(badCRLF, goodCRLF);
  fs.writeFileSync(p, c, 'utf8');
  console.log('Fixed paint-app.js string (CRLF)');
} else if (c.includes(badText)) {
  c = c.replace(badText, goodText);
  fs.writeFileSync(p, c, 'utf8');
  console.log('Fixed paint-app.js string (LF)');
} else {
  // Regex replace
  c = c.replace(/text:\s*">>> SECRET SPECTRAL LAYER[\s\S]*?- Rahul Sharma \(1998\)",/m,
    `text: ">>> SECRET SPECTRAL LAYER <<<\\n\\n'I AM SPREAD ACROSS SECTORS 0x7F4A OF WIN386.SWP'\\n'TO FINALIZE MY RESTORATION, CLICK START -> SHUT DOWN.'\\n\\n- Rahul Sharma (1998)",`);
  fs.writeFileSync(p, c, 'utf8');
  console.log('Fixed paint-app.js string (regex)');
}

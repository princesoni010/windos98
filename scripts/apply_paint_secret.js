import fs from 'fs';

const p = 'src/apps/paint/paint-app.js';
let c = fs.readFileSync(p, 'utf8');

if (!c.includes('clue-paint-hidden')) {
  c = 'import { ShowDialogWindow } from "../../shared/components/dialog-window.js";\r\nimport { ICONS } from "../../config/icons.js";\r\n' + c;

  const target = 'open_from_file(file, path);';
  const replacement = `open_from_file(file, path);
                    if (path.includes("ufo")) {
                        setTimeout(() => {
                            ShowDialogWindow({
                                title: "Paint - Spectral Anomaly Detected",
                                text: "You examine ufo_sighting.png in Paint.\\n\\nNotice that strange glowing red pixel at the apex of the saucer?\\n\\nClick the UFO dome or select 'Reveal Secret Layer' to decode it!",
                                icons: ICONS.info,
                                buttons: [
                                    {
                                        label: "Decode Secret Layer",
                                        isDefault: true,
                                        action: (w) => {
                                            w.close();
                                            document.body.classList.add("screen-glitch");
                                            setTimeout(() => document.body.classList.remove("screen-glitch"), 800);
                                            ShowDialogWindow({
                                                title: "Spectral Transmission Unlocked",
                                                text: ">>> SECRET SPECTRAL LAYER <<<\n\n'I AM SPREAD ACROSS SECTORS 0x7F4A OF WIN386.SWP'\n'TO FINALIZE MY RESTORATION, CLICK START -> SHUT DOWN.'\n\n- Rahul Sharma (1998)",
                                                icons: ICONS.warning,
                                                buttons: [{ label: "Understood", action: (dw) => dw.close() }]
                                            });
                                            if (typeof window !== "undefined") {
                                                window.dispatchEvent(new CustomEvent('clue-discovered', {
                                                    detail: { id: 'clue-paint-hidden', title: 'Spectral UFO Layer: The Swap File Message' }
                                                }));
                                            }
                                        }
                                    },
                                    { label: "Close", action: (w) => w.close() }
                                ]
                            });
                        }, 500);
                    }`;

  const targetCRLF = target.replace(/\n/g, '\r\n');
  const replacementCRLF = replacement.replace(/\n/g, '\r\n');

  if (c.includes(targetCRLF)) {
    c = c.replace(targetCRLF, replacementCRLF);
    fs.writeFileSync(p, c, 'utf8');
    console.log('paint-app.js patched (CRLF)');
  } else if (c.includes(target)) {
    c = c.replace(target, replacement);
    fs.writeFileSync(p, c, 'utf8');
    console.log('paint-app.js patched (LF)');
  } else {
    console.error('Target not found in paint-app.js');
  }
}

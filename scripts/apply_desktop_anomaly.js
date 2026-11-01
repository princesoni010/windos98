import fs from 'fs';

const p = 'src/shell/explorer/interface/desktop-context-menu-builder.js';
let c = fs.readFileSync(p, 'utf8');

if (!c.includes('Inspect Anomaly...')) {
  c = 'import { ShowDialogWindow } from "../../../shared/components/dialog-window.js";\r\nimport { ICONS } from "../../../config/icons.js";\r\n' + c;

  const target = `      "MENU_DIVIDER",
      {
        label: "Properties",
        action: () => launchDisplayPropertiesApp(),
      },`;

  const replacement = `      "MENU_DIVIDER",
      {
        label: "Inspect Anomaly...",
        action: () => {
          document.body.classList.add("screen-glitch");
          setTimeout(() => document.body.classList.remove("screen-glitch"), 800);
          ShowDialogWindow({
            title: "Wallpaper Inspection - Anomaly Detected",
            text: "You examine the desktop teal wallpaper closely...\\n\\nTucked behind the virtual desktop icons is a scratch etched in pencil:\\n'THE 1420.405 MHz CARRIER PEAKS AT 03:33 AM.'\\n'Bunty, do not let them format this drive!'",
            icons: ICONS.info,
            buttons: [{ label: "Fascinating", action: (w) => w.close() }]
          });
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent('clue-discovered', {
              detail: { id: 'clue-anomaly-wallpaper', title: 'Wallpaper Scratches: 1420 MHz' }
            }));
          }
        }
      },
      "MENU_DIVIDER",
      {
        label: "Properties",
        action: () => launchDisplayPropertiesApp(),
      },`;

  const targetCRLF = target.replace(/\n/g, '\r\n');
  const replacementCRLF = replacement.replace(/\n/g, '\r\n');

  if (c.includes(targetCRLF)) {
    c = c.replace(targetCRLF, replacementCRLF);
    fs.writeFileSync(p, c, 'utf8');
    console.log('desktop-context-menu-builder.js patched (CRLF)');
  } else if (c.includes(target)) {
    c = c.replace(target, replacement);
    fs.writeFileSync(p, c, 'utf8');
    console.log('desktop-context-menu-builder.js patched (LF)');
  } else {
    console.error('Target not found in desktop-context-menu-builder.js');
  }
}


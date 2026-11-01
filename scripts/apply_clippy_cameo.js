import fs from 'fs';

const p = 'src/system/clue-tracker.js';
let c = fs.readFileSync(p, 'utf8');

if (!c.includes('Clippy Assistant')) {
  const target = 'this.showClueNotification(clueId, title);';
  const replacement = `this.showClueNotification(clueId, title);

      if (list.length === 3) {
        setTimeout(() => {
          ShowDialogWindow({
            title: "Clippy Assistant",
            text: "📎 IT LOOKS LIKE YOU'RE TRYING TO SOLVE A 26-YEAR-OLD MISSING PERSON CASE!\\n\\nWould you like help with:\\n• Formatting an alien abduction report?\\n• Checking passwords.txt for canteen samosas?\\n• Hiding in the swap file?",
            icons: ICONS.info,
            buttons: [
              { label: "Thanks Clippy", action: (w) => w.close() },
              { label: "Go Away Clippy", action: (w) => w.close() }
            ]
          });
        }, 1500);
      }`;

  c = c.replace(target, replacement);
  fs.writeFileSync(p, c, 'utf8');
  console.log('clue-tracker.js patched with Clippy cameo');
}

import fs from 'fs';

const p = 'src/system/os-init.js';
let c = fs.readFileSync(p, 'utf8');

if (!c.includes('clue-tracker.js')) {
  c = 'import { ClueTracker } from "./clue-tracker.js";\r\n' + c;
  c = c.replace('taskbar.init();', 'taskbar.init();\r\n          ClueTracker.init();');
  fs.writeFileSync(p, c, 'utf8');
  console.log('os-init.js patched with ClueTracker.init()');
}

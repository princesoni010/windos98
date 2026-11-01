import fs from 'fs';

const p = 'src/apps/paint/paint-app.js';
let c = fs.readFileSync(p, 'utf8');

c = c.replace('import { ShowDialogWindow } from "../../shared/components/dialog-window.js";\r\nimport { ICONS } from "../../config/icons.js";\r\n',
  'import { ShowDialogWindow } from "../../shared/components/dialog-window.js";\r\n');
c = c.replace('import { ShowDialogWindow } from "../../shared/components/dialog-window.js";\nimport { ICONS } from "../../config/icons.js";\n',
  'import { ShowDialogWindow } from "../../shared/components/dialog-window.js";\n');

fs.writeFileSync(p, c, 'utf8');
console.log('Removed duplicate ICONS import in paint-app.js');

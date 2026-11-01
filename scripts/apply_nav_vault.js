import fs from 'fs';

const p = 'src/shell/explorer/navigation/navigation-controller.js';
let c = fs.readFileSync(p, 'utf8');

if (!c.includes('vault-dialog.js')) {
  c = 'import { checkProjectXAccess } from "../../../../system/vault-dialog.js";\r\n' + c;
  
  const target = 'const stats = await ShellManager.stat(normalizedPath);';
  const replacement = `if (normalizedPath.toLowerCase().includes("project_x")) {
        const canAccess = await checkProjectXAccess();
        if (!canAccess) return;
      }

      const stats = await ShellManager.stat(normalizedPath);`;

  c = c.replace(target, replacement.replace(/\n/g, '\r\n'));
  fs.writeFileSync(p, c, 'utf8');
  console.log('navigation-controller.js patched with project_x password protection');
}

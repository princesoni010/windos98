import fs from 'fs';

const p = 'src/system/zenfs-init.js';
let c = fs.readFileSync(p, 'utf8');

if (!c.includes('story-files-init.js')) {
  c = 'import { initStoryFiles } from "./story-files-init.js";\r\n' + c;
  c = c.replace('isInitialized = true;', 'await initStoryFiles();\r\n    isInitialized = true;');
  fs.writeFileSync(p, c, 'utf8');
  console.log('zenfs-init.js updated with initStoryFiles');
}

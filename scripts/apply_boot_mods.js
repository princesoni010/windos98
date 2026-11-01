import fs from 'fs';
import path from 'path';

// 1. Update boot-screen.js
const bootScreenPath = 'src/system/boot-screen.js';
let bootScreenCode = fs.readFileSync(bootScreenPath, 'utf8');

if (!bootScreenCode.includes('Host: RAHUL_1998')) {
  bootScreenCode = bootScreenCode.replace(
    'terminal.write("\\x1b[2;5HCopyright (C) 1984-85, Award Software, Inc.");',
    'terminal.write("\\x1b[2;5HCopyright (C) 1984-98, Award Software, Inc.");\r\n    terminal.write("\\x1b[3;5HSystem: Rahul-Pentium-II 350MHz | Host: RAHUL_1998");'
  );
  fs.writeFileSync(bootScreenPath, bootScreenCode, 'utf8');
  console.log('Updated boot-screen.js');
}

// 2. Update os-init.js to add memory check, warning, and Starting Windows 98
const osInitPath = 'src/system/os-init.js';
let osInitCode = fs.readFileSync(osInitPath, 'utf8');

const targetAnchor = 'await executeBootStep(async () => {\r\n      let logElement = startBootProcessStep("Detecting mouse...");';
const targetAnchorLF = 'await executeBootStep(async () => {\n      let logElement = startBootProcessStep("Detecting mouse...");';

const memoryAndWarningSteps = `    // Fake Memory Check (Award BIOS Style)
    await executeBootStep(async () => {
      let logElement = startBootProcessStep("Testing system memory (64MB Installed)...");
      try {
        const memLevels = [16384, 32768, 49152, 65536];
        for (const kb of memLevels) {
          if (logElement && logElement.firstChild) {
            logElement.firstChild.nodeValue = \`Testing system memory: \${kb}KB OK\`;
          }
          await new Promise((resolve) => setTimeout(resolve, 80));
        }
        finalizeBootProcessStep(logElement, "OK");
      } catch (e) {
        finalizeBootProcessStep(logElement, "FAILED", e);
      }
    });

    // Primary IDE Drive Detection
    await executeBootStep(async () => {
      let logElement = startBootProcessStep("Detecting Primary Master: QUANTUM FIREBALL 3.2GB...");
      await new Promise((resolve) => setTimeout(resolve, 150));
      finalizeBootProcessStep(logElement, "OK");
    });

    // Story Warning: 26 years ago!
    await executeBootStep(async () => {
      const term = getTerminal();
      if (term) {
        term.write("\\r\\n\\x1b[33;1m[!]\x1b[0m \\x1b[1;37mWARNING: User profile corrupted.\\x1b[0m\\r\\n");
        term.write("    \\x1b[31;1mLast login: 26 years ago (User: Rahul_1998)\\x1b[0m\\r\\n");
        term.write("    \\x1b[36mRecovering uncommitted swap file fragments... [DONE]\\x1b[0m\\r\\n\\r\\n");
      }
      await new Promise((resolve) => setTimeout(resolve, 700));
    });

`;

if (!osInitCode.includes('Testing system memory')) {
  if (osInitCode.includes(targetAnchor)) {
    osInitCode = osInitCode.replace(targetAnchor, memoryAndWarningSteps + targetAnchor);
  } else if (osInitCode.includes(targetAnchorLF)) {
    osInitCode = osInitCode.replace(targetAnchorLF, memoryAndWarningSteps + targetAnchorLF);
  } else {
    console.error('Target anchor for os-init.js not found!');
  }

  // Update azOS Ready! to Starting Windows 98...
  osInitCode = osInitCode.replace('startBootProcessStep("azOS Ready!");', 'startBootProcessStep("Starting Windows 98...");');

  fs.writeFileSync(osInitPath, osInitCode, 'utf8');
  console.log('Updated os-init.js with memory check, 26-year warning, and Windows 98 startup');
}

import fs from 'fs';

const p = 'src/system/dos-shell.js';
let c = fs.readFileSync(p, 'utf8');

const target = 'switch (cmd.toLowerCase()) {';
const replacement = `switch (cmd.toLowerCase()) {
      case "rahul":
        this.terminal.write("\\r\\n\\x1b[36m===================================================\\x1b[0m\\r\\n");
        this.terminal.write("\\x1b[1;33m>>> IDENTITY ARCHIVE: RAHUL SHARMA (RAHUL_1998) <<<\\x1b[0m\\r\\n");
        this.terminal.write("Status: Swapped into WIN386.SWP virtual memory.\\r\\n");
        this.terminal.write("Last Physical Login: October 24, 1998 @ 03:33:00 AM\\r\\n");
        this.terminal.write("Carrier Frequency: 1420.405 MHz (Hydrogen Line)\\r\\n");
        this.terminal.write("Vault Hint: Y2K year (2000) + mom's email snack (samosa)\\r\\n");
        this.terminal.write("\\x1b[36m===================================================\\x1b[0m\\r\\n");
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent('clue-discovered', { detail: { id: 'clue-dos-decode', title: 'Terminal Dossier: Rahul_1998' } }));
        }
        break;

      case "decode":
        this.terminal.write("\\r\\n\\x1b[32m[DECODING HYDROGEN LINE PACKET 0x7F4A...]\\x1b[0m\\r\\n");
        this.terminal.write("0x0000: 48 45 4C 50  20 4D 45 20  [HELP ME ]\\r\\n");
        this.terminal.write("0x0008: 53 48 55 54  44 4F 57 4E  [SHUTDOWN]\\r\\n");
        this.terminal.write("0x0010: 54 4F 20 46  52 45 45 20  [TO FREE ]\\r\\n");
        this.terminal.write("0x0018: 52 41 48 55  4C 21 21 00  [RAHUL!!.]\\r\\n");
        this.terminal.write("\\x1b[1;37m>>> DECRYPTION COMPLETE: Use Start -> Shut Down to set me free! <<<\\x1b[0m\\r\\n");
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent('clue-discovered', { detail: { id: 'clue-dos-decode', title: 'Terminal Demodulator: Packet 0x7F4A' } }));
        }
        break;

      case "matrix":
        this.terminal.write("\\r\\n\\x1b[32mWake up, Neo... The Matrix has you in 1998.\\x1b[0m\\r\\n");
        this.terminal.write("\\x1b[32m01010010 01000001 01001000 01010101 01001100\\x1b[0m\\r\\n");
        break;

      case "signal":
        this.terminal.write("\\r\\n\\x1b[33m   /\\\\  1420.405 MHz PEAK DETECTED\\x1b[0m\\r\\n");
        this.terminal.write("  /  \\\\    /\\\\    /\\\\        /\\\\_/\\r\\n");
        this.terminal.write("_/    \\\\__/  \\\\__/  \\\\______/   \\r\\n");
        this.terminal.write("Telemetry Lock: RAHUL_1998 CONSCIOUSNESS DETECTED.\\r\\n");
        break;

      case "bsod":
      case "crash":
        this.terminal.write("Triggering fatal kernel crash...\\r\\n");
        import("./bsod.js").then(m => m.triggerBSOD());
        break;`;

if (c.includes(target)) {
  c = c.replace(target, replacement.replace(/\n/g, '\r\n'));
  fs.writeFileSync(p, c, 'utf8');
  console.log('dos-shell.js patched with easter egg commands');
} else {
  console.error('Target not found in dos-shell.js');
}


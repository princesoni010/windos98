import fs from 'fs';

const p = 'src/apps/minesweeper/minesweeper-app.js';
let c = fs.readFileSync(p, 'utf8');

const target = `    if (result === "mine") {
      this.game.isGameOver = true;
      this.explodedMine = { x: parseInt(x), y: parseInt(y) };
      this.stopTimer();
      this.smileyEl.css(
        "backgroundImage",
        \`url(\${new URL("./assets/minesweeper-smiley-lose.png", import.meta.url).href})\`,
      );
      this.renderBoard();`;

const replacement = `    if (result === "mine") {
      this.game.isGameOver = true;
      this.explodedMine = { x: parseInt(x), y: parseInt(y) };
      this.stopTimer();
      this.smileyEl.css(
        "backgroundImage",
        \`url(\${new URL("./assets/minesweeper-smiley-lose.png", import.meta.url).href})\`,
      );
      this.renderBoard();

      setTimeout(() => {
        ShowDialogWindow({
          title: "Game Over - Rahul_1998",
          text: "BOOM! RAHUL DID NOT SURVIVE THIS MINEFIELD EITHER.\\n\\nRahul's ghost whispers:\\n'I stepped on a memory exception 26 years ago... Be careful.'",
          icons: ICONS.warning,
          buttons: [{ label: "Try Again", action: (w) => w.close() }]
        });
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent('clue-discovered', {
            detail: { id: 'clue-minesweeper', title: 'Minesweeper: Rahul Did Not Survive' }
          }));
        }
      }, 300);`;

const targetCRLF = target.replace(/\n/g, '\r\n');
const replacementCRLF = replacement.replace(/\n/g, '\r\n');

if (c.includes(targetCRLF)) {
  c = c.replace(targetCRLF, replacementCRLF);
  fs.writeFileSync(p, c, 'utf8');
  console.log('minesweeper-app.js patched (CRLF)');
} else if (c.includes(target)) {
  c = c.replace(target, replacement);
  fs.writeFileSync(p, c, 'utf8');
  console.log('minesweeper-app.js patched (LF)');
} else {
  console.error('Target not found in minesweeper-app.js');
}

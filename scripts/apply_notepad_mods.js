import fs from 'fs';

const p = 'src/apps/notepad/notepad-app.js';
let c = fs.readFileSync(p, 'utf8');

const target = `            onInput: () => {
                this.isDirty = true;
                this.updateTitle();
            }`;

const targetCRLF = `            onInput: () => {\r\n                this.isDirty = true;\r\n                this.updateTitle();\r\n            }`;

const replacement = `            onInput: () => {
                this.isDirty = true;
                this.updateTitle();

                const text = this.editor.getContent();
                if (!this._helloRahulTriggered && /HELLO\\s+RAHUL/i.test(text)) {
                    this._helloRahulTriggered = true;
                    setTimeout(() => {
                        const reply = "\\r\\n\\r\\n" +
                            "===================================================================\\r\\n" +
                            "[COM1 VIRTUAL TTY - RAHUL_1998 SIGNAL DETECTED]\\r\\n" +
                            "WHO IS TYPING? ARE YOU LOGGED INTO MY COMPUTER AFTER 26 YEARS?\\r\\n" +
                            "I AM TRAPPED INSIDE WIN386.SWP SECTOR 0x7F4A.\\r\\n" +
                            "BUNTY THREW MY CONFESSION INTO THE RECYCLE BIN.\\r\\n" +
                            "CHECK passwords.txt FOR MY PROJECT_X PASSCODE (2000samosa)!\\r\\n" +
                            "===================================================================\\r\\n";
                        this.editor.setContent(this.editor.getContent() + reply);
                        document.body.classList.add("screen-glitch");
                        setTimeout(() => document.body.classList.remove("screen-glitch"), 600);
                        if (typeof window !== 'undefined') {
                            window.dispatchEvent(new CustomEvent('clue-discovered', {
                                detail: { id: 'clue-notepad-hello', title: 'Notepad: Rahul Speaks Back' }
                            }));
                        }
                    }, 350);
                }
            }`;

if (c.includes(targetCRLF)) {
  c = c.replace(targetCRLF, replacement.replace(/\n/g, '\r\n'));
  fs.writeFileSync(p, c, 'utf8');
  console.log('Notepad HELLO RAHUL easter egg added (CRLF)');
} else if (c.includes(target)) {
  c = c.replace(target, replacement);
  fs.writeFileSync(p, c, 'utf8');
  console.log('Notepad HELLO RAHUL easter egg added (LF)');
} else {
  console.error('Could not find onInput target in notepad-app.js');
}

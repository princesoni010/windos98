import fs from 'fs';

const p = 'src/apps/notepad/notepad-app.js';
let c = fs.readFileSync(p, 'utf8');

const target = `                    this.fileName = data.split("/").pop();
                    this.editor.setValue(text);
                    this.isDirty = false;
                    this.updateTitle();
                    this.setLanguage(this.getLanguageFromExtension(this.fileName));`;

const replacement = `                    this.fileName = data.split("/").pop();
                    this.editor.setValue(text);
                    this.isDirty = false;
                    this.updateTitle();
                    this.setLanguage(this.getLanguageFromExtension(this.fileName));

                    if (this.fileName === "DO_NOT_OPEN.txt") {
                        setTimeout(() => {
                            ShowDialogWindow({
                                title: "SECURITY VIOLATION - RAHUL_1998",
                                text: "WARNING: You were explicitly instructed NOT to open this file!\\n\\nRahul's presence has registered your browser session.\\n'I can feel your cursor on my screen...'\\n\\n(Clue Discovered: Warning Acknowledged)",
                                icons: ICONS.warning,
                                buttons: [{ label: "Close Eyes", action: (w) => w.close() }]
                            });
                            if (typeof window !== 'undefined') {
                                window.dispatchEvent(new CustomEvent('clue-discovered', {
                                    detail: { id: 'clue-do-not-open', title: 'Curiosity Killed the Student: DO_NOT_OPEN.txt' }
                                }));
                            }
                        }, 250);
                    } else if (this.fileName.includes("passwords.txt")) {
                        if (typeof window !== 'undefined') {
                            window.dispatchEvent(new CustomEvent('clue-discovered', {
                                detail: { id: 'clue-passwords', title: 'Found Rahul\\'s Passwords' }
                            }));
                        }
                    } else if (this.fileName.includes("mom_email")) {
                        if (typeof window !== 'undefined') {
                            window.dispatchEvent(new CustomEvent('clue-discovered', {
                                detail: { id: 'clue-mom-email', title: 'Family Woes: The Dial-up Phone Crisis' }
                            }));
                        }
                    } else if (this.fileName.includes("college_notes")) {
                        if (typeof window !== 'undefined') {
                            window.dispatchEvent(new CustomEvent('clue-discovered', {
                                detail: { id: 'clue-college-notes', title: 'IIT Archives: Rahul\\'s 1998 Diary' }
                            }));
                        }
                    } else if (this.fileName.includes("final_message")) {
                        if (typeof window !== 'undefined') {
                            window.dispatchEvent(new CustomEvent('clue-discovered', {
                                detail: { id: 'clue-final-message', title: 'The Last Transmission' }
                            }));
                        }
                    }`;

const targetCRLF = target.replace(/\n/g, '\r\n');
const replacementCRLF = replacement.replace(/\n/g, '\r\n');

if (c.includes(targetCRLF)) {
    c = c.replace(targetCRLF, replacementCRLF);
    fs.writeFileSync(p, c, 'utf8');
    console.log('Notepad file opening lore hooks added (CRLF)');
} else if (c.includes(target)) {
    c = c.replace(target, replacement);
    fs.writeFileSync(p, c, 'utf8');
    console.log('Notepad file opening lore hooks added (LF)');
} else {
    console.error('Target block not found in notepad-app.js');
}

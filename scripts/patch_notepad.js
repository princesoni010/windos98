import fs from 'fs';

let content = fs.readFileSync('src/apps/notepad/notepad-app.js', 'utf8');

// Replace both getContent() calls with getValue() / setContent with setValue()
content = content.replace(
    'const text = this.editor.getContent();\r\n                if (!this._helloRahulTriggered && /HELLO\\s+RAHUL/i.test(text)) {',
    'const text = (this.editor.getValue ? this.editor.getValue() : this.editor.getContent()) || "";\r\n                if (!this._helloRahulTriggered && /HELLO[\\s_]+RAHUL/i.test(text)) {'
);

content = content.replace(
    'this.editor.setContent(this.editor.getContent() + reply);',
    'this.editor.setValue((this.editor.getValue ? this.editor.getValue() : "") + reply);'
);

fs.writeFileSync('src/apps/notepad/notepad-app.js', content, 'utf8');
console.log('Successfully updated src/apps/notepad/notepad-app.js with CRLF');

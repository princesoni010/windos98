import { ShowDialogWindow } from "../shared/components/dialog-window.js";
import { ICONS } from "../config/icons.js";

const STORAGE_KEY = "rahul_1998_clues_v1";

const ALL_CLUES = [
  { id: "clue-boot-warning", title: "Corrupted Profile", desc: "Witnessed the 26-year login warning during system boot." },
  { id: "clue-do-not-open", title: "Forbidden Warning", desc: "Ignored the warning and opened DO_NOT_OPEN.txt." },
  { id: "clue-college-notes", title: "1998 Campus Life", desc: "Read Rahul's diary about hostel life, Backstreet Boys, and dish antennas." },
  { id: "clue-mom-email", title: "The Samosa Hint", desc: "Read the desperate email to Mom about dial-up disconnects and Raju's canteen samosas." },
  { id: "clue-passwords", title: "The Vault Passcode", desc: "Found passwords.txt and calculated the Project X passcode (2000samosa)." },
  { id: "clue-project-x", title: "Project X Vault", desc: "Successfully unlocked the encrypted project_x directory." },
  { id: "clue-notepad-hello", title: "Ghost in the Notepad", desc: "Typed HELLO RAHUL in Notepad and received an immediate transmission." },
  { id: "clue-paint-hidden", title: "Spectral UFO Layer", desc: "Discovered the hidden message concealed in Paint's ufo_sighting.png." },
  { id: "clue-recycle-restore", title: "Recycle Bin Archeology", desc: "Found or restored Rahul's deleted confession from the Recycle Bin." },
  { id: "clue-dos-decode", title: "Terminal Demodulator", desc: "Executed the 'decode' or 'rahul' command in MS-DOS Command Prompt." },
  { id: "clue-minesweeper", title: "Minefield Casualty", desc: "Discovered Rahul's grim fate in Minesweeper." },
  { id: "clue-ie-opened", title: "Cyberspace 1998", desc: "Connected via VSNL Dial-Up to explore Rahul's CyberDen and WebCrawler." },
  { id: "clue-anomaly-wallpaper", title: "Wallpaper Scratches", desc: "Used 'Inspect Anomaly' on the desktop background." },
  { id: "clue-bsod", title: "Blue Screen of Consciousness", desc: "Triggered the authentic 1998 Blue Screen of Death." }
];

export class ClueTracker {
  static getDiscoveredClues() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  static addClue(clueId, title = "") {
    const list = this.getDiscoveredClues();
    if (!list.includes(clueId)) {
      list.push(clueId);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      } catch (e) {}

      this.updateTrayDisplay();
      this.showClueNotification(clueId, title);

      if (list.length === 3) {
        setTimeout(() => {
          ShowDialogWindow({
            title: "Clippy Assistant",
            text: "📎 IT LOOKS LIKE YOU'RE TRYING TO SOLVE A 26-YEAR-OLD MISSING PERSON CASE!\n\nWould you like help with:\n• Formatting an alien abduction report?\n• Checking passwords.txt for canteen samosas?\n• Hiding in the swap file?",
            icons: ICONS.info,
            buttons: [
              { label: "Thanks Clippy", action: (w) => w.close() },
              { label: "Go Away Clippy", action: (w) => w.close() }
            ]
          });
        }, 1500);
      }
    }
  }

  static showClueNotification(clueId, title) {
    const clueObj = ALL_CLUES.find((c) => c.id === clueId);
    const displayTitle = title || (clueObj ? clueObj.title : clueId);
    const current = this.getDiscoveredClues().length;

    const notif = document.createElement("div");
    notif.className = "clue-notification";
    notif.innerHTML = `
      <div style="font-weight: bold; color: #ffff00; margin-bottom: 2px;">🔍 CLUE DISCOVERED! (${current}/10)</div>
      <div style="color: #ffffff; font-size: 11px;">${displayTitle}</div>
    `;

    Object.assign(notif.style, {
      position: "fixed",
      bottom: "34px",
      right: "10px",
      background: "#000080",
      color: "#ffffff",
      border: "2px outset #ffffff",
      padding: "8px 12px",
      zIndex: "99999",
      fontFamily: '"MS Sans Serif", sans-serif',
      boxShadow: "2px 2px 8px rgba(0,0,0,0.6)",
      transition: "opacity 0.4s",
      cursor: "pointer"
    });

    notif.onclick = () => {
      this.showClueLog();
      notif.remove();
    };

    document.body.appendChild(notif);
    setTimeout(() => {
      notif.style.opacity = "0";
      setTimeout(() => notif.remove(), 400);
    }, 4500);
  }

  static init() {
    window.addEventListener("clue-discovered", (e) => {
      if (e.detail && e.detail.id) {
        this.addClue(e.detail.id, e.detail.title);
      }
    });

    // Check if boot warning already seen
    this.addClue("clue-boot-warning", "Corrupted Profile Warning");
    this.injectTrayWidget();
  }

  static injectTrayWidget() {
    const tray = document.querySelector(".system-tray");
    if (!tray) {
      setTimeout(() => this.injectTrayWidget(), 500);
      return;
    }

    if (document.getElementById("clue-tray-widget")) return;

    const widget = document.createElement("div");
    widget.id = "clue-tray-widget";
    widget.title = "Investigation Progress (Click to view discovered clues)";
    Object.assign(widget.style, {
      display: "flex",
      alignItems: "center",
      padding: "0 4px",
      cursor: "pointer",
      fontSize: "11px",
      fontFamily: "monospace",
      color: "#000000",
      borderLeft: "1px solid #808080",
      marginRight: "4px"
    });

    widget.onclick = () => this.showClueLog();
    tray.prepend(widget);
    this.updateTrayDisplay();
  }

  static updateTrayDisplay() {
    const widget = document.getElementById("clue-tray-widget");
    if (widget) {
      const count = this.getDiscoveredClues().length;
      widget.innerHTML = `<span style="margin-right:2px">🕵️</span>${count}/10`;
    }
  }

  static showClueLog() {
    const discovered = this.getDiscoveredClues();
    const count = discovered.length;

    const container = document.createElement("div");
    container.style.padding = "10px";
    container.style.fontSize = "12px";

    let itemsHtml = ALL_CLUES.map((c) => {
      const isFound = discovered.includes(c.id);
      return `
        <div style="margin-bottom: 8px; padding: 6px; background: ${isFound ? "#e8ffe8" : "#f0f0f0"}; border: 1px solid ${isFound ? "#44aa44" : "#cccccc"};">
          <div style="font-weight: bold; color: ${isFound ? "#006600" : "#666666"};">
            ${isFound ? "✅" : "❓"} ${c.title}
          </div>
          <div style="font-size: 11px; color: ${isFound ? "#333333" : "#888888"}; margin-top: 2px;">
            ${isFound ? c.desc : "Locked — Continue exploring files, apps, and secrets..."}
          </div>
        </div>
      `;
    }).join("");

    container.innerHTML = `
      <div style="margin-bottom: 10px;">
        <b>Rahul Sharma Disappearance Investigation:</b><br>
        Progress: <b>${count} of ${ALL_CLUES.length} clues discovered</b>.
      </div>
      <div style="max-height: 280px; overflow-y: auto; border: 2px inset #ffffff; padding: 6px; background: #ffffff;">
        ${itemsHtml}
      </div>
      <div style="margin-top: 10px; font-size: 11px; color: #555;">
        ${count >= 5 ? "Tip: You have found enough evidence! Click Start -> Shut Down to complete the bridge." : "Tip: Check Notepad, Paint, Recycle Bin, and Command Prompt!"}
      </div>
    `;

    ShowDialogWindow({
      title: "Case File: The Abandoned Computer",
      content: container,
      buttons: [{ label: "Close", isDefault: true, action: (w) => w.close() }]
    });
  }
}

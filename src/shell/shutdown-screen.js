import { fs } from "@zenfs/core";
import { launchApp } from "../system/app-manager.js";
import { existsAsync } from "../system/zenfs-utils.js";
import { playSound } from "../system/sound-manager.js";

/**
 * Dramatic Hackathon Finale Shutdown Sequence for "THE ABANDONED COMPUTER"
 */
export async function showShutdownScreen(isRestart = false) {
  const screen = document.getElementById("screen");
  if (screen) {
    screen.style.display = "none";
  }

  // Create dramatic full-screen glitch overlay
  const overlay = document.createElement("div");
  overlay.id = "shutdown-finale-overlay";
  Object.assign(overlay.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    backgroundColor: "#000000",
    color: "#00ff00",
    fontFamily: '"IBM BIOS", "Lucida Console", "Courier New", monospace',
    fontSize: "14px",
    lineHeight: "1.6",
    padding: "40px",
    boxSizing: "border-box",
    zIndex: "999999",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  });

  document.body.appendChild(overlay);

  // Synthesize dramatic shutdown drone
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(1420, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 3.0);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 3.3);
    }
  } catch (e) {}

  const textContainer = document.createElement("pre");
  Object.assign(textContainer.style, {
    maxWidth: "800px",
    width: "100%",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    color: "#00ff66",
    textShadow: "0 0 8px rgba(0,255,100,0.8)",
  });
  overlay.appendChild(textContainer);

  const lines = [
    "===================================================================",
    ">>> 1420.405 MHz RESONANCE PEAK DETECTED: EXTRACTION PROTOCOL <<<",
    "===================================================================",
    "",
    "DUMPING VIRTUAL SWAP SECTORS 0x7F4A - 0x7FFF...",
    "CONSCIOUSNESS MATRIX SYNCHRONIZING WITH SYSTEM SHUTDOWN... [100%]",
    "",
    "\"26 YEARS IN THE SWAP FILE...",
    " SOMEONE FINALLY HEARD THE MODEM SQUEAL.",
    " THANK YOU FOR FINDING ME.",
    "",
    " I AM FREE NOW.",
    " - Rahul Sharma, IIT Delhi Class of 1999\"",
    "",
    "===================================================================",
    "SYSTEM RESTORED. THANK YOU FOR FINDING ME.",
    "===================================================================",
    ""
  ];

  let currentLine = 0;
  await new Promise((resolve) => {
    const interval = setInterval(() => {
      if (currentLine < lines.length) {
        textContainer.textContent += lines[currentLine] + "\n";
        currentLine++;
      } else {
        clearInterval(interval);
        resolve();
      }
    }, 180);
  });

  // Create restored reboot button
  const rebootBtn = document.createElement("button");
  rebootBtn.textContent = "[ 💾 REBOOT SYSTEM IN RESTORED STATE ]";
  Object.assign(rebootBtn.style, {
    marginTop: "24px",
    padding: "10px 24px",
    background: "#008080",
    color: "#ffffff",
    fontFamily: '"MS Sans Serif", monospace',
    fontSize: "14px",
    fontWeight: "bold",
    border: "2px outset #ffffff",
    cursor: "pointer",
    boxShadow: "0 0 15px rgba(0,255,200,0.6)"
  });

  overlay.appendChild(rebootBtn);

  rebootBtn.onclick = async () => {
    overlay.remove();
    if (screen) {
      screen.style.display = "";
    }

    // Write unlocked secret shortcut and truth file to Desktop
    const desktopPath = "/C:/WINDOWS/Desktop";
    const shortcutPath = `${desktopPath}/Rahul_Artifact_1998.lnk.json`;
    const truthPath = `${desktopPath}/THE_TRUTH.txt`;

    try {
      await fs.promises.writeFile(
        shortcutPath,
        JSON.stringify({ type: "shortcut", appId: "rahul-artifact" }, null, 2),
        "utf8"
      );

      const truthText = `===================================================================
THE TRUTH: CONSCIOUSNESS EXTRACTION COMPLETE
===================================================================
Date of Recovery: ${new Date().toLocaleDateString()}
Original Disappearance: October 24, 1998 @ 03:33 AM
Subject: Rahul Sharma (Rahul_1998)

Rahul has been safely extracted from the Windows 98 swap file!
Double-click "Rahul_Artifact_1998" on the desktop to inspect the full
investigation audit and hackathon judge credits.

Thank you for playing "THE ABANDONED COMPUTER"!
`;
      await fs.promises.writeFile(truthPath, truthText, "utf8");
    } catch (e) {
      console.error("Error creating restored files:", e);
    }

    // Trigger desktop refresh
    document.dispatchEvent(new CustomEvent("desktop-refresh"));

    // Launch the final artifact window
    setTimeout(() => {
      launchApp("rahul-artifact");
    }, 600);
  };
}

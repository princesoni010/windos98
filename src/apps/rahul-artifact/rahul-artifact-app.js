import { Application } from "../../system/application.js";
import { ICONS } from "../../config/icons.js";
import { ClueTracker } from "../../system/clue-tracker.js";

export class RahulArtifactApp extends Application {
  static config = {
    id: "rahul-artifact",
    title: "Rahul_Artifact_1998 - Case Solved!",
    description: "The digital consciousness artifact of Rahul Sharma.",
    icon: ICONS.computer,
    category: "System",
    width: 600,
    height: 480,
    resizable: true,
    isSingleton: true,
  };

  constructor(config) {
    super(config);
    this.win = null;
  }

  _createWindow() {
    this.win = new $Window({
      title: this.title,
      outerWidth: this.width,
      outerHeight: this.height,
      resizable: this.resizable,
      icons: this.icon,
    });

    const foundClues = ClueTracker.getDiscoveredClues();

    const contentHtml = `
      <div style="padding: 16px; background: #c0c0c0; font-family: 'MS Sans Serif', sans-serif; font-size: 11px; height: 100%; box-sizing: border-box; overflow-y: auto;">
        <div style="background: #000080; color: #ffffff; padding: 12px; border: 2px outset #ffffff; margin-bottom: 14px; text-align: center;">
          <h2 style="margin: 0; color: #ffff00; font-size: 18px;">🏆 CASE SOLVED: THE ABANDONED COMPUTER 🏆</h2>
          <div style="margin-top: 6px; font-size: 12px;">Rahul Sharma (IIT Delhi, 1998) Has Been Restored!</div>
        </div>

        <div style="background: #ffffff; border: 2px inset #ffffff; padding: 12px; margin-bottom: 12px;">
          <h3 style="margin-top: 0; color: #000080;">📜 The Truth Behind Rahul_1998</h3>
          <p>On October 24, 1998, at 03:33 AM, 3rd year student Rahul Sharma accidentally bridged his 56k dial-up connection to the 1420.405 MHz cosmic hydrogen line.</p>
          <p>His neural consciousness was mirrored into the Windows 98 swap file (<code>WIN386.SWP</code>), where he remained frozen for 26 years... until you booted this abandoned machine, deciphered his college diary, breached the Project X vault with his favorite canteen samosa password, and executed the shutdown extraction handshake.</p>
        </div>

        <div style="background: #ffffff; border: 2px inset #ffffff; padding: 12px; margin-bottom: 12px;">
          <h3 style="margin-top: 0; color: #000080;">🕵️ Investigation Audit (Clues Found: ${foundClues.length})</h3>
          <ul style="padding-left: 20px; line-height: 1.6;">
            <li><b>Award BIOS Boot Screen:</b> 64MB memory test and 26-year corrupted profile warning.</li>
            <li><b>Notepad AI Ghost:</b> Typing "HELLO RAHUL" in Notepad triggered an immediate COM1 reply.</li>
            <li><b>Mom's Email & passwords.txt:</b> Revealed the Y2K samosa passcode formula (<code>2000samosa</code>).</li>
            <li><b>Password-Protected Vault:</b> Unlocked <code>project_x</code> and recovered the satellite telemetry schematics.</li>
            <li><b>Minesweeper Lore:</b> Unlocked the grim fate dialog ("RAHUL DID NOT SURVIVE THIS EITHER").</li>
            <li><b>Internet Explorer 4.0:</b> Authentic VSNL 56k dial-up sound, WebCrawler 98, and Rahul's GeoCities CyberDen.</li>
            <li><b>Paint Spectral Secret:</b> Revealed the hidden message in the UFO dome.</li>
            <li><b>MS-DOS Shell:</b> Intercepted packet 0x7F4A using <code>decode</code> and <code>rahul</code> commands.</li>
            <li><b>Recycle Bin Archeology:</b> Restored the deleted diary confession.</li>
            <li><b>Desktop Wallpaper Anomaly:</b> Right-clicked background to find scratched frequency notes.</li>
            <li><b>Blue Screen of Death:</b> Triggered the authentic 1998 BSOD crash.</li>
            <li><b>Clippy Cameo:</b> Humorous assistant offering alien abduction formatting help.</li>
            <li><b>Dramatic Shutdown Sequence:</b> Fullscreen typewriter extraction and restored OS reboot.</li>
          </ul>
        </div>

        <div style="text-align: center; margin-top: 14px;">
          <button id="btn-replay-ending" style="padding: 6px 16px; font-weight: bold; cursor: pointer;">Replay Extraction Sequence</button>
          <button id="btn-close-artifact" style="padding: 6px 16px; margin-left: 10px; cursor: pointer;">Close Case File</button>
        </div>
      </div>
    `;

    this.win.$content.html(contentHtml);

    this.win.$content.find("#btn-close-artifact").on("click", () => this.win.close());
    this.win.$content.find("#btn-replay-ending").on("click", () => {
      this.win.close();
      import("../../shell/shutdown-screen.js").then((m) => m.showShutdownScreen());
    });

    return this.win;
  }
}

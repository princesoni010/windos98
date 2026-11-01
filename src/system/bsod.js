/**
 * Fake Windows 98 Blue Screen of Death (BSOD)
 */
export function triggerBSOD() {
  if (document.getElementById("bsod-overlay")) return;

  const bsod = document.createElement("div");
  bsod.id = "bsod-overlay";
  Object.assign(bsod.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    backgroundColor: "#0000aa",
    color: "#ffffff",
    fontFamily: '"IBM BIOS", "Lucida Console", "Courier New", monospace',
    fontSize: "14px",
    lineHeight: "1.6",
    padding: "40px",
    boxSizing: "border-box",
    zIndex: "999999",
    cursor: "none",
    userSelect: "none",
    overflow: "hidden"
  });

  bsod.innerHTML = `
    <div style="max-width: 720px; margin: 0 auto; text-align: left;">
      <div style="background: #aaaaaa; color: #0000aa; display: inline-block; padding: 2px 8px; font-weight: bold; margin-bottom: 24px;">
        Windows 98
      </div>

      <p style="margin-bottom: 20px;">
        A fatal exception 0E has occurred at 0028:C0011E36 in VXD VMM(01) + 00010E36.<br>
        The current application will be terminated.
      </p>

      <div style="background: #000088; border: 1px solid #ffffff; padding: 12px; margin: 20px 0;">
        *** STOP: 0x00000026 (0xRAHUL98, 0x00001420, 0x00007F4A, 0x00000001)<br>
        PAGE_FAULT_IN_CONSCIOUSNESS_AREA - WIN386.SWP<br><br>
        * Telemetry signature: 1420.405 MHz (Hydrogen Carrier Detected)<br>
        * Host: RAHUL_1998 (IIT Hostel 4, Room 214)<br>
        * Status: Signal bridged across 26 years.
      </div>

      <p style="margin-top: 24px;">
        * Press any key or click anywhere to return to Windows 98.<br>
        * Press CTRL+ALT+DEL again to restart your computer. You will lose any unsaved information.<br>
        * Or whisper "Rahul" to your monitor.
      </p>

      <div style="margin-top: 40px; text-align: center; font-size: 13px; animation: blink 1s step-end infinite;">
        Press any key to continue _
      </div>
    </div>
  `;

  document.body.appendChild(bsod);

  const cleanup = () => {
    bsod.remove();
    window.removeEventListener("keydown", cleanup);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("clue-discovered", {
          detail: {
            id: "clue-bsod",
            title: "Blue Screen of Consciousness",
          },
        })
      );
    }
  };

  bsod.addEventListener("click", cleanup);
  window.addEventListener("keydown", cleanup, { once: true });
}


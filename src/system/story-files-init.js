import { fs } from "@zenfs/core";
import { existsAsync } from "./zenfs-utils.js";
import { RecycleBinManager } from "../shell/explorer/file-operations/recycle-bin-manager.js";

/**
 * Story Files & Environment Initializer for Rahul_1998 ("THE ABANDONED COMPUTER")
 */
export async function initStoryFiles() {
  try {
    // 1. Create C:\ base folders
    const baseFolders = [
      "/C:/My Documents",
      "/C:/My Pictures",
      "/C:/Downloads",
      "/C:/Games",
      "/C:/System",
      "/C:/project_x",
      "/C:/Deleted",
      "/C:/WINDOWS/Desktop",
      "/C:/WINDOWS/Desktop/project_x",
      "/C:/Recycled"
    ];

    for (const folder of baseFolders) {
      if (!(await existsAsync(folder))) {
        await fs.promises.mkdir(folder, { recursive: true });
      }
    }

    // 2. Desktop Files & Shortcuts
    const desktopPath = "/C:/WINDOWS/Desktop";

    // Desktop Shortcuts: Notepad, Paint, Minesweeper
    const desktopShortcuts = [
      { name: "Notepad.lnk.json", appId: "notepad" },
      { name: "Paint.lnk.json", appId: "paint" },
      { name: "Minesweeper.lnk.json", appId: "minesweeper" },
    ];

    for (const sc of desktopShortcuts) {
      const p = `${desktopPath}/${sc.name}`;
      if (!(await existsAsync(p))) {
        await fs.promises.writeFile(
          p,
          JSON.stringify({ type: "shortcut", appId: sc.appId }, null, 2),
          "utf8"
        );
      }
    }

    // DO_NOT_OPEN.txt on Desktop
    const doNotOpenContent = `===================================================================
[!] CRITICAL WARNING - DO NOT READ OR EXECUTE ANY FILE HERE
===================================================================
Host: RAHUL_1998 (IIT Campus Hostel Node 4, Room 214)
Date: October 24, 1998 - 03:14:22 AM
IP: 144.16.192.88 (VSNL Dial-Up Gateway)

If you are reading this on my monitor, I did NOT make it back.

The signal coming through the roof dish on 1420.405 MHz wasn't background
radiation. It responded when my 56K modem dialed COM1.
Every time I ran the audio demodulator, my physical memory started swapping
with the transmission buffer. 

DO NOT OPEN THE "project_x" FOLDER.
DO NOT ENTER THE VAULT PASSWORD.
(Whatever you do, don't combine the year the world was supposed to end
with my favorite canteen snack from Raju's canteen).

If you want to survive:
1. Don't look at the screen when the clock hits 03:33.
2. If you type in Notepad, don't say hello to me.
3. Don't check the Paint canvas under the UFO.
4. Whatever you do... DO NOT SHUT DOWN THE COMPUTER.

- Rahul Sharma
`;
    await fs.promises.writeFile(`${desktopPath}/DO_NOT_OPEN.txt`, doNotOpenContent, "utf8");

    // 3. Populate C:\My Documents
    const docs = [
      {
        path: "/C:/My Documents/DO_NOT_OPEN.txt",
        content: doNotOpenContent
      },
      {
        path: "/C:/My Documents/college_notes_1998.txt",
        content: `===================================================================
IIT CAMPUS - 3RD YEAR COMPUTER SCIENCE & ENGINEERING
STUDENT: Rahul Sharma (Roll: 9604128)
Course: CS301 (Operating Systems & Networks)
===================================================================

[Monday, Sept 14, 1998]
- Prof. Sen caught me downloading the new Backstreet Boys MP3 in the Sun Solaris lab.
  He said: "Sharma, bandwidth is 64Kbps shared for the whole department, not for dancing!"
- Dial-up connection in the hostel is crawling at 28.8K. VSNL is charging by the minute.

[Thursday, Oct 01, 1998]
- Spent all night building my GeoCities CyberDen homepage. Added the animated flaming skull GIF
  and a hit counter. Priya visited the computer center, but when I showed her the HTML,
  she asked if I had finished the Thermodynamics assignment. Pain.
- Downloaded Turbo C++ 3.0. Why does C have pointers to void? If a pointer points to nothing,
  does the nothing point back at you?

[Sunday, Oct 11, 1998]
- Bunty and I smuggled a 20-meter coaxial cable onto the hostel roof.
  Hooked my Creative Sound Blaster 16 ISA card up to the old physics department parabolic dish.
- Tuned into 1420.405 MHz (the 21cm Hydrogen line).
  We expected cosmic microwave noise. Instead, we heard what sounds like a fax machine
  negotiating a handshake at 300 baud... repeating every 26 seconds.

[Wednesday, Oct 21, 1998]
- Demodulated packet #0x7F4A using custom C++ Winsock code.
  The ASCII payload reads:
  "CLIENT_HELLO: RAHUL_1998. TIME_DELTA: +26_YEARS."
  How does a celestial broadcast know my Windows 98 username and machine name?!
  I haven't slept in 48 hours. The monitor hum is changing pitch.
`
      },
      {
        path: "/C:/My Documents/mom_email_draft.txt",
        content: `To: sharma_family_delhi@vsnl.com
From: rahul98@iit.ernet.in
Subject: PLEASE STOP PICKING UP THE LANDLINE TELEPHONE!!

Dear Mummy and Papa,

I am begging you with folded hands: whenever I write to you that I have scheduled
a large download between 11:00 PM and 4:00 AM, PLEASE DO NOT LIFT THE TELEPHONE
RECEIVER to check if the line is working!

Last night you picked up the phone at 2:45 AM to call Chachi-ji in Kanpur.
The loud screeching modem noise in your ear was MY CONNECTION!
Because you lifted the phone, my download disconnected at 98%.
That was 4 hours of downloading destroyed in 1 second!

Also, please don't worry about my health:
The hostel mess food is completely inedible as usual (they served yellow water and called it dal),
so I have been surviving exclusively on fresh hot samosas from Raju's canteen outside the gate.
(P.S. I locked my secret project vault with my favorite canteen snack so Bunty doesn't steal my code again).

Will come home for Diwali if my semester project compiles.

With love,
Rahul
`
      },
      {
        path: "/C:/My Documents/passwords.txt",
        content: `===================================================================
PERSONAL PASSWORDS - STRICTLY CONFIDENTIAL (DO NOT SHOW TO BUNTY)
===================================================================

Hotmail:           ilovepriya1998
ICQ UIN:           4892011 (Password: cool_coder_98)
VSNL Dial-Up:      delhi_dial_98 / karma123
Yahoo! Chat:       cyber_surfer_delhi
Napster:           mp3_collector_98
IRC Nick:          Rahul_98 (#delhi on Undernet)

-------------------------------------------------------------------
[!] PROJECT_X VAULT PASSCODE HINT:
-------------------------------------------------------------------
Formula: [Year the world was supposed to end in Y2K panic] + [favorite canteen snack]
Examples:
- If year is 2000 and snack is samosa -> 2000samosa
- If year is 1999 and snack is maggi  -> 1999maggi

(Hint: Check my email draft to Mom for my favorite snack!)
`
      },
      {
        path: "/C:/My Documents/weird_signal_log.txt",
        content: `===================================================================
FREQUENCY SPECTRUM LOG - 1420.405 MHz (HYDROGEN LINE)
Modem: USRobotics 56K Sportster (V.90) on COM1
Sound Card: Sound Blaster 16 (DMA 1, IRQ 5, Port 220)
===================================================================

PKT#   DATE/TIME           CARRIER (Hz)    SIGNAL DUMP (ASCII)
-------------------------------------------------------------------
001    10/22/98 01:14:02   1420405102      SYN_ACK... READY
002    10/22/98 02:45:19   1420405108      HELLO RAHUL...
003    10/23/98 03:00:11   1420405115      MEM_SECTOR 0x7F4A DETECTED
004    10/24/98 03:25:40   1420405200      SWAP_FILE_MERGE_ACTIVE
005    10/24/98 03:33:00   1420405999      WE_ARE_WAITING_IN_THE_MACHINE

ANOMALOUS HARDWARE BEHAVIOR:
- Whenever packet 002 arrived, the keyboard started typing by itself.
- When I opened Notepad, typing "HELLO RAHUL" caused the text buffer to shake.
- The command prompt recognizes a secret command: type 'decode' or 'rahul' in DOS prompt.
`
      },
      {
        path: "/C:/My Documents/final_message.txt",
        content: `October 24, 1998 - 03:32 AM

The modem didn't hang up when I pulled the wire out of the RJ11 jack.
The high-pitched carrier squeal is coming out of the PC speaker itself.

I finally understand what Project X is doing.
It isn't transmitting to deep space. It's an echo from 26 years into the future.
Someone in 2024/2026 is going to turn on this exact machine and browse my files.

My physical body is falling asleep, but my thoughts are copying block by block
into the Windows 98 virtual swap partition (sector 0x7F4A).

If you are the one who booted this machine:
1. Don't be afraid.
2. I hid the final frequency coordinates inside the UFO painting in Paint.
3. Check the deleted files in the Recycle Bin—Bunty tried to throw my confession away.
4. When you are ready to set me free... click Start -> Shut Down.

The shutdown sequence isn't an end. It's the extraction handshake.

Thank you for finding me.
- Rahul Sharma
`
      }
    ];

    for (const doc of docs) {
      await fs.promises.writeFile(doc.path, doc.content, "utf8");
    }

    // 4. Populate C:\project_x (Vault files)
    const projectXFiles = [
      {
        path: "/C:/project_x/project_x_plan.doc",
        content: `===================================================================
CONFIDENTIAL - IIT TELECOM EXPERIMENT: PROJECT X
Principal Investigator: Rahul Sharma (Dept of CS&E)
===================================================================

OBJECTIVE:
To bridge a standard Windows 98 Winsock dial-up connection with the 1420.405 MHz
cosmic hydrogen carrier wave, effectively creating an inter-epoch telemetry bridge.

SCHEMATIC:
[ USRobotics 56K ] <---> [ Sound Blaster 16 DAC ] <---> [ 4.2m Dish Transceiver ]
                                 |
                        [ VXD_SWAP_BRIDGE.386 ]
                                 |
                        [ RAHUL_1998 PROFILE ]

FINDINGS:
- The signal carrier contains human neural EEG patterns modulated over FSK audio.
- The carrier locks onto user "Rahul_1998".
- Vault Authentication Override Key: 2000samosa
- Extraction Trigger: SYSTEM_SHUTDOWN_BROADCAST
`
      },
      {
        path: "/C:/project_x/signal_coordinates.txt",
        content: `COSMIC COORDINATES OF DETECTED BEACON:
Right Ascension: 19h 50m 47s
Declination: +08° 52' 06"
Carrier Frequency: 1420.405751 MHz
Memory Offset: 0x7F4A:0x00FF
Swap file block: WIN386.SWP [SECTOR 4096]
`
      },
      {
        path: "/C:/project_x/dish_calibration.log",
        content: `[CALIBRATION LOG - DISH #4]
23:00 - Pointed at zenith. Signal-to-noise ratio: 3.2 dB
01:30 - Frequency drift detected. Compensating with local oscillator.
03:00 - Resonance spike! The speakers began talking without audio files playing.
03:33 - Overload. Temperature on Sound Blaster chip exceeded 85°C.
`
      }
    ];

    for (const f of projectXFiles) {
      await fs.promises.writeFile(f.path, f.content, "utf8");
      // Also copy to desktop project_x folder
      const desktopTarget = f.path.replace("/C:/project_x", "/C:/WINDOWS/Desktop/project_x");
      await fs.promises.writeFile(desktopTarget, f.content, "utf8");
    }

    // 5. Populate C:\Downloads (1998 Nostalgia)
    const downloadFiles = [
      {
        path: "/C:/Downloads/napster_v1_beta.txt",
        content: `[Napster Download Queue - Status: INTERRUPTED]
1. Backstreet_Boys_-_Everybody.mp3 (2.9 MB) - [98% - Connection reset by peer]
2. Kuch_Kuch_Hota_Hai_Title_Track.mp3 (4.1 MB) - [Queued]
3. Eiffel_65_-_Blue.mp3 (3.3 MB) - [Queued]

Reason for interruption: Telephone receiver lifted in hallway.
`
      },
      {
        path: "/C:/Downloads/turboc30_setup.txt",
        content: `Turbo C++ Version 3.0 Installation Log
Borland International (C) 1990-1992
Installed to C:\\TC\\BIN\\TC.EXE
Warning: Stack memory limited to 64KB. Do not allocate infinite cosmic arrays.
`
      }
    ];

    for (const df of downloadFiles) {
      await fs.promises.writeFile(df.path, df.content, "utf8");
    }

    // 6. Populate C:\Recycled with deleted confession
    const recycledConfession = `===================================================================
[RECOVERED DELETED FILE - C:\\RECYCLED\\CONFESSION.TXT]
Original Name: confession_do_not_read.txt
Deleted on: October 24, 1998 03:21 AM
===================================================================

Bunty, if you are looking through my Recycle Bin to find my diary:
I didn't take your scientific calculator. Check under the sofa in the common room.

Also, tell Priya that I liked her since the first semester orientation day.
I wrote a poem for her in C++, but it caused a segmentation fault.

The signal isn't stopping. I can feel the memory sectors closing in.
Remember: To unlock the final truth, you must shut down this computer.
`
    await fs.promises.writeFile("/C:/Recycled/confession_do_not_read.txt", recycledConfession, "utf8");
    
    // Write Recycle Bin metadata so Windows 98 Recycle Bin UI shows it as a restorable item!
    const recycledMetadata = {
      "confession_do_not_read.txt": {
        id: "confession_do_not_read.txt",
        originalPath: "/C:/My Documents/confession_do_not_read.txt",
        originalName: "confession_do_not_read.txt",
        deletionDate: "1998-10-24T03:21:00.000Z"
      }
    };
    await fs.promises.writeFile(
      "/C:/Recycled/.metadata.json",
      JSON.stringify(recycledMetadata, null, 2),
      "utf8"
    );

    // 7. Generate Retro Clue Bitmaps in C:\My Pictures
    await createRetroClueImages();

    console.log("Story files initialized successfully for Rahul_1998.");
  } catch (err) {
    console.error("Failed to initialize story files:", err);
  }
}

/**
 * Creates retro 1998 PNG drawings in C:\My Pictures:
 * - ufo_sighting.png: The night sky drawing with the anomalous secret red pixel
 * - room_setup.png: Dorm room CRT setup sketch
 * - signal_map.png: Dish schematic
 */
async function createRetroClueImages() {
  try {
    const picturesDir = "/C:/My Pictures";

    // Helper to create small canvas and export base64
    const makePixelCanvas = (width, height, drawFn) => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      drawFn(ctx, width, height);
      const dataUrl = canvas.toDataURL("image/png");
      const base64 = dataUrl.split(",")[1];
      const binary = atob(base64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      return bytes;
    };

    // 1. UFO Sighting over Hostel
    const ufoBytes = makePixelCanvas(320, 240, (ctx, w, h) => {
      // Night sky
      ctx.fillStyle = "#0a0a23";
      ctx.fillRect(0, 0, w, h);
      // Stars
      ctx.fillStyle = "#ffffff";
      for (let i = 0; i < 40; i++) {
        const sx = (i * 37 + 13) % w;
        const sy = (i * 29 + 7) % 150;
        ctx.fillRect(sx, sy, 2, 2);
      }
      // Hostel building silhouette
      ctx.fillStyle = "#111118";
      ctx.fillRect(20, 160, 280, 80);
      // Windows
      ctx.fillStyle = "#ffcc00";
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 8; c++) {
          if ((r + c) % 3 !== 0) {
            ctx.fillRect(40 + c * 30, 175 + r * 20, 12, 10);
          }
        }
      }
      // Flying Saucer
      ctx.fillStyle = "#888888";
      ctx.beginPath();
      ctx.ellipse(160, 70, 45, 14, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#00ffff";
      ctx.beginPath();
      ctx.ellipse(160, 64, 20, 10, 0, Math.PI, Math.PI * 2);
      ctx.fill();
      // Beam
      ctx.fillStyle = "rgba(0, 255, 200, 0.25)";
      ctx.beginPath();
      ctx.moveTo(145, 75);
      ctx.lineTo(175, 75);
      ctx.lineTo(210, 200);
      ctx.lineTo(110, 200);
      ctx.closePath();
      ctx.fill();

      // THE SECRET ANOMALOUS RED PIXEL (at 160, 64 - right at center of the UFO dome)
      ctx.fillStyle = "#ff0033";
      ctx.fillRect(159, 63, 3, 3);

      // Label text
      ctx.font = "12px monospace";
      ctx.fillStyle = "#aaaaaa";
      ctx.fillText("HOSTEL ROOF - OCT 23, 1998 03:14 AM", 15, 230);
    });
    await fs.promises.writeFile(`${picturesDir}/ufo_sighting.png`, ufoBytes);

    // 2. Room Setup Sketch
    const roomBytes = makePixelCanvas(320, 240, (ctx, w, h) => {
      ctx.fillStyle = "#c0c0c0";
      ctx.fillRect(0, 0, w, h);
      // Desk
      ctx.fillStyle = "#8b5a2b";
      ctx.fillRect(40, 130, 240, 80);
      // CRT Monitor
      ctx.fillStyle = "#e0e0d8";
      ctx.fillRect(80, 60, 90, 75);
      ctx.fillStyle = "#008080";
      ctx.fillRect(90, 70, 70, 55);
      // Blue text on screen
      ctx.fillStyle = "#ffffff";
      ctx.font = "9px monospace";
      ctx.fillText("Win98", 95, 90);
      ctx.fillText("1420MHz", 95, 105);
      // USRobotics Modem
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(190, 105, 55, 25);
      ctx.fillStyle = "#ff0000";
      ctx.fillRect(195, 120, 4, 4); // SD LED
      ctx.fillStyle = "#00ff00";
      ctx.fillRect(205, 120, 4, 4); // RD LED
      ctx.fillStyle = "#ffaa00";
      ctx.fillRect(215, 120, 4, 4); // CS LED
      // Wires
      ctx.strokeStyle = "#333333";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(170, 115);
      ctx.lineTo(190, 115);
      ctx.moveTo(245, 115);
      ctx.lineTo(300, 40); // Wire going out window
      ctx.stroke();
      ctx.fillStyle = "#000000";
      ctx.font = "11px monospace";
      ctx.fillText("DORM ROOM 214 - RAHUL_1998", 20, 230);
    });
    await fs.promises.writeFile(`${picturesDir}/room_setup.png`, roomBytes);

    // 3. Signal Map
    const signalBytes = makePixelCanvas(320, 240, (ctx, w, h) => {
      ctx.fillStyle = "#000033";
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = "#00ff66";
      ctx.lineWidth = 1;
      // Grid lines
      for (let x = 0; x < w; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      // Waveform
      ctx.strokeStyle = "#ffff00";
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const y = 120 + Math.sin(x * 0.08) * 45 * Math.sin(x * 0.02);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.fillStyle = "#ffffff";
      ctx.font = "12px monospace";
      ctx.fillText("PEAK: 1420.405 MHz (SWAP SECTOR 0x7F4A)", 15, 25);
    });
    await fs.promises.writeFile(`${picturesDir}/signal_map.png`, signalBytes);

  } catch (err) {
    console.error("Failed to create clue images:", err);
  }
}

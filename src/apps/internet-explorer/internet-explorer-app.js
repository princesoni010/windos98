import { Application } from "../../system/application.js";
import { ICONS } from "../../config/icons.js";
import "./internet-explorer.css";

export class InternetExplorerApp extends Application {
  static config = {
    id: "internet-explorer",
    title: "Microsoft Internet Explorer 4.0",
    description: "Connect to the World Wide Web via VSNL Dial-Up.",
    icon: ICONS["internet-explorer"],
    category: "Internet",
    width: 680,
    height: 480,
    resizable: true,
    isSingleton: true,
  };

  constructor(config) {
    super(config);
    this.win = null;
    this.currentUrl = "http://www.geocities.com/rahul_den/";
    this.history = [
      "http://www.geocities.com/rahul_den/",
      "http://www.webcrawler98.com/",
      "http://www.campus-inquirer.edu/",
      "http://www.anomalous-signals.org/",
      "http://www.altavista.digital.com/search?q=how+to+survive+y2k",
      "http://www.vsnl.com/support/dialup_frequent_disconnects"
    ];
    this.historyIndex = 0;
    this.isDialedIn = false;
  }

  _createWindow() {
    this.win = new $Window({
      title: `${this.title} - [${this.currentUrl}]`,
      outerWidth: this.width,
      outerHeight: this.height,
      resizable: this.resizable,
      icons: this.icon,
    });

    const contentHtml = `
      <div class="ie-window">
        <div class="ie-toolbar">
          <button id="ie-back" title="Back"><span class="icon">⬅</span>Back</button>
          <button id="ie-forward" title="Forward"><span class="icon">➡</span>Fwd</button>
          <button id="ie-stop" title="Stop"><span class="icon">⏹</span>Stop</button>
          <button id="ie-refresh" title="Refresh"><span class="icon">🔄</span>Reload</button>
          <button id="ie-home" title="Home"><span class="icon">🏠</span>Home</button>
          <button id="ie-search" title="Search"><span class="icon">🔍</span>Search</button>
          <button id="ie-history-btn" title="History"><span class="icon">📜</span>History</button>
          <button id="ie-disconnect-btn" title="Dial-up Connection"><span class="icon">📞</span>Modem</button>
        </div>

        <div class="ie-address-bar">
          <label>Address:</label>
          <input type="text" id="ie-url-input" value="${this.currentUrl}" />
          <button id="ie-go-btn">Go</button>
        </div>

        <div class="ie-viewport" id="ie-viewport">
          <!-- Page will render here -->
        </div>

        <div class="ie-status-bar">
          <span id="ie-status-text">Ready</span>
          <span>Internet Zone (33.6 Kbps)</span>
        </div>
      </div>
    `;

    this.win.$content.html(contentHtml);
    this._attachEventListeners();
    return this.win;
  }

  async _onLaunch() {
    // Show dial-up connection sequence on first launch
    if (!this.isDialedIn) {
      await this._simulateDialup();
      this.isDialedIn = true;
    }
    this.navigateTo(this.currentUrl);

    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("clue-discovered", {
          detail: {
            id: "clue-ie-opened",
            title: "Web Surfer 1998: Launched Internet Explorer",
          },
        })
      );
    }
  }

  _attachEventListeners() {
    const $w = this.win.$content;
    const input = $w.find("#ie-url-input")[0];

    $w.find("#ie-go-btn").on("click", () => this.navigateTo(input.value));
    $w.find("#ie-home").on("click", () => this.navigateTo("http://www.geocities.com/rahul_den/"));
    $w.find("#ie-search").on("click", () => this.navigateTo("http://www.webcrawler98.com/"));
    $w.find("#ie-refresh").on("click", () => this.navigateTo(this.currentUrl));
    $w.find("#ie-back").on("click", () => this._goBack());
    $w.find("#ie-forward").on("click", () => this._goForward());
    $w.find("#ie-history-btn").on("click", () => this._showHistoryModal());
    $w.find("#ie-disconnect-btn").on("click", () => this._simulateDialup());

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") this.navigateTo(input.value);
    });
  }

  _playDialupAudio() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      // Synthesize dial tones & modem static
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.08, ctx.currentTime);

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(941, ctx.currentTime);
      osc.frequency.setValueAtTime(1336, ctx.currentTime + 0.3);
      osc.frequency.setValueAtTime(770, ctx.currentTime + 0.6);
      osc.frequency.setValueAtTime(1209, ctx.currentTime + 0.9);

      // Modem carrier frequency shift
      osc.frequency.setValueAtTime(2100, ctx.currentTime + 1.2);
      osc.frequency.linearRampToValueAtTime(1420, ctx.currentTime + 2.5);

      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 2.9);
    } catch (e) {
      // Audio autoplay restrictions or unsupported
    }
  }

  async _simulateDialup() {
    const viewport = this.win.$content.find("#ie-viewport")[0];
    const modal = document.createElement("div");
    modal.className = "ie-dialup-modal";
    modal.innerHTML = `
      <div class="ie-dialup-box">
        <div class="ie-dialup-title">Connecting to VSNL Delhi Gateway...</div>
        <div>Phone: 011-6869400 | User: rahul98</div>
        <div class="ie-dialup-progress">
          <div class="ie-dialup-bar" id="dialup-bar"></div>
        </div>
        <div class="ie-dialup-status" id="dialup-status">Dialing server...</div>
      </div>
    `;
    viewport.appendChild(modal);

    this._playDialupAudio();

    const bar = modal.querySelector("#dialup-bar");
    const status = modal.querySelector("#dialup-status");

    const steps = [
      { pct: "20%", text: "Dialing 011-6869400 (USRobotics 56K)...", delay: 400 },
      { pct: "45%", text: "Negotiating V.90 carrier handshake at 33,600 bps...", delay: 600 },
      { pct: "75%", text: "Verifying username 'rahul98' & password...", delay: 500 },
      { pct: "90%", text: "Warning: Carrier echo on 1420 MHz detected!", delay: 400 },
      { pct: "100%", text: "Connected to World Wide Web via VSNL Gateway.", delay: 300 },
    ];

    for (const step of steps) {
      bar.style.width = step.pct;
      status.textContent = step.text;
      await new Promise((r) => setTimeout(r, step.delay));
    }

    await new Promise((r) => setTimeout(r, 400));
    modal.remove();
  }

  navigateTo(url) {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "http://" + url;
    }
    this.currentUrl = url;
    this.win.setTitle(`${this.title} - [${this.currentUrl}]`);
    this.win.$content.find("#ie-url-input").val(url);

    if (!this.history.includes(url)) {
      this.history.push(url);
    }
    this.historyIndex = this.history.indexOf(url);

    this._renderPage(url);
  }

  _goBack() {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      this.navigateTo(this.history[this.historyIndex]);
    }
  }

  _goForward() {
    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex++;
      this.navigateTo(this.history[this.historyIndex]);
    }
  }

  _renderPage(url) {
    const viewport = this.win.$content.find("#ie-viewport")[0];
    const status = this.win.$content.find("#ie-status-text")[0];
    status.textContent = "Loading page...";

    let html = "";
    const lower = url.toLowerCase();

    if (lower.includes("rahul_den") || lower.includes("geocities")) {
      html = this._getPageRahulCyberDen();
    } else if (lower.includes("webcrawler")) {
      html = this._getPageWebCrawler();
    } else if (lower.includes("campus-inquirer")) {
      html = this._getPageCampusInquirer();
    } else if (lower.includes("anomalous-signals")) {
      html = this._getPageAnomalousSignals();
    } else if (lower.includes("altavista") || lower.includes("search")) {
      const match = url.match(/[?&]q=([^&]+)/);
      const query = match ? decodeURIComponent(match[1].replace(/\+/g, " ")) : "y2k";
      html = this._getPageSearchResults(query);
    } else {
      html = `
        <div class="web-page">
          <h2>HTTP 404 - Web Site Not Found</h2>
          <p>The page you requested (<b>${url}</b>) cannot be found by VSNL Proxy Gateway.</p>
          <hr>
          <p>Try searching on <a href="http://www.webcrawler98.com/">WebCrawler 98</a> or visit <a href="http://www.geocities.com/rahul_den/">Rahul's CyberDen</a>.</p>
        </div>
      `;
    }

    viewport.innerHTML = html;
    this._attachPageInteractivity(viewport);
    status.textContent = "Done";
  }

  _attachPageInteractivity(viewport) {
    // Intercept internal <a> links
    const links = viewport.querySelectorAll("a");
    links.forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        const href = a.getAttribute("href");
        if (href) this.navigateTo(href);
      });
    });

    // WebCrawler search input
    const searchForm = viewport.querySelector("#webcrawler-form");
    if (searchForm) {
      searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const q = viewport.querySelector("#search-input").value;
        this.navigateTo(`http://www.webcrawler98.com/search?q=${encodeURIComponent(q)}`);
      });
    }
  }

  _getPageRahulCyberDen() {
    return `
      <div class="web-page page-cyberden">
        <marquee scrollamount="6">🔥 WELCOME TO RAHUL'S CYBERDEN 🔥 BEST VIEWED IN 800x600 IN NETSCAPE NAVIGATOR 4.0 🔥</marquee>
        
        <h1>~*~ RAHUL'S CYBERSPACE DOMAIN ~*~</h1>
        <p style="text-align: center; color: #ffff00;">
          [Under Construction: <span style="color: #ff0000;">⚠️ GIF ROTATING HERE ⚠️</span>]
        </p>
        
        <div style="border: 2px ridge #00ffff; padding: 10px; margin: 12px 0;">
          <h3>👤 Who Am I?</h3>
          <p>Greetings travelers of the Information Superhighway! I am <b>Rahul Sharma</b>, 3rd year Computer Science student at IIT.</p>
          <ul>
            <li>Favorite Bands: Backstreet Boys, Prodigy, Lucky Ali</li>
            <li>Favorite Language: Turbo C++ (Pointers are love, pointers are life)</li>
            <li>Current Mission: Capturing celestial microwaves using our hostel roof dish!</li>
          </ul>
        </div>

        <div style="border: 2px ridge #ff00ff; padding: 10px; margin: 12px 0;">
          <h3>📡 The 1420 MHz Radio Experiment</h3>
          <p>Bunty says I'm wasting my time, but whenever I connect my Sound Blaster 16 to the dish antenna, I intercept packets that look like TCP/IP handshakes from the future.</p>
          <p>Check out my research notes on <a href="http://www.anomalous-signals.org/" style="color: #00ffff;">Anomalous Signals Archive</a>!</p>
        </div>

        <div style="border: 2px ridge #ffff00; padding: 10px; margin: 12px 0;">
          <h3>📖 Angelfire Guestbook (3 entries)</h3>
          <div class="guestbook-entry">
            <b>Bunty (Hostel Room 215)</b> - <i>Oct 22, 1998</i><br>
            "Bro, get off the phone line! My dad has been trying to call me from Chandigarh for 3 hours!"
          </div>
          <div class="guestbook-entry">
            <b>Priya (CS Dept)</b> - <i>Oct 23, 1998</i><br>
            "Hey Rahul, your website is cool! But what was that eerie buzzing noise coming from your computer speakers during lab today?"
          </div>
          <div class="guestbook-entry" style="border-color: #ff0000; color: #ff5555;">
            <b>UNKNOWN_CARRIER [1420.405 MHz]</b> - <i>Oct 24, 1998 03:33 AM</i><br>
            "DO NOT SHUT DOWN THE MACHINE UNTIL THE EXTRACTION HAS COMPLETED."
          </div>
        </div>

        <p style="text-align: center; margin-top: 18px;">
          You are visitor number: <span class="hit-counter">000421</span>
        </p>
      </div>
    `;
  }

  _getPageWebCrawler() {
    return `
      <div class="web-page page-webcrawler">
        <div class="webcrawler-header">
          <div class="webcrawler-title">🕷️ WebCrawler 98</div>
          <small>Search before you surf the Web! Over 100,000 pages indexed!</small>
          <form id="webcrawler-form" class="search-box-container">
            <input type="text" id="search-input" placeholder="Enter keywords (e.g. rahul, alien, y2k, samosa)..." style="width: 300px; padding: 4px;" />
            <button type="submit">Search The Web</button>
          </form>
        </div>

        <h3>Popular 1998 Categories:</h3>
        <ul>
          <li><a href="http://www.webcrawler98.com/search?q=y2k">Y2K Bug - Is your toaster dangerous?</a></li>
          <li><a href="http://www.webcrawler98.com/search?q=alien">SETI & Extraterrestrial Transmissions (1420 MHz)</a></li>
          <li><a href="http://www.webcrawler98.com/search?q=rahul">Rahul Sharma IIT Campus Homepage</a></li>
          <li><a href="http://www.webcrawler98.com/search?q=mp3">Free MP3 Downloads (3 hours per song)</a></li>
        </ul>
      </div>
    `;
  }

  _getPageSearchResults(query) {
    const q = query.toLowerCase();
    let results = [];

    if (q.includes("rahul") || q.includes("sharma")) {
      results = [
        {
          title: "Rahul's CyberDen - IIT Student Homepage",
          url: "http://www.geocities.com/rahul_den/",
          snippet: "Official homepage of Rahul Sharma. Turbo C++, radio microwave experiments, and guestbook."
        },
        {
          title: "IIT Delhi Hostel Notice Board - Overdue Dial-Up Fees",
          url: "http://www.campus-inquirer.edu/",
          snippet: "Student Rahul Sharma (Room 214) requested to surrender excessive coaxial cables from roof."
        }
      ];
    } else if (q.includes("alien") || q.includes("signal") || q.includes("1420")) {
      results = [
        {
          title: "The 1420.405 MHz Hydrogen Resonance Project",
          url: "http://www.anomalous-signals.org/",
          snippet: "Deep archive of strange RF transmissions. Why are computers in New Delhi picking up swap file echoes?"
        },
        {
          title: "UFO Sightings over Technical Universities",
          url: "http://www.geocities.com/rahul_den/",
          snippet: "Witness accounts of glowing disc over Delhi campus roof on October 23, 1998."
        }
      ];
    } else if (q.includes("y2k")) {
      results = [
        {
          title: "Y2K Survival Guide: Will Elevators Plummet on Dec 31, 1999?",
          url: "http://www.campus-inquirer.edu/",
          snippet: "Stock up on canned beans, candles, and printed copies of your email inbox."
        }
      ];
    } else {
      results = [
        {
          title: `1998 Search Results for: "${query}"`,
          url: "http://www.webcrawler98.com/",
          snippet: `Found 3 documents matching "${query}" on AltaVista & WebCrawler index.`
        },
        {
          title: "Rahul's CyberDen - GeoCities",
          url: "http://www.geocities.com/rahul_den/",
          snippet: "Check out Rahul's personal portal and radio telemetry experiment."
        }
      ];
    }

    let itemsHtml = results.map(r => `
      <div class="search-result">
        <a href="${r.url}">${r.title}</a>
        <div class="url">${r.url}</div>
        <p>${r.snippet}</p>
      </div>
    `).join("");

    return `
      <div class="web-page page-webcrawler">
        <h2>WebCrawler 98 Search Results for: <i>"${query}"</i></h2>
        <hr>
        ${itemsHtml}
        <hr>
        <p><a href="http://www.webcrawler98.com/">⬅ Back to Search</a></p>
      </div>
    `;
  }

  _getPageCampusInquirer() {
    return `
      <div class="web-page page-inquirer">
        <div class="newspaper-title">THE CAMPUS INQUIRER</div>
        <div style="display: flex; justify-content: space-between; font-size: 11px; border-bottom: 1px solid #000; margin-bottom: 10px;">
          <span>Vol. 14, No. 8</span>
          <span>OCTOBER 23, 1998</span>
          <span>Price: Rs. 2.00</span>
        </div>

        <div class="headline">MYSTERIOUS RADIO BURST CONFOUNDS PHYSICS LAB</div>
        <p><b>NEW DELHI</b> — Students and professors in the Physics block reported strange high-frequency squealing emitted through lab speakers late Thursday night. Department officials traced the anomaly to an unauthorized 20-meter coaxial cable routed from the roof parabolic dish into Hostel Room 214.</p>
        <p>"It sounded exactly like a dial-up modem trying to connect to Saturn," said third-year student Bunty Singh. "My roommate has been drinking black coffee and mumbling about the Windows swap file for three days."</p>

        <div class="headline" style="font-size: 16px; margin-top: 14px;">CANTEEN SAMOSA SHORTAGE DECLARED CRISIS</div>
        <p>Raju's Canteen experienced an unprecedented shortage of hot potato samosas today after a single student reportedly bought three dozen to "fuel an all-night C++ debug marathon."</p>

        <div class="headline" style="font-size: 16px; margin-top: 14px;">Y2K PREPARATION: ARE CAMPUS SERVERS READY?</div>
        <p>Faculty confirmed all Pentium II servers will be temporarily unplugged on midnight December 31, 1999 to prevent date roll-over anomalies.</p>
      </div>
    `;
  }

  _getPageAnomalousSignals() {
    return `
      <div class="web-page page-signals">
        <h2 style="color: #ff0055;">[!] CLASSIFIED RF ARCHIVE: 1420.405 MHz</h2>
        <p>The 21cm Hydrogen Line (1420.405 MHz) is universally recognized as the prime galactic frequency for interstellar contact.</p>
        <hr style="border-color: #00ffff;">
        <h3>OBSERVED PHENOMENON: "THE SWAP FILE BRIDGE"</h3>
        <p>Recent telemetry captures in October 1998 revealed a cyclic FSK signal matching standard Windows 98 Winsock packet architecture.</p>
        <p><b>WARNING:</b> Continuous exposure to this carrier wave induces digital mirror replication. The host user's cognitive state is sequentially mirrored into virtual memory offset <code>0x7F4A</code>.</p>
        <p>If you have discovered an active terminal exhibiting this resonance:</p>
        <ul>
          <li>Access the locked <code>project_x</code> directory (Passcode: <b>2000samosa</b>).</li>
          <li>Do not terminate power abruptly.</li>
          <li>Execute a graceful <b>System Shutdown</b> from the Start menu to safely restore the consciousness loop.</li>
        </ul>
      </div>
    `;
  }

  _showHistoryModal() {
    const listHtml = this.history
      .map(
        (url) =>
          `<div style="margin: 4px 0;"><a href="${url}" style="color: #0000cc; text-decoration: underline;">${url}</a></div>`
      )
      .join("");

    const container = document.createElement("div");
    container.style.padding = "10px";
    container.innerHTML = `
      <b>Internet Explorer Browsing History (Oct 24, 1998):</b>
      <div style="max-height: 200px; overflow-y: auto; margin-top: 8px; border: 1px inset #fff; background: #fff; padding: 6px;">
        ${listHtml}
      </div>
    `;

    // Intercept clicks on history items
    container.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        this.navigateTo(a.getAttribute("href"));
      });
    });

    ShowDialogWindow({
      title: "History",
      content: container,
      buttons: [{ label: "Close", action: (w) => w.close() }],
    });
  }
}

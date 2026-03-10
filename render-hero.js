import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const chromePath = process.platform === 'darwin'
  ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  : undefined;

const html = `<!DOCTYPE html>
<html>
<head>
  <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; }
    body {
      background: #1a1a1a;
      padding: 20px;
      font-family: 'Press Start 2P', monospace;
    }
    .terminal {
      width: 840px;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 8px 32px rgba(0,0,0,0.5);
    }
    .terminal-titlebar {
      background: #2d2d2d;
      padding: 12px 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .terminal-dots {
      display: flex;
      gap: 6px;
    }
    .terminal-dots span {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }
    .terminal-dots .red { background: #ff5f57; }
    .terminal-dots .yellow { background: #febc2e; }
    .terminal-dots .green { background: #28c840; }
    .terminal-title {
      color: #888;
      font-size: 10px;
      margin-left: 12px;
    }
    .terminal-body {
      background: #0d1117;
      color: #c9d1d9;
      padding: 24px 28px;
      font-size: 12px;
      line-height: 2.4;
      border: 1px solid #30363d;
      border-top: none;
    }
    .terminal-body .arrow { color: #3fb950; }
    .terminal-body .red { color: #f85149; text-shadow: none; }
    .prompt { color: #58a6ff; }
    .nowrap { white-space: nowrap; }
    a { color: #58a6ff; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="terminal">
    <div class="terminal-titlebar">
      <div class="terminal-dots">
        <span class="red"></span>
        <span class="yellow"></span>
        <span class="green"></span>
      </div>
      <span class="terminal-title">Terminal — TheRiseCollection</span>
    </div>
    <div class="terminal-body">
      <span class="arrow">→</span> INNOVATING WITHOUT<br>
      <span class="arrow">→</span> FORGETTING TO BE CREATIVE<br><br>
      <span class="prompt">$</span> <span class="nowrap">Building <span class="red">BRANDS</span>, <span class="red">ASSETS</span> & custom <span class="red">SOFTWARE</span>.</span><br><br>
      <span class="prompt">$</span> <a href="#">CONTACT US →</a>
    </div>
  </div>
</body>
</html>`;

const width = 900;
const height = 420;

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox'],
  executablePath: chromePath,
});

const page = await browser.newPage();
await page.setViewport({ width, height });
await page.setContent(html);
await new Promise(r => setTimeout(r, 2000));
await page.screenshot({
  path: join(__dirname, 'profile/hero.png'),
  clip: { x: 0, y: 0, width, height },
});
await browser.close();
console.log('hero.png created');

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
      background: #000;
      padding: 32px 40px;
      font-family: 'Press Start 2P', monospace;
      width: 918px;
      box-sizing: border-box;
    }
    .header {
      color: #00ff41;
      font-size: 8px;
      margin-bottom: 20px;
      letter-spacing: 3px;
      text-shadow: 0 0 10px #00ff41;
    }
    .line {
      color: #00ff41;
      font-size: 12px;
      line-height: 2.6;
      text-shadow: 0 0 8px rgba(0,255,65,0.8);
    }
    .prompt { color: #00ff41; }
    .highlight { color: #39ff14; text-shadow: 0 0 12px #39ff14; }
    .nowrap { white-space: nowrap; }
    a { color: #00ff41; text-decoration: none; text-shadow: 0 0 8px rgba(0,255,65,0.8); }
  </style>
</head>
<body>
  <div class="header">▶ SYSTEM ONLINE</div>
  <div class="line">
    <span class="prompt">></span> INNOVATING WITHOUT<br>
    <span class="prompt">></span> FORGETTING TO BE CREATIVE<br><br>
    <span class="prompt">></span> <span class="nowrap">Building <span class="highlight">BRANDS</span>, <span class="highlight">ASSETS</span> & custom <span class="highlight">SOFTWARE</span>.</span><br><br>
    <span class="prompt">></span> <a href="#">CONTACT US →</a>
  </div>
</body>
</html>`;

const width = 998;
const height = 380;

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

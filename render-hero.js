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
      font-family: 'Press Start 2P', monospace;
      font-size: 20px;
      background: #000;
      color: #fff;
      padding: 40px 50px;
      width: 800px;
      min-height: 260px;
      line-height: 2.4;
      box-sizing: border-box;
      text-shadow: 0 0 4px #000, 0 2px 6px rgba(0,0,0,0.9), 0 3px 4px rgba(0,0,0,0.8);
    }
    .red { color: #e53935; text-shadow: 0 0 4px #000, 0 2px 6px rgba(0,0,0,0.9), 0 3px 4px rgba(229,57,53,0.6); }
    .nowrap { white-space: nowrap; }
    a { color: #fff; text-decoration: none; font-size: 18px; }
  </style>
</head>
<body>
  INNOVATING WITHOUT<br>
  FORGETTING TO BE CREATIVE<br><br>
  <span class="nowrap">Building <span class="red">BRANDS</span>, <span class="red">ASSETS</span> & custom <span class="red">SOFTWARE</span>.</span><br><br>
  <a href="#">CONTACT US →</a>
</body>
</html>`;

const width = 900;
const height = 800;

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

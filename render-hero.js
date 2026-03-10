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
      font-size: 9px;
      background: #111;
      color: #fff;
      padding: 20px;
      width: 520px;
      line-height: 2.4;
      max-width: 100%;
      box-sizing: border-box;
    }
    .red { color: #e53935; }
    a { color: #fff; text-decoration: none; }
  </style>
</head>
<body>
  INNOVATING WITHOUT<br>
  FORGETTING TO BE CREATIVE<br><br>
  Building <span class="red">BRANDS</span>, <span class="red">ASSETS</span><br>
  & custom <span class="red">SOFTWARE</span> solutions.<br><br>
  <a href="#">CONTACT US →</a>
</body>
</html>`;

const width = 560;
const height = 200;

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
  clip: { x: 0, y: 0, width, height: 180 },
});
await browser.close();
console.log('hero.png created');

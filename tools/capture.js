import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

(async () => {
  const url = process.env.URL || 'http://localhost:3001/dev/tasks/1';
  const outDir = path.resolve(process.cwd(), 'tools', 'puppeteer-output');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--disable-dev-shm-usage',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--font-render-hinting=medium',
    ],
    defaultViewport: { width: 1366, height: 768, deviceScaleFactor: 1 },
  });

  try {
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36');
    await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }]);

    await page.goto(url, { waitUntil: 'networkidle2', timeout: 120000 });
    // small sleep to allow client-side CSS variables and scripts to settle
    await new Promise((res) => setTimeout(res, 1200));


    const screenshotPath = path.join(outDir, 'page-screenshot.png');
    await page.screenshot({ path: screenshotPath, fullPage: true });

    // Try to capture a relevant control if present; continue even if not found
    const details = await page.evaluate(() => {
      const el = document.querySelector('input#subject') || document.querySelector('.MuiFormControl-root') || document.querySelector('input[type=text]');
      if (!el) return { found: false };
      const root = el.closest('.MuiFormControl-root') || el.parentElement || el;
      const rect = root.getBoundingClientRect();
      return {
        found: true,
        html: root.outerHTML,
        styles: window.getComputedStyle(root).cssText,
        rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
      };
    });

      // Attempt to capture any Info icon rendered nearby
      const icon = await page.evaluate(() => {
        const ico = document.querySelector('[data-testid="IconHelpRounded"]') || document.querySelector('.MuiSvgIcon-root');
        if (!ico) return { found: false };
        const r = ico.getBoundingClientRect();
        return { found: true, html: ico.outerHTML, rect: { x: r.x, y: r.y, width: r.width, height: r.height } };
      });

      fs.writeFileSync(path.join(outDir, 'icon.json'), JSON.stringify(icon, null, 2));

    fs.writeFileSync(path.join(outDir, 'control.html'), details.found ? details.html : 'not found');
    fs.writeFileSync(path.join(outDir, 'control.json'), JSON.stringify(details, null, 2));

    console.log('screenshot:', screenshotPath);
    console.log('outputDir:', outDir);
    console.log('control details written to control.html and control.json');
  } catch (err) {
    console.error('capture error', err);
    process.exitCode = 2;
  } finally {
    await browser.close();
  }
})();

import 'dotenv/config.js';
import { chromium } from 'playwright';
import { Before, After, Status, setDefaultTimeout } from '@cucumber/cucumber';
import fs from 'node:fs';

setDefaultTimeout(60000);

Before({ tags: '@ui' }, async function () {
  this.browser = await chromium.launch({ headless: false });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

After({ tags: '@ui' }, async function (scenario) {
  const { page, context, browser } = this;

  if (!page) return;

  fs.mkdirSync('./reports/screenshots', { recursive: true });

  const fileName = `${scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}.png`;
  const screenshotPath = `./reports/screenshots/${fileName}`;

  await page.screenshot({ path: screenshotPath, fullPage: true });

  if (scenario.result.status === Status.FAILED) {
    console.log(`❌ Cenário falhou: ${scenario.pickle.name}`);
    console.log(`📸 Evidência: ${screenshotPath}`);
  } else {
    console.log(`✅ Cenário passou: ${scenario.pickle.name}`);
  }

  await page.close();
  await context.close();
  await browser.close();
});
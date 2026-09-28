import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { request } from '@playwright/test';
import 'dotenv/config';

setDefaultTimeout(30 * 1000);

Before({ tags: '@api' }, async function () {

    this.request = await request.newContext({
        baseURL: process.env.API_URL,
        extraHTTPHeaders: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        }
    });
});

After({ tags: '@api' }, async function () {
    if (this.request) {
        await this.request.dispose();
    }
});

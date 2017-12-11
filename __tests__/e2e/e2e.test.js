import faker from 'faker';
import puppeteer from 'puppeteer';

const data = {
    name: faker.name.firstName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    message: faker.random.words()
};

console.log(data);

let page;
let browser;
const width = 1080;
const height = 800;
const APP = "https://www.abv.bg";

describe('E2E Suite', () => {
    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: true,
            slowMo: 80,
            args: [`--window-size=${width},${height}`]
        });
        page = await browser.newPage();
        await page.setViewport({ width, height });
    });

    afterAll(() => {
        browser.close();
    });

    test.skip("open page", async () => {
        // open page
        await page.goto(`${APP}`);
        const text = await page.content();
        expect(text).toContain("Вход в АБВ Поща")
    }, 16000); // wait for maximum 16 seconds

    test("styles", async () => {
        // open page
        await page.goto(`${APP}`);

        // wait for the form to appear and fill it
        await page.waitForSelector("#mobileVersion");
        const mobileHref = await page.$eval('#mobileVersion', el => el.href);
        console.log(mobileHref);

        const form = await page.$eval("#loginForm", el => el.innerHTML);
        console.log(form);

        await page.evaluate(() => {
            //document.getElementById();
        });

        // TODO: check for class/style
        //expect(el).toBeTruthy();

    }, 16000); // wait for maximum 16 seconds

    test.skip("login fail", async () => {
        // open page
        await page.goto(`${APP}`);

        // wait for the form to appear and fill it
        await page.waitForSelector("#loginForm");
        await page.click("input#username");
        await page.keyboard.type(data.name);
        await page.click("input#password");
        await page.keyboard.type(data.password);
        await page.click("input#loginBut");

        //await page.waitForNavigation();
        await page.waitFor(5000);

        const text = await page.content();
        expect(text).toContain('Грешен потребител')
    }, 100000); // wait for maximum 16 seconds
});
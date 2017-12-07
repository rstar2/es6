import faker from "faker";
import puppeteer from "puppeteer";

const data = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    message: faker.random.words()
};

console.log(data);

let page;
let browser;
const width = 1080;
const height = 800;
const APP = "http://www.google.bg";

beforeAll(async () => {
    browser = await puppeteer.launch({
        headless: false,
        slowMo: 80,
        args: [`--window-size=${width},${height}`]
    });
    page = await browser.newPage();
    await page.setViewport({ width, height });
});

afterAll(() => {
    browser.close();
});


describe('E2E Suite', () => {
    test("open page", async () => {
        // open page
        await page.goto(`${APP}`);

        // wait for the form to appear and fill it
        await page.waitForSelector("[data-test=contact-form]");
        await page.click("input[name=name]");
        await page.type("input[name=name]", data.name);
        await page.click("input[name=email]");
        await page.type("input[name=email]", data.email);
        await page.click("input[name=tel]");
        await page.type("input[name=tel]", data.phone);
        await page.click("textarea[name=message]");
        await page.type("textarea[name=message]", data.message);
        await page.click("input[type=checkbox]");
        await page.click("button[type=submit]");
        await page.waitForSelector(".modal");
    }, 16000); // wait for maximum 16 seconds
});
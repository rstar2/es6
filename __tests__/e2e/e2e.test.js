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
const APP = 'https://dev.cnexus.com/';

// default timeout for a Jest test -15 secs,
// still each individual test may set its own timeout
jest.setTimeout(15000);

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

    test('open page', async () => {
        // open page
        await page.goto(`${APP}`);

        const title = await page.title();
        expect(title).toBe('FileFlex Secure File Access');
        const text = await page.content();
        expect(text).toContain('Login to FileFlex Secure File Access');
    });

    // test.skip('styles', async () => {
    //     // open page
    //     await page.goto(`${APP}`);

    //     // wait for the form to appear and fill it
    //     await page.waitForSelector('#mobileVersion');
    //     const mobileHref = await page.$eval('#mobileVersion', el => el.href);
    //     console.log(mobileHref);

    //     const form = await page.$eval('#loginForm', el => el.innerHTML);
    //     console.log(form);

    //     await page.evaluate(() => {
    //         //document.getElementById();
    //     });

    //     // TODO: check for class/style
    //     //expect(el).toBeTruthy();

    // });

    test.skip('Invalid email', async () => {
        // open page
        await page.goto(`${APP}`);
        // wait for the form to appear
        await page.waitForSelector('#formLOGIN');
        await page.click('input#email');
        await page.keyboard.type(data.name);
        // click Next
        await page.click('button[act="nextStep"]');
        // wait for the password to appear
        await page.waitForSelector('.separateError');

        const error = await page.$eval('.separateError', el => el.textContent);
        expect(error).toBe('Invalid email');
    });

    test.skip('This user does not use application', async () => {
        // open page
        await page.goto(`${APP}`);
        
        // wait for the form to appear
        await page.waitForSelector('#formLOGIN');
        await page.click('input#email');
        await page.keyboard.type(data.email);
        // click Next
        await page.click('button[act="nextStep"]');
        // wait for the password to appear
        await page.waitForSelector('#errorCont');
        
        const error = await page.$eval('.separateError', el => el.textContent);
        expect(error).toBe('This user does not use application');
    }); 

    test.skip('Invalid password', async () => {
        // open page
        await page.goto(`${APP}`);
        
        // wait for the form to appear
        await page.waitForSelector('#formLOGIN');
        await page.click('input#email');
        await page.keyboard.type(data.email);
        // click Next
        await page.click('button[act="nextStep"]');
        // wait for the password to appear
        await page.waitForSelector('input#password');
        await page.click('input#password');
        await page.keyboard.type(data.password);
        // click Login
        await page.click('input#loginBut');
        
        // await page.waitForNavigation();
        // await page.waitFor(5000);
        await page.waitForSelector('#form.errors');

        const text = await page.content();
        expect(text).toContain('Грешен потребител');
    }, 30000); // wait for maximum 30 seconds
});
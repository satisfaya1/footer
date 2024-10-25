const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://only.digital/');

    const footer = await page.$('footer');
    if (footer) {
        console.log('Футер найден.');

        const buttons = await footer.$$('a');
        if (buttons.length > 0) {
            console.log('Кнопки в футере найдены:');
            for (const button of buttons) {
                const text = await page.evaluate(el => el.textContent, button);
                console.log(text);
            }
        } else {
            console.log('Кнопки в футере не найдены.');
        }
    } else {
        console.log('Футер не найден.');
    }

    await browser.close();
})();
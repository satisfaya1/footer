const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.goto('https://only.digital/');

    const footerElements = await page.evaluate(() => {
        const footer = document.querySelector('footer');
        if (!footer) return 'Footer not found';

        const footerText = [];
        const elementsToCheck = [
            '+7 (495) 740 99 79',
            'hello@only.com.ru',
            'Awwwards',
            'Vkontakte',
            'Telegram',
            'Vimeo',
            'Behance'
        ];

        elementsToCheck.forEach(text => {
            const element = Array.from(footer.querySelectorAll('*')).find(el => el.textContent.includes(text));
            footerText.push(element ? text : `${text} not found`);
        });

        return footerText;
    });

    console.log('Footer elements found:');
    footerElements.forEach(el => console.log(el));

    await browser.close();
})();
const {test, expect}= require ('@playwright/test');

test.only('Practice Page Test', async ({browser})=>
{
    const context = await browser.newContext();
    const page  = await context.newPage();
    await page.goto("https://magento.softwaretestingboard.com/customer/account/login/");
    await page.locator("#email").type("rmlumbinisamapriya@gmail.com");
    await page.locator("#pass").type("Veru1234*");
    await page.locator("#send2").click();
    await page.locator("//strong[normalize-space()='Account Information']").click();
    //Print on Log Account Information
    console.log(await page.locator("//strong[normalize-space()='Account Information']").textContent());
    await expect(page.locator("//strong[normalize-space()='Account Information']")).toContainText('Account');
 

});
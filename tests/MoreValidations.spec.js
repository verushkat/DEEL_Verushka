const {test,expect} = require('@playwright/test')

test("Popup validation", async({page})=>
{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    
    //await page.goto("http://google.com");
    //await page.goBack();
    //await page.goForward(); 
   await expect(page.locator("[name='show-hide']")).toBeVisible();
   await page.locator("#hide-textbox").click();
   await expect(page.locator("[name='show-hide']")).toBeHidden();
   await page.pause();
   page.on('dialog',dialog => dialog.accept());
   await page.locator("#confirmbtn").click();
   await page.locator('#mousehover').hover();
   const framesPage = page.frameLocator("#courses-iframe");
   await framesPage.locator("li a[href*='lifetime-access']:visible").click();
   const textcheck = await framesPage.locator(".text h2").textContent();
   console.log(textcheck.split(" ")[1]);
})

   test("Screenshot & Visual comparisson",async({page})=>
{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("[name='show-hide']")).toBeVisible();
    await page.locator("[name='show-hide']").screenshot({path: 'partialScreenshot.png'});
    await page.locator("#hide-textbox").click();
    await page.screenshot({path: 'screenshot.png'})
    await expect(page.locator("[name='show-hide']")).toBeHidden();

});
//screenshot -store -> screenshot 
   test.only('visual', async({page}) =>
   {
        await page.goto("https://flightaware.com/");
        expect(await page.screenshot()).toMatchSnapshot('landing.png');
  


});
 const {test, expect} = require('@playwright/test');
 const {POManager} = require('../pageobjects/POManager');
 //Json->string->js object
 const dataSet = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));
 
 
test('Client App login', async ({page})=>
 {

     const poManager = new POManager(page);
    //js file- Login js, DashboardPage
     const products = page.locator(".card-body");
     const loginPage = poManager.getLoginPage();
     await loginPage.goTo();
     await loginPage.validLogin(dataset.username,dataset.password);
     const dashboardPage = poManager.getDashboardPage();
     await dashboardPage.searchProductAddCart(dataset.productName);
     await dashboardPage.navigateToCart();
    /*  const mycartPage = new MyCartPage(page);
     await mycartPage.clickCheckOut();
 */

    //await page.pause();
   
    await page.locator("[placeholder*='Country']").type("ind");

    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for(let i =0;i< optionsCount; ++i)
    {
       const  text =  await dropdown.locator("button").nth(i).textContent();
        if(text === " India")
        {
           await dropdown.locator("button").nth(i).click();
           break;
        }
    }
   await expect(page.locator(".user__name [type='text']").first()).toHaveText(username);
   await page.locator(".action__submit").click();
   
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  console.log(orderId);
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();
 const rows = await page.locator("tbody tr");


 for(let i =0; i<await rows.count(); ++i)
 {
    const rowOrderId =await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId))
    {
        await rows.nth(i).locator("button").first().click();
        break;
    }
 }
 const orderIdDetails =await page.locator(".col-text").textContent();
 expect(orderId.includes(orderIdDetails)).toBeTruthy();














  


    




    









 });
 

 



 


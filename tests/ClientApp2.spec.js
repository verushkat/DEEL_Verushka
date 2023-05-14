const {test, expect, request}= require ('@playwright/test');
//const {APiUtils} = require('./utils/APiUtils');
const loginPayLoad = {userEmail:"veru@gmail.com",userPassword:"Veru1234*"};
const orderPayLoad = {orders:[{country:"Cuba",productOrderedId:"645cda28568c3e9fb1699e59"}]};

let response;

test.beforeAll( async()=>
{
     //Login API
     const apiContext = await request.newContext();
     const apiUtils = new APiUtils(apiContext,loginPayLoad);
     response = await apiUtils.createOrder(orderPayLoad);

})

//test1 , test2 , test3

test('Practice Page Test', async ({browser})=>
{

     page.addInitScript(value => {

          window.localStorage.setItem('token',value)

     }, response.token );
     const email = "veru@gmail.com";
     const productName = 'iphone 13 pro';
     const context = await browser.newContext();
     const page  = await context.newPage();
     const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client/");
      /*   await page.locator("#userEmail").type(email);
    await page.locator("#userPassword").type("Veru1234*");
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle') */
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles);
   const count = await products.count();
   for (let i =0; i < count; i++)
   {
       if (await products.nth(i).locator("b").textContent() === productName) 
       {
            // add product to cart
            await products.nth(i).locator("text= Add to cart").click()
            break;
       }
   }
   await page.locator("[routerlink*='cart']").click();
   await page.locator("div li").first().waitFor();
   const bool = await page.locator("h3:has-text('iphone 13 pro')").isVisible();
   expect(bool).toBeTruthy();

   await page.locator("text=Checkout").click();

   await page.locator("[placeholder*='Country']").type("ind",{delay:100});
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
   for(let i =0; i< optionsCount; ++i)
   {
       const text = await dropdown.locator("button").nth(i).textContent();
        if(text === "India")
        {
            //click - on option
            await dropdown.locator(".ta-item").nth(i).click();
            break;
        }
   }
   await expect(page.locator(".user__name [type='text']").first()).toHaveText("veru@gmail.com")
   await page.locator(".btnn").click();
   
  await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  console.log(orderId);


});
  //create order is success
  test('Place the order', async ({page}) =>
  {

          //const apiUtils = new APiUtils(apiContext,loginPayLoad);
          //const orderId = createOrder(orderPayLoad);
          page.addInitScript(value =>{

               window.localStorage.setItem('token',value);

          }, token);

   await page.goto("https://rahulshettyacademy.com/client/");
  page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").first().waitFor();
  const rows = await page.locator("tbody tr");

  for(let i=0; i<await rows.count(); ++i)
  {
       const rowOrderId = await rows.nth(i).locator("th").textContent();
       if (response.orderId.includes(rowOrderId))
       {
            await rows.nth(i).locator("button").first().click();
            /*   await page.locator("#userEmail").type(email);
    await page.locator("#userPassword").type("Veru1234*");
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle') */
       }

  }
 const orderIDDetails = await page.locator(".col-text").textContent();
 await page.pause();
 expect(response.orderId.includes(orderIDDetails)).toBeTruthy();

});
    /*   await page.locator("#userEmail").type(email);
    await page.locator("#userPassword").type("Veru1234*");
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle') */
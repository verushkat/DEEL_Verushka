const {test, expect}= require ('@playwright/test');

test('Browser Context Playwright test', async ({browser})=>
{
 
  //chrome - plugins/ cookies
   const context = await browser.newContext();
   const page  = await context.newPage();
   const userName =  page.locator('#username');
   const signIn =  page.locator("[type='submit']");
   const documentLink = page.locator("[href*=documents-request]");

   const cardTitles = page.locator(".card-body a");

   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   console.log(await page.title());  
   //css , xpath
   await userName.type("rahulshetty");
   await page.locator("[type='password']").type("learning");
   await signIn.click();
   //wait until the locator shown up on the page
   console.log(await page.locator("[style*='block']").textContent());
   await expect(page.locator("[style*='block']")).toContainText('Incorrect');
   //type -fill
   await userName.fill("");
   await userName.fill("rahulshettyacademy");
   
   await Promise.all(
      [
         
         page.waitForURL("https://rahulshettyacademy.com/angularpractice/shop"),
         signIn.click(),
         
      ]
   );

   //console.log(await cardTitles.nth(0).textContent());
   const allTitles = await cardTitles.allTextContents();
   console.log(allTitles);
  
});

test('Page Playwright test', async ({page})=>
{
   await page.goto("https://google.com");
   //get title - assertion
   console.log(await page.title())
   await expect(page).toHaveTitle("Google");
  
});


test('UI Controls', async ({page})=>
{
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   const userName =  page.locator('#username');
   const signIn =  page.locator("[type='submit']");
   const dropdown = page.locator("select.form-control");
   await dropdown.selectOption("consult");
   //await page.pause();
   await page.locator(".radiotextsty").last().click();
   await page.locator("#okayBtn").click();
   await expect(page.locator(".radiotextsty").last()).toBeChecked();
   await page.locator("#terms").click();
   await expect(page.locator("#terms")).toBeChecked();
   await page.locator("#terms").uncheck();
   expect(await page.locator("#terms").isChecked()).toBeFalsy();
   await expect(documentLink).toHaveAttribute("class","blinkingText");
   
   //assertion
   //await page.pause();

});

test('Child WIndows Handl', async ({browser})=>
{
   const context = await browser.newContext();
   const page = await context.newPage();
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   const documentLink = page.locator("[href*=documents-request]");

   const [newPage] = await Promise.all([

   context.waitForEvent('page'),
   documentLink.click(),
   ])

   const text = await newPage.locator(".red").textContent();
   const arrayText = text.split("@")
   const domain =  arrayText[1].split(" ")[0]
   console.log(domain);
   await page.locator("#username").type(domain);
   //await page.pause();
   console.log(await page.locator("#username").textContent());

});

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await page.getByRole('combobox', { name: 'Search' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('rahul shetty academy');
  await page.getByRole('combobox', { name: 'Search' }).press('Enter');
  await page.getByRole('link', { name: 'Rahul Shetty Academy: Selenium, API Testing, Software ... Rahul Shetty Academy https://rahulshettyacademy.com' }).click();
  await page.getByRole('link', { name: 'Courses', exact: true }).click();
  await page.goto('https://courses.rahulshettyacademy.com/p/robot-framework-selenium');
});


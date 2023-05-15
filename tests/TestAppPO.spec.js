const {test, expect} = require('@playwright/test');
const {POMManager} = require('../pageobjects/POMManager');
const { SearchPage } = require('../pageobjects/SearchPage');

test('Verify select role and country', async ({page}) =>
{

const pManager = new POMManager(page);    
const searchPage = pManager.getSearchPage();
await searchPage.goTo();
await page.pause();
await searchPage.searchRoleAndSelect("QA Engineer");
await searchPage.searchCountryAndSelect("Canada");
await searchPage.clickSearch();
expect(await searchPage.verifyRefineView()).toBeVisible;
expect(await searchPage.getSelectedRoleName()).toEqual('QA Engineer');
expect(await searchPage.getSelectedCountryName()).toEqual('Canada');
});




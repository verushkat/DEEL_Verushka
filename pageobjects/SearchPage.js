class SearchPage {

constructor(page)
{
    this.page = page;
    this.role = page.locator("[placeholder='Select a role']");
    this.country = page.locator("[placeholder='Select a country']");
    this.search = page.locator("[type='submit']");
    this.firstOptionRole = page.locator("#mui-2-option-0")
    this.firstOptionCountry = page.locator("#mui-4-option-0")
    this.roleId = page.locator("xpath=//p[text()='Refine your view']//following::h6[1]");
    this.countryId = page.locator("xpath=//p[text()='Refine your view']//following::h6[2]");
    this.refineViewHeader = page.locator("xpath=//p[text()='Refine your view']");
}

async goTo()
{

    await this.page.goto("https://growth.deel.training/dev/salary-insights");
    
}

async searchRoleAndSelect(RoleCode)
{
    await this.role.click();
    await this.role.fill(RoleCode);
    await this.role.waitFor();
    await this.firstOptionRole.click();
}

async searchCountryAndSelect(CountryCode)
{

   // await this.country.type(CountryCode,{delay:100});
   await this.country.click();
   await this.country.fill(CountryCode);
   await this.role.waitFor();
   await this.firstOptionCountry.click();
}

async verifyRefineView(){
    return await this.refineViewHeader;
}
async clickSearch()
{
    await this.search.click();
}

async getSelectedRoleName()
{
    return await this.roleId.textContent();
}

async getSelectedCountryName()
{
    return await this.countryId.textContent();
}


}
module.exports = {SearchPage};
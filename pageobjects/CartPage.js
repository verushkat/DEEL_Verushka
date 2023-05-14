class CartPage
{

    constructor(page)
    {
        this.page = page;
        this.cartProducts = page.locator("div li");
        this.productsText = page.locator("h3:has-text('iphone 13 pro')");
        this.cart = page.locator("text=Checkout");

    }

async clickCheckOut()
{
    await this.cartProducts.waitFor();
    const bool =  await this.getProductLocator(ProductName).isVisible();
    expect(bool).toBeTruthy();
    await this.checkoutButton.click();
}

}
module.exports = {CartPage};
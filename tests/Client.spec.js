const { test, expect } = require('@playwright/test');

test('client', async({page})=>
{     const products = page.locator(".card-body")
      const producName='ZARA COAT 3';
      const email="anshika@gmail.com"
      await page.goto("https://rahulshettyacademy.com/client");
      await page.locator("#userEmail").fill("anshika@gmail.com")
      await page.locator("#userPassword").type("Iamking@000")
      await page.locator("[value='Login']").click()
      await page.waitForLoadState('networkidle')
      const title = await page.locator(".card-body b").allTextContents()
      console.log(title)
      const count = await products.count()
      for (let i=0; i<count; ++i ){
         if (await products.nth(i).locator("b").textContent()===producName){
              //add Cart
              console.log(producName)
              await products.nth(i).locator("text = Add To Cart").click();
              break;
         }
      }
      await page.locator("[routerlink*='cart']").click();
      await page.locator("div li").first().waitFor();
      const bool = page.locator("h3:has-text('ZARA COAT 3')").isVisible();
      expect(bool).toBeTruthy();
      await page.locator("text= Checkout").click();
      await page.locator("[placeholder*='Country']").pressSequentially("Tun")
      const dropdown = await page.locator(".ta-results")
      await dropdown.waitFor();
      const optionCount= await dropdown.locator("button").count();
      for(let i=0; i<optionCount; ++i )
      {
        const text= await dropdown.locator("button").nth(i).textContent();
        if (text ===" Tunisia"){
            await dropdown.locator("button").nth(i).click();
            break;
        }
      }
      await expect (page.locator(".user__name [type='text']").first()).toHaveText(email);
      await page.locator(".action__submit").click();
      await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order.")
      const orderId= await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
      console.log(orderId)
      await page.locator("button[routerlink*='myorders']").click();
      await page.locator("tbody").waitFor();
      const row = await page.locator("tbody tr")
      for(let i = 0 ; i<await row.count(); ++i){
            const rowOrderID= row.nth(i).locator("th").textContent()
            if (orderId.includes(rowOrderID)){
                  await row.nth(i).locator(".btn btn-primary").first().click();
                  break;
            }
      }
      const orderIdDetails = await page.locator(".col-text").textContent();
      console.log(orderIdDetails)
      expect(orderId.includes(orderIdDetails)).toBeTruthy()

})
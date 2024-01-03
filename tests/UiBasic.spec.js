const { test, expect } = require('@playwright/test');
const { use } = require('../playwright.config');
const exp = require('constants');

test.only('UI CONTROL', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    // const title = await page.title()
    // console.log(title)
    const userName = await page.locator('#username');
    const SignIn = page.locator("#signInBtn")
    await userName.fill("rahulshettyacademy");
    await page.locator("[type=password]").type("learning");
    await SignIn.click();
    // console.log(await page.locator("[style*='block']").textContent())
    // await expect(page.locator(("[style*='block']").textContent('Incorrect')))
    //const cardTitle= await page.locator(".card-body a")
    // console.log(cardTitle.first().textContent())
    // console.log(cardTitle.nth(1).textContent())
    // const allTitle = await cardTitle.allTextContents()
    // console.log(allTitle)
    const dropdown=await page.locator('select.form-control')
    await dropdown.selectOption("consult")
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    console.log((page.locator(".radiotextsty").last().isChecked()))
    expect(page.locator(".radiotextsty").last()).toBeChecked()
    await page.locator("#terms").uncheck()
    expect( await page.locator("#terms").isChecked()).toBeFalsy()
    const documentLink = await page.locator("[href*='documents-request']")
    await expect(documentLink).toHaveAttribute("class","blinkingText")
  });

  test.only('open window', async({browser}) => {
    const contexte = await browser.newContext()
    const page = await contexte.newPage()
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const documentLink = await page.locator("[href*='documents-request']")
    const [newPage]= await Promise.all([
    contexte.waitForEvent('page'),// listen for any new page rejected fullfiled pending
    documentLink.click(),
        ])// new page open.lo;
    const text = await newPage.locator(".red").textContent()
    const arrayText= text.split('@');
    const domain = arrayText[1].split(" ") [0]
    console.log(domain)
    await page.locator("#username").type(domain)
    console.log(await page.locator("#username").textContent())

  })

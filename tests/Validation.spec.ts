import { test, expect } from '@playwright/test';
import { text } from 'stream/consumers';

test('Special locator', async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://www.google.tn/");
    // await page.goBack();
    // await page.goForward();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await page.locator("#displayed-text").isHidden();
    await page.on("dialog", dialog =>dialog.accept());
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();
    const frameLocator = await page.frameLocator("#courses-iframe");
    await frameLocator.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck = await frameLocator.locator(".text h2").textContent();
    console.log(textCheck?.split(" ")[1])
})
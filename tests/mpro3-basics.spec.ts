import { test, expect, type Page } from '@playwright/test';
const username = 'test';
const password = 'test';
const url = 'https://mpro3-online-host.com/mpro3/';


test.describe('New Todo', () => {

    /*
    test.beforeEach(async ({ page }) => {
        await Login(page);        
      });   

    test('Go to Lists, then Go to Class Listing', async ({ page }) => {
       // await page.locator("li", {hasText: '-Lists'}).hover();
       // await page.getByRole("link", {name: '-Lists'}).click();
       // await page.getByRole("link", {name: 'Class Listing'}).click();
       await SelectLeftMenu(page,"-Lists","Class Listing","");
       //await page.getByRole('button', {name: 'Create Report'}).click();
       await clickSubmitButton(page,"Create Report");
    });
    */
    test('Loop through all List Reports', async ({page}) => {
        test.setTimeout(60000); // Default timer, 30 seconds, isn't enough
        let arrList = ["Directories", "Audit Listing", "Class Book","Class Listing","Contract Listing",
            "Cost Center/Department Listing","Employee Listing","Facility Listing","Inspection Checks Listing",
            "Material Listing","Model Book","Model Listing","Request Code Listing","Service Code Listing",
            "Service History Listing","System Listing","Trade Listing","User Listing","Vendor and Manufacturer Listing"];
        
        await Login(page);   

        for (var list of arrList) {
            await goHome(page);
            await SelectLeftMenu(page,"-Lists",list,"");            
            await clickSubmitButton(page,"Create Report");
        }

        await goHome(page);
    });
});

async function Login(page: Page) {
    // go to site
    await page.goto(url+'index.asp');
    // log in
    await page.fill('input[id="TextUserID"]', username);
    await page.fill('input[id="TextPassword"]', password);
    await page.click('input[type="submit"]');
}
async function SelectLeftMenu(page: Page, mainmenu: string, submenu: string, submenu2: string) {
    await page.getByRole("link", {name: mainmenu}).click();
    if(typeof submenu!='undefined' && submenu){
        await page.getByRole("link", {name: submenu}).click();
    }   
    if(typeof submenu2!='undefined' && submenu2){
        await page.getByRole("link", {name: submenu2}).click();
    }   
}
async function clickSubmitButton(page: Page, buttonName: string) {
    await page.getByRole('button', {name: buttonName, exact: true }).click();
}
async function goHome(page: Page) {
    await page.goto(url+"index.asp?page=Home");
}

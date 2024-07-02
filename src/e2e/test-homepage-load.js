const { Builder, Browser, By, Key, until } = require("selenium-webdriver");

async function checkHomePage() {
  let driver = await new Builder().forBrowser(Browser.FIREFOX).build()
  try {
    await driver.get("http://localhost:4200/")
    await driver.wait(until.titleIs("Gate Entry/Exit"), 1000)
    await new Promise(resolve => setTimeout(resolve, 2000));
    const button = await driver.wait(until.elementLocated(By.className('login')), 10000);
    await button.click();
    const emailElement = await driver.findElement(By.id('email'));
    const passWordElement = await driver.findElement(By.id('password'));
    emailElement.sendKeys('sjmani89@gmail.com')
    await new Promise(resolve => setTimeout(resolve, 2000));
  } finally {
    await driver.quit()
  }
}

checkHomePage();
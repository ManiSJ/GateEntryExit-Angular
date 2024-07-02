import { Builder, By, until, WebDriver } from 'selenium-webdriver';

describe('Angular App Test', () => {
  let driver: WebDriver;

  beforeEach(async () => {
    // Initialize WebDriver (e.g., Chrome)
    driver = await new Builder().forBrowser('firefox').build();

    // Navigate to your Angular application
    await driver.get('http://localhost:4200/');
  });

  it('should click a button', async () => {
    // Wait for the button to be clickable and then click it
    const button = await driver.wait(until.elementLocated(By.className('login')), 10000);
    await button.click();

    // Optionally, add assertions or expectations
    // Example:
    const elementText = await driver.findElement(By.id('some-element-id')).getText();
    expect(elementText).toContain('Expected Text'); 
  });

  afterEach(async () => {
    // Clean up or do any necessary teardown
    await driver.quit();
  });
});

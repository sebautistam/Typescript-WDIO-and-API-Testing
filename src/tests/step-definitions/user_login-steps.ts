import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';
import LoginPage from '../../pom/pages/login.page';

const loginPage = new LoginPage();

Given(/^I am on the login page with an existing account$/, async function () {
  await loginPage.open();
});

/***SCENARIO 1****/
When(/^I fill out the login form with incorrect (.+) or (.+)$/, async function (email, password) {
  await loginPage.login(email, password);
});

Then(/^I see an error message with text "([^"]*)"$/, async function (expectedText) {
  await loginPage.selectors.error_box.waitForExist({ timeout: 10000 }); //added for firefox

  await loginPage.selectors.error_box.waitForDisplayed({ timeout: 10000 }); //added for firefox

  await expect(loginPage.selectors.error_box).toBeDisplayed();
  const errorText = await loginPage.selectors.error_box.getText();
  await expect(errorText).toContain(expectedText);
});

Then(/^I cannot access the account$/, async function () {
  const url = await browser.getUrl();
  await expect(url).toContain('auth/login');
});

/***SCENARIO 2****/
When(/^I fill out the login form with correct (.+) and (.+)$/, async function (email, password) {
  await loginPage.login(email, password);
});

Then(/^I can access the account$/, async function () {
  await browser.waitUntil(async () => (await browser.getUrl()).includes('account'), {
    timeout: 10000,
    timeoutMsg: 'Expected to be redirected to account page within 10s',
  });
});

/***SCENARIO 3****/
When(
  /^I try to access an existing account several times with correct (.+) and incorrect (.+)$/,
  async function (email, password) {
    let counterClicks = 3;
    while (counterClicks > 0) {
      await loginPage.login(email, password);
      counterClicks--;
    }
  },
);

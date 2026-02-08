import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';

import LoginPage from '../../pom/pages/login.page';
import AccountPage from '../../pom/pages/account.page';

const loginPage = new LoginPage();
const accountPage = new AccountPage();

const user = {
  username: 'customer@practicesoftwaretesting.com',
  password: 'welcome01',
  postalcode: '12345',
  newpassword: 'welcome01',
};

Given(/^I am logged in as a registered user$/, async function () {
  await loginPage.open();
  await loginPage.login(user.username, user.password);

  await browser.waitUntil(async () => (await browser.getUrl()).includes('account'), {
    timeout: 15000,
    timeoutMsg: 'Expected to be redirected to account page within 15s',
  });

  await accountPage.changeProfile();

  await browser.waitUntil(async () => (await browser.getUrl()).includes('profile'), {
    timeout: 15000,
    timeoutMsg: 'Expected to be redirected to profile page within 15s',
  });

  await accountPage.selectors.info_form.country_tb.waitUntil(
    async () => (await accountPage.selectors.info_form.country_tb.getValue()) !== '',
    {
      timeout: 15000,
      timeoutMsg: 'Expected Country to be filled out within 15s',
    },
  );
});

/***SCENARIO 1****/
When(/^I update the profile information with correct information$/, async function () {
  await accountPage.selectors.info_form.postcode_tb.setValue(user.postalcode);
  await accountPage.selectors.info_form.updateprof_btn.click();
});

Then(/^I see a success message with text "([^"]*)"$/, async function (expectedText) {
  await expect(accountPage.selectors.info_form.success_box).toBeDisplayed();
  const successText = await accountPage.selectors.info_form.success_box.getText();
  await expect(successText).toContain(expectedText);
});

/***SCENARIO 2****/
When(/^I try to update the password to the same password currently in use$/, async function () {
  await accountPage.updatePassword(user.password, user.newpassword, user.newpassword);
});

Then(/^I see a password change error message with text "([^"]*)"$/, async function (expectedText) {
  await accountPage.selectors.pwd_form.error_box.waitForExist({ timeout: 15000 });
  await accountPage.selectors.pwd_form.error_box.waitForDisplayed({ timeout: 15000 });
  const errorText = await accountPage.selectors.pwd_form.error_box.getText();
  await expect(errorText).toContain(expectedText);
});
